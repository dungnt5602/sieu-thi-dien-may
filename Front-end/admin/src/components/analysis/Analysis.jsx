import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "./Analysis.scss"
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import StatisticAPI from "../../api/StatisticAPI";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Tổng doanh thu theo ngày',
        },
    },
};


const Analysis = () => {

    const [labels, setLabels] = React.useState([]);
    const [data, setData] = React.useState([]);
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;
    const [startDate, setStartDate] = React.useState(today);
    const [endDate, setEndDate] = React.useState(today);
    const [yearFilter, setYearFilter] = React.useState(dayjs().format('YYYY'));
    const [filter, setFilter] = React.useState("day");

    useEffect(() => {
        setData([]);
        setLabels([]);
        if (filter === "day" || filter === "today") {
            StatisticAPI.getStatistic(startDate, endDate).then(res => {
                //for each element in the res, push date and total to the labels and data state
                res.data.forEach(element => {
                    console.log(element.date);
                    console.log(element.total);
                    setLabels(prevState => [...prevState, element.date]);
                    setData(prevState => [...prevState, element.total]);
                });
            }).catch(err => {
                console.log(err);
            })
        }
    }, [startDate, endDate, filter]);



    const getBack = () => {
        window.history.back();
    }

    const dataChart = {
        labels,
        datasets: [
            {
                label: "Tổng doanh thu (triệu VND)",
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
                data: data
            }
        ]
    }

    const handleChange = (event) => {
        setFilter(event.target.value);
        if (event.target.value === "today") {
            setStartDate(today);
            setEndDate(today);
        }
    };

    const handleChangeStartDate = (newValue) => {
        setStartDate(dayjs(newValue).format('YYYY-MM-DD'));
    };

    const handleChangeEndDate = (newValue) => {
        setEndDate(dayjs(newValue).format('YYYY-MM-DD'));
    };

    useEffect(() => {
        setData([]);
        setLabels([]);
        if (filter === "month") {
            StatisticAPI.getYearStatistic(dayjs(yearFilter).format('YYYY')).then(res => {
                res.data.forEach(element => {
                    console.log(element.date);
                    console.log(element.total);
                    setLabels(prevState => [...prevState, element.date]);
                    setData(prevState => [...prevState, element.total]);
                });
            }).catch(err => {
                console.log(err);
            })
        }
    }, [filter, yearFilter])

    return (
        <div className="analysis-wrapper">
            <h1>Thống kê doanh số</h1>
            <Typography id="transition-modal-title" variant='subtitle1' component="h4" marginBottom="20px" onClick={getBack}
                sx={{
                    cursor: "pointer",
                    "&:hover": {
                        color: "#ccc",
                    }
                }}>
                <i class="fa-solid fa-chevron-left"></i>
                Quay lại
            </Typography>
            <div>
                <Box sx={{ width: "200px", backgroundColor: "white ", mb: 2 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Thống kê theo</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filter}
                            label="Thống kê theo"
                            onChange={handleChange}
                        >
                            <MenuItem value="day"> Khoảng ngày</MenuItem>
                            <MenuItem value="month">Tháng trong năm</MenuItem>
                            <MenuItem value="today">Hôm nay</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                {filter === "day" ?
                    (<div>
                        <DesktopDatePicker
                            label="Ngày bắt đầu"
                            inputFormat="DD/MM/YYYY"
                            value={startDate}
                            onChange={handleChangeStartDate}
                            renderInput={(params) => <TextField sx={{ ml: 2, mr: 2 }} {...params} />}
                        />
                        <DesktopDatePicker
                            label="Ngày kết thúc"
                            inputFormat="DD/MM/YYYY"
                            value={endDate}
                            onChange={handleChangeEndDate}
                            renderInput={(params) => <TextField sx={{ ml: 2, mr: 2 }} {...params} />}
                        />
                    </div>)
                    : filter === "month" ? (
                        <DatePicker
                            views={['year']}
                            label="Năm"
                            value={yearFilter}
                            onChange={(newValue) => {
                                setYearFilter(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} helperText={null} />}
                        />
                    ) : (<div></div>)}
            </div>
            <Box sx={{ width: "100%", backgroundColor: "white", borderRadius: "10px" }}>
                <Bar
                    data={dataChart} options={options}
                />
            </Box>
        </div>
    );
}


export default Analysis;