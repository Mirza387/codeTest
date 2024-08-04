import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const birthsBarChart = ({ data }) => {
    const years = ['2016', '2017', '2018', '2019', '2020'];

    const maleDatasets = data.map(item => ({
        label: `Males - ${item.municipality}`,
        data: years.map(year => item.births[year]?.male || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
    }));

    const femaleDatasets = data.map(item => ({
        label: `Females - ${item.municipality}`,
        data: years.map(year => item.births[year]?.female || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
    }));

    const chartData = {
        labels: years,
        datasets: [...maleDatasets, ...femaleDatasets],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                labels: {
                    generateLabels: (chart) => {
                        const maleColor = 'rgba(75, 192, 192, 1)';
                        const femaleColor = 'rgba(255, 99, 132, 1)';
                        return [
                            {
                                text: 'Males',
                                fillStyle: maleColor,
                                hidden: false,
                                lineCap: 'butt',
                                lineDash: [],
                                lineDashOffset: 0,
                                lineJoin: 'miter',
                                lineWidth: 0,
                                strokeStyle: maleColor,
                                pointStyle: 'rect',
                            },
                            {
                                text: 'Females',
                                fillStyle: femaleColor,
                                hidden: false,
                                lineCap: 'butt',
                                lineDash: [],
                                lineDashOffset: 0,
                                lineJoin: 'miter',
                                lineWidth: 0,
                                strokeStyle: femaleColor,
                                pointStyle: 'rect',
                            },
                        ];
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label || '';
                        if (context.parsed.y !== null) {
                            label += `: ${context.parsed.y}`;
                        }
                        return label;
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: '1000px', height: '1000px' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default birthsBarChart;
