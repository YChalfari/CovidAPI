import {
  continentGraph,
  // mainChart,
  countryChartObj,
  countryGraph,
  chartLabels,
  drawChart,
} from "./chart.js";
//LINKS
const PROXY_URL = "https://intense-mesa-62220.herokuapp.com/";
const CONT_URL = "https://restcountries.herokuapp.com/api/v1/region/";
const REGION_URL = "https://restcountries.herokuapp.com/api/v1/subregion/";
const COVID_URL = "http://corona-api.com/countries/";
//Select options
const continentSelect = document.querySelector("#continents");
const subregionSelect = document.querySelector("#subregions");
const countrySelect = document.querySelector("#countries");

const errorDiv = document.querySelector(".error-container");

const continents = {};
const countryData = {};
const countryCodes = [];

//Event handler - Continents
continentSelect.addEventListener("change", (e) => {
  const value = e.currentTarget.value;
  chartLabels.mainLabel = value;
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

      saveCountryData(continent, parsedCountries);
      fetchCountry(countryData);
      drawChart();
    } catch (e) {
      errorMessage(`Oops, Something went wrong. Server Message: ${e.message}`);
    }
  }
}

async function fetchCountry(countData) {
  console.log(countData);
  for (const key in countData) {
    try {
      const covidJson = await fetch(`${PROXY_URL}${COVID_URL}${key}`);
      if (!covidJson.ok) {
        throw Error(`${covidJson.status}`);
      }
      const parsedCountries = await covidJson.json();
      saveCountryStats(key, parsedCountries);
    } catch (e) {
      errorMessage(`Oops, Something went wrong. Server Message: ${e.message}`);
    }
  }
  console.log(continents);
}
//Save the country codes to fetch them individually
function saveCountryData(continent, countries) {
  continents[continent] = {};
  countries.forEach((country) => {
    const { cca2, subregion, name } = country;
    const conti = continents[continent];
    //  ( = conti[subregion])
    if (conti[subregion]) {
      conti[subregion].push({ cca2, name: name.common });
    } else {
      createSubRegion(subregion);
      conti[subregion] = [{ cca2, name: name.common }];
    }

    if (cca2 !== "XK") {
      countryData[cca2] = { name: name.common };
    }

    createCountryOption(name.common, cca2);
  });
  console.log(countryData);
}
function createSubRegion(subRegion) {
  const option = document.createElement("option");
  option.setAttribute("value", subRegion);
  option.textContent = subRegion;
  subregionSelect.appendChild(option);
}
function createCountryOption(countName, countCode) {
  const option = document.createElement("option");
  option.setAttribute("value", countCode);
  option.textContent = countName;
  countrySelect.appendChild(option);
}

//Save the covid stats to be displayed in chart & stats
function saveCountryStats(key, obj) {
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
  countryData[key].stats = shortenedObj;
  console.log(countryData);
  chartLabels.xlabels.push(confirmed);
  chartLabels.ylabels.push(data.name);

  drawChart();
}
//Error message display function
function errorMessage(e) {
  errorDiv.textContent = e;
}

function drawGraph(main, x, y) {
  chartLabels.mainLabel = main;
  chartLabels.x = x;
  chartLabels.y = y;
}
