import { countryData } from "./script.js";
export const continentGraph = document
  .getElementById("continent-graph")
  .getContext("2d");
// export const countryGraph = document
//   .getElementById("country-graph")
//   .getContext("2d");

export let chartLabels = {
  mainLabel: "",
  xlabels: [],
  ylabels: {
    deaths: [],
    confirmed: [],
    permillion: [],
  },
};

let labels = chartLabels.xlabels;
let data = {
  datasets: [
    {
      label: chartLabels.mainLabel,
      backgroundColor: [],
      borderColor: [],
      data: chartLabels.ylabels.confirmed,
    },
  ],
  labels: labels,
};
const config = {
  type: "bar",
  data: data,
  options: {
    title: {
      display: true,
      text: `Covid-19 Statistics Chart  ${chartLabels.mainLabel}`,
    },

    legend: {
      display: false,
    },
  },
};
export let mainChart = null;
export function clearChartData() {
  data.labels = [];
  data.datasets[0].data = [];
}
export function updateChart(label, x, y) {
  const dataset = data.datasets[0];
  chartLabels.mainLabel = label;
  dataset.data.push(y);
  data.labels.push(x);
  console.log(dataset);
}
export function drawChart() {
  randomColorGenerator(chartLabels.xlabels);
  if (mainChart) {
    mainChart.destroy();
  }

  mainChart = new Chart(
    continentGraph,

    config
  );
}

// export const countryChartObj = new Chart(countryGraph, {
//   type: "bar",
//   data: {
//     labels: [],
//     datasets: [
//       {
//         label: "",
//         data: [],
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.2)",
//           "rgba(54, 162, 235, 0.2)",
//           "rgba(255, 206, 86, 0.2)",
//         ],
//         borderColor: [
//           "rgba(255, 99, 132, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 206, 86, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   },
//   options: {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// });

function randomColorGenerator(arr) {
  function randomRGB() {
    const randomNum = () => Math.floor(Math.random() * 256);
    const r = randomNum();
    const b = randomNum();
    const g = randomNum();
    return `rgb(${r},${g},${b})`;
  }

  arr.forEach((item) => {
    let color = randomRGB();
    data.datasets[0].backgroundColor.push(color);
  });
}
// window.addEventListener("resize", function () {
//   if (window.matchMedia("(min-width: 900px)").matches) {
//     continentGraph.height = "200";
//     mainChart.update();
//     mainChart.render();
//   } else if (window.matchMedia("(max-width: 500px)").matches) {
//     continentGraph.height = "600";
//     mainChart.update();
//     mainChart.render();
//   }
// });
