import { continentGraph, contChartObj } from "./chart.js";
const PROXY_URL = "https://intense-mesa-62220.herokuapp.com/";
const CONT_URL = "https://restcountries.herokuapp.com/api/v1/region/";
const REGION_URL = "https://restcountries.herokuapp.com/api/v1/subregion/";
const COVID_URL = "http://corona-api.com/countries/";
// const continentSelect = document.querySelector();
// const countrySelect = document.querySelector();
// const countryGraph = document.querySelector();
const errorDiv = document.querySelector(".error-container");
const continents = {
  asia: {},
  europe: {},
  americas: {},
  oceania: {},
  antarctica: {},
};
const countryCodes = [];
const buttonState = {};
const main = () => {};

async function fetchCountriesInCont(continent) {
  try {
    const countriesJson = await fetch(`${PROXY_URL}${CONT_URL}${continent}`);
    if (!countriesJson.ok) {
      throw Error(`${countriesJson.status}`);
    }
    const parsedCountries = await countriesJson.json();

    saveCodes(continent, parsedCountries);
    fetchCountry(countryCodes);
  } catch (e) {
    errorMessage(`Oops, Something went wrong. Server Message: ${e.message}`);
  }
}
// fetchCountriesInCont("antarctica");
async function fetchCountriesInSubRegion(subregion) {
  try {
    const regionJson = await fetch(`${PROXY_URL}${REGION_URL}${subregion}`);
    if (!regionJson.ok) {
      throw Error(`${regionJson.status}`);
    }
    const parsedCountries = await regionJson.json();
    console.log(parsedCountries);
    saveCodes(subregion, parsedCountries);
    fetchCountry(countryCodes);
  } catch (e) {
    errorMessage(`Oops, Something went wrong. Server Message: ${e.message}`);
  }
}
// fetchCountriesInSubRegion("northern america");

async function fetchCountry(codes) {
  codes.forEach(async (code) => {
    try {
      const covidJson = await fetch(`${PROXY_URL}${COVID_URL}${code}`);
      if (!covidJson.ok) {
        throw Error(`${covidJson.status}`);
      }
      const parsedCountries = await covidJson.json();
      console.log(parsedCountries);
    } catch (e) {
      errorMessage(`Oops, Something went wrong. Server Message: ${e.message}`);
    }
  });
}

function saveCodes(continent, countries) {
  countries.forEach((country) => {
    const { cca2 } = country;
    countryCodes.push(cca2);
  });
}
function saveCountryData() {}
function errorMessage(e) {
  errorDiv.textContent = e;
}
// function saveData(continent, countries) {
//   countries.forEach((country) => {
//     const { name: countryName, cca2 } = country;
//     continents[continent][countryName.common] = { code: cca2 };
//     console.log(continents);
//   });
// }
function updateChart(countriesObj) {}
function isPending(params) {}
function disableButton(params) {}
function calcPercentage() {}
function showPercentage(params) {}
function drawGraph(params) {}
