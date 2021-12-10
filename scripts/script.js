import { continentGraph, contChartObj } from "./chart.js";
const PROXY_URL = "https://intense-mesa-62220.herokuapp.com/";
const CONT_URL = "https://restcountries.herokuapp.com/api/v1/region/";
const REGION_URL = "https://restcountries.herokuapp.com/api/v1/subregion/";
const COVID_URL = "http://corona-api.com/countries/";
const continentSelect = document.querySelector("#continents");
const subregionSelect = document.querySelector("#subregions");
const countrySelect = document.querySelector("#countries");
const subregionOptions = document.querySelector("#subregions").childNodes;
// const countrySelect = document.querySelector();
// const countryGraph = document.querySelector();
const errorDiv = document.querySelector(".error-container");
const continents = {
  // asia: {},
  // europe: {},
  // americas: {},
  // oceania: {},
  // antarctica: {},
};
const previouslySelected = [];
const countryCodes = [];
const selectState = {};
const main = (e) => {};
//Event handler - Continents
continentSelect.addEventListener("change", (e) => {
  const value = e.currentTarget.value;
  fetchCountriesInCont(value);
});
//Event handler - Sub-regions
subregionSelect.addEventListener("change", (e) => {
  // main(e);
  const value = e.currentTarget.value;
  console.log(value);
  // drawGraph();
});
//Event handler - Countries
countrySelect.addEventListener("change", (e) => {
  const value = e.currentTarget.value;
  console.log(value);
  // drawCountryGraph()
});
async function fetchCountriesInCont(continent) {
  //check if we have already saved this data
  if (continents[continent]) {
    drawChart(continent);
  } else {
    try {
      const countriesJson = await fetch(`${PROXY_URL}${CONT_URL}${continent}`);
      if (!countriesJson.ok) {
        throw Error(`${countriesJson.status}`);
      }
      const parsedCountries = await countriesJson.json();
      // console.log(parsedCountries);
      saveCodes(continent, parsedCountries);
      fetchCountry(continent, countryCodes);
      // previouslySelected.push(continent);
      // console.log(previouslySelected);
    } catch (e) {
      errorMessage(`Oops, Something went wrong. Server Message: ${e.message}`);
    }
  }
  // Fetch by sub-region
  async function fetchCountriesInSubRegion(subregion) {
    try {
      const regionJson = await fetch(`${PROXY_URL}${REGION_URL}${subregion}`);
      if (!regionJson.ok) {
        throw Error(`${regionJson.status}`);
      }
      const parsedCountries = await regionJson.json();
      console.log(parsedCountries);
      saveCodes(subregion, parsedCountries);
      fetchCountry(subregion, countryCodes);
    } catch (e) {
      errorMessage(`Oops, Something went wrong. Server Message: ${e.message}`);
    }
  }
}

async function fetchCountry(continent, codes) {
  codes.forEach(async (code) => {
    try {
      const covidJson = await fetch(`${PROXY_URL}${COVID_URL}${code}`);
      if (!covidJson.ok) {
        throw Error(`${covidJson.status}`);
      }
      const parsedCountries = await covidJson.json();
      saveCountryData(continent, parsedCountries);
      console.log(parsedCountries);
    } catch (e) {
      errorMessage(`Oops, Something went wrong. Server Message: ${e.message}`);
    }
  });
}
//Save the country codes to fetch them individually
function saveCodes(continent, countries) {
  continents[continent] = {};
  countries.forEach((country) => {
    const { cca2, subregion, name } = country;
    const conti = continents[continent];
    if ((conti[subregion] = conti[subregion])) {
      conti[subregion].push({ cca2, name: name.common });
    } else {
      createSubRegion(subregion);
      conti[subregion] = [{ cca2, name: name.common }];
    }

    createCountry(name.common);
  });
}
function createSubRegion(subRegion) {
  const option = document.createElement("option");
  option.setAttribute("value", subRegion);
  option.textContent = subRegion;
  subregionSelect.appendChild(option);
}
function createCountry(countName) {
  const option = document.createElement("option");
  option.setAttribute("value", countName);
  option.textContent = countName;
  countrySelect.appendChild(option);
}

//Save the covid stats to be displayed in chart & stats
async function saveCountryData(continent, obj) {
  const data = obj.data;
  const latest = data.latest_data;
  const { confirmed, critical, recovered, deaths, calculated } = latest;
  const { death_rate, recovery_rate } = calculated;
  const shortenedObj = {
    confirmed,
    critical,
    recovered,
    deaths,
    death_rate,
    recovery_rate,
  };
  continents[continent][data.name] = shortenedObj;
}
//Error message display function
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
