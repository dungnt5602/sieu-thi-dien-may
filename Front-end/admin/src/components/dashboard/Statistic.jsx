import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
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
    scales: {
        x: {
            ticks: {
                font: {
                    size: 7
                }
            }
        }
    }
};


export const Statistic = () => {
    const [labels, setLabels] = React.useState([]);
    const [data, setData] = React.useState([]);
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;
    const [startDate, setStartDate] = React.useState(today);
    const [endDate, setEndDate] = React.useState(today);

    const [filter, setFilter] = React.useState("today");

    useEffect(() => {
        if (filter === "today") {
            setStartDate(today);
        }
        else if (filter === "3days") {
            const threeDaysAgo = new Date(date.setDate(date.getDate() - 2));
            const year = threeDaysAgo.getFullYear();
            const month = String(threeDaysAgo.getMonth() + 1).padStart(2, '0');
            const day = String(threeDaysAgo.getDate()).padStart(2, '0');
            const threeDaysAgoString = `${year}-${month}-${day}`;
            setStartDate(threeDaysAgoString);
        }
        else if (filter === "7days") {
            const sevenDaysAgo = new Date(date.setDate(date.getDate() - 6));
            const year = sevenDaysAgo.getFullYear();
            const month = String(sevenDaysAgo.getMonth() + 1).padStart(2, '0');
            const day = String(sevenDaysAgo.getDate()).padStart(2, '0');
            const sevenDaysAgoString = `${year}-${month}-${day}`;
            setStartDate(sevenDaysAgoString);
        }
        StatisticAPI.getStatistic(startDate, endDate).then(res => {
            setLabels([]);
            setData([]);
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
    }, [startDate, endDate, filter, today]);

    const dataChart = {
        labels,
        datasets: [
            {
                label: "Tổng doanh thu (VND)",
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba(0,0,0,1)",
                borderWidth: 1,
                data: data
            }
        ]
    }

    return (
        <div>
            <select onChange={(e) => setFilter(e.target.value)}>
                <option value="today">Hôm nay</option>
                <option value="3days">3 ngày trước</option>
                <option value="7days">7 ngày trước</option>
            </select>
            <Bar
                data={dataChart} options={options}
            />
        </div>
    );
}