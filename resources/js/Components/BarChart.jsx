import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    plugins: {
        title: {
            display: true,
        },
    },
    responsive: true,
    scales: {
        x: {
            stacked: false,
        },
        y: {
            stacked: false,
        },
    },
};
function randomInRange(from, to) {
    var r = Math.random();
    return Math.floor(r * (to - from) + from);
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Calatagan',
            data: labels.map(() => randomInRange(0, 5)),
            backgroundColor: 'rgb(255, 99, 132)',
        },
        {
            label: 'Gogon Centro',
            data: labels.map(() => randomInRange(0, 5)),
            backgroundColor: 'rgb(75, 192, 192)',
        },
        {
            label: 'Rawis',
            data: labels.map(() => randomInRange(0, 5)),
            backgroundColor: 'rgb(53, 162, 235)',
        },
    ],
};

export function BarChart() {
    return <Bar options={options} data={data} />;
}
