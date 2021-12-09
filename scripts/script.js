import { continentGraph, contChartObj } from "./chart.js";
const PROXY_URL = "https://intense-mesa-62220.herokuapp.com/";
const CONT_LINK = "https://restcountries.herokuapp.com/api/v1/region/";
// const continentSelect = document.querySelector();
// const countrySelect = document.querySelector();
// const countryGraph = document.querySelector();
const continents = {
  asia: {},
  europe: {},
  americas: {},
  oceania: {},
  asia: {},
};
const buttonState = {};
const main = () => {};

async function fetchCountries(continent) {
  const countriesJson = await fetch(`${PROXY_URL}${CONT_LINK}${continent}`);
  const parsedCountries = await countriesJson.json();
  console.log(parsedCountries);
  saveData(continent, parsedCountries);
}
fetchCountries("oceania");

async function fetchCountry(codes) {}

function saveData(continent, countries) {
  countries.forEach((country) => {
    const { name: countryName, cca2 } = country;
    continents[continent][countryName.common] = { code: cca2 };
    console.log(continents);
  });
}
function updateChart(countriesObj) {}
function isPending(params) {}
function disableButton(params) {}
function calcPercentage() {}
function showPercentage(params) {}
function drawGraph(params) {}
