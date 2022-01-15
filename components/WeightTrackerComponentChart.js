import { Line } from "react-chartjs-2";
import { weightTrackerData } from "./WeightTrackerJSON.json";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { useRef } from "react";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const WeightTrackerComponentChart = () => {
    const chartRef = useRef(null);

    const label = weightTrackerData.map((val) => val.date);
    const dataset = weightTrackerData.map((val) => {
        return parseInt(val.weight) + 30;
    });
    let gradient = null;
    const chartData = () => {
        const result = {
            labels: label,
            datasets: [
                {
                    data: dataset,
                    borderColor: "#FFAF00",
                    borderWidth: 4,
                    lineTension: 0.4,
                    pointRadius: 0,
                    fill: true,
                    backgroundColor: gradient,
                },
            ],
        };
        return result;
    };
    if (chartRef.current) {
        console.log(chartRef.current);
        gradient = chartRef.current.ctx.createLinearGradient(
            0,
            0,
            0,
            chartRef.current.height
        );

        // Add three color stops
        gradient.addColorStop(0, "rgba(255, 92, 0, 1)");
        gradient.addColorStop(0.4, "rgba(255, 92, 0, 0.5)");
        gradient.addColorStop(0.9, "rgba(196, 196, 196, 0)");
    }
    const option = {
        tooltips: false,
        // responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 3,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                min: 0,
                max: 175,
                beginAtZero: true,
                grid: {
                    display: false,
                },
                ticks: {
                    color: "white",
                    stepSize: 25,
                    font: {
                        size: typeof window !== 'undefined' && window.innerWidth > 576 ? 20 : 10,
                    },
                    crossAlign: "center",
                },
            },
            x: {
                title: {
                    display: true,
                    text: monthNames[new Date().getMonth()].substring(0, 3),
                    align: "start",
                    color: "white",
                    font: {
                        size: 20,
                    },
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.35)",
                },
                ticks: {
                    crossAlign: "near",
                    color: "white",
                    maxRotation: 0,
                    minRotation: 0,
                    font: {
                        size: typeof window !== 'undefined' && window.innerWidth > 576 ? 20 : 10,
                    },
                },
            },
        },
    };
    return <Line ref={chartRef} data={chartData()} options={option} />;
};

export default WeightTrackerComponentChart;
