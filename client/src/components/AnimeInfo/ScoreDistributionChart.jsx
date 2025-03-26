import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ScoreDistributionChart = ({ anime }) => {
  const xData = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const yData = anime.stats.scoreDistribution.map((sd) => sd.amount);

  const data = {
    labels: xData,
    datasets: [
      {
        label: "Score Distribution",
        data: yData,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ScoreDistributionChart;
