import React, { useEffect, useRef, useState } from 'react';

import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import "./RealtimeChart.css";
import moment, { Moment } from "moment";


const Chart = require("react-chartjs-2").Chart;

type Point = {
    x: Moment;
    y: number;
}

// {
//     "server1": Point[],
//     "server2": Point[],
//     "server3": Point[]
// }

const RealtimeChart = (props: {chartData: Point[]}) => {

    const chartColors = {
        red: "rgb(255, 99, 132)",
        orange: "rgb(255, 159, 64)",
        yellow: "rgb(255, 205, 86)",
        blue: "rgb(54, 162, 235)",
        purple: "rgb(153, 102, 255)",
        grey: "rgb(201, 203, 207)",
        green: "rgb(8, 162, 49)"
    };

    const color = Chart.helpers.color;
    const datasets = {
        datasets: [
            {
                backgroundColor: color(chartColors.green).alpha(0.5).rgbString(),
                borderColor: chartColors.green,
                fill: false,
                lineTension: 0.2,
                data: props.chartData
            }
        ]
    };

    const options = {
        legend: {
            display: false
         },
        tooltips: {enabled: false},
        hover: {mode: null},
        scales: {
            xAxes: [
                {
                    type: "realtime",
                    distribution: "linear",
                    realtime: {
                        duration: 60000,
                        refresh: 1000,
                        delay: 0,
                        time: {
                            displayFormat: "mm:ss"
                        }
                    },
                }
            ],
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                        max: 1
                    }
                }
            ]
        }
    };

    return (
        <div className='chart-wrapper'>
            <Line data={datasets} options={options} />
        </div>
    )
}

export default RealtimeChart;