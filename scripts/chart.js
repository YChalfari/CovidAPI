// import { chartLabels } from "./script.js";
export const continentGraph = document
  .getElementById("continent-graph")
  .getContext("2d");
export const countryGraph = document
  .getElementById("country-graph")
  .getContext("2d");
export const chartLabels = {
  mainLabel: "",
  xlabels: [],
  ylabels: [],
};
let mainChart = null;
export function drawChart(main, x, y) {
  if (mainChart) {
    mainChart.destroy();
  }
  mainChart = new Chart(continentGraph, {
    type: "bar",
    data: {
      labels: chartLabels.ylabels,
      datasets: [
        {
          label: chartLabels.mainLabel,
          data: chartLabels.xlabels,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

export const countryChartObj = new Chart(countryGraph, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});
