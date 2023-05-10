import React, { useEffect, useRef, useState } from 'react';

import { Line, Bar } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import "./RealtimeChart.css";

const Chart = require("react-chartjs-2").Chart;


// {
//     "server1": Point[],
//     "server2": Point[],
//     "server3": Point[]
// }

const RealtimeChart = (props: {chartData: any}) => {

    const chartColors = [
        "rgb(84, 33, 255)",
        "rgb(5, 171, 57)",
        "rgb(0, 0, 0)",
        "rgb(248, 36, 49)"
    ];
    let colorIndex = 0;

    const color = Chart.helpers.color;
    const dataContainer = {
        datasets: [
            {
                label: "d1",
                backgroundColor: color(chartColors.at(0)).rgbString(),
                borderColor: chartColors.at(0),
                fill: false,
                lineTension: 0.2,
                data: [{}]
            },
            {
                label: "d2",
                backgroundColor: color(chartColors.at(1)).rgbString(),
                borderColor: chartColors.at(1),
                fill: false,
                lineTension: 0.2,
                data: [{}]
            },
            {
                label: "d3",
                backgroundColor: color(chartColors.at(2)).rgbString(),
                borderColor: chartColors.at(2),
                fill: false,
                lineTension: 0.2,
                data: [{}]
            },
            {
                label: "d4",
                backgroundColor: color(chartColors.at(3)).rgbString(),
                borderColor: chartColors.at(3),
                fill: false,
                lineTension: 0.2,
                data: [{}]
            }
        ]
    };

    const options = {
        legend: {
            display: false
         },
        tooltips: {enabled: false},
        hover: {mode: null},
        animation: {
            duration: 0
        },
        scales: {
            xAxes: [
                {
                    type: "realtime",
                    distribution: "linear",
                    realtime: {
                        duration: 120000,
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

    Object.keys(props.chartData).forEach(key => {
        // console.log(JSON.stringify(props.chartData[key].length));

        dataContainer.datasets[colorIndex++].data = [...props.chartData[key]];
        
    });
    console.log(JSON.stringify(dataContainer.datasets[0].data.length));
    
    return (
        <div className='chart-wrapper'>
            <Bar data={dataContainer} options={options} />
        </div>
    )
}

export default RealtimeChart;