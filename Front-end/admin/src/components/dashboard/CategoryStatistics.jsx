import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import CategoriesAPI from "../../api/CategoriesAPI";

ChartJS.register(ArcElement, Tooltip, Legend);
export const CategoryStatistic = () => {
    const [labels, setLabels] = React.useState([]);
    const [cateData, setCateData] = React.useState([]);

    useEffect(() => {
        setLabels([]);
        setCateData([]);
        CategoriesAPI.getCategoryStatistic().then((res) => {
            res.data.forEach((element) => {
                setLabels((prevState) => [...prevState, element.categoryName]);
                setCateData((prevState) => [
                    ...prevState,
                    element.productQuantity,
                ]);
            });
        });
    }, []);

    const dataChart = {
        labels,
        datasets: [
            {
                data: cateData,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 153, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };
    // return <Pie data={data} />;
    return (
        <div>
            <Typography
                variant="h6"
                component="h6"
                sx={{ fontSize: "14px", marginTop: 1, fontWeight: "Bold" }}
            >
                Số lượng sản phẩm mỗi danh mục
            </Typography>
            <Pie data={dataChart} />
        </div>
        // <div>Check</div>
    );
};
