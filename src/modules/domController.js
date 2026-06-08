import {
  searchWeather,
  getCurrentWeather,
  getCurrentUnit,
  toggleUnit,
} from "./appController.js";
import { getWeatherIcon } from "./weatherIcons.js";
import { applyWeatherTheme } from "./weatherTheme.js";

const searchForm = document.querySelector(".search-form");
const weatherDisplay = document.querySelector(".weather-display");
const forecastDisplay = document.querySelector(".forecast-display");
const statusMessage = document.querySelector(".status-message");
const submitBtn = document.querySelector(".submit-btn");
const unitBtn = document.querySelector(".unit-toggle");

function renderWeather(weatherData) {
  const unit = getCurrentUnit();
  const iconSource = getWeatherIcon(weatherData.icon);
  weatherDisplay.innerHTML = `
    <img class="weather-icon" src="${iconSource}" alt="${weatherData.condition}" />
    <p class="location">Location: ${weatherData.location}</p>
    <p class="temperature">Temperature: ${unit === "F" ? weatherData.tempF : weatherData.tempC}°${unit === "F" ? "F" : "C"}</p>
    <p class="feels-like-temperature">Feels Like: ${unit === "F" ? weatherData.feelsLikeF : weatherData.feelsLikeC}°${unit === "F" ? "F" : "C"}</p>
    <p class="condition">Condition: ${weatherData.condition}</p>
    <p class="description">Description: ${weatherData.description}</p>
    <p class="sunrise">Sunrise: ${weatherData.sunrise}</p>
    <p class="sunset">Sunset: ${weatherData.sunset}</p>
    <p class="uv-index">UV Index: ${weatherData.uvIndex}</p>
    <p class="humidity">Humidity: ${weatherData.humidity}%</p>
    <p class="wind-speed">Wind Speed: ${weatherData.windSpeed} mph</p>
  `;
}

function renderForecast(forecast) {
  forecastDisplay.textContent = "";
  if (!forecast || forecast.length === 0) {
    return;
  }
  const unit = getCurrentUnit();
  let html = `<h2>Forecast</h2>`;
  forecast.forEach((day) => {
    const iconSource = getWeatherIcon(day.icon);
    html += `
      <div class="forecast-card">
        <img class="forecast-icon" src="${iconSource}" alt="${day.condition}" />
        <p class="forecast-card-date">${day.displayDate}</p>
        <p class="forecast-card-condition">Conditions: ${day.condition}</p>
        <p class="forecast-card-high-temp">High Temp: ${unit === "F" ? day.tempMaxF : day.tempMaxC}°${unit === "F" ? "F" : "C"}</p>
        <p class="forecast-card-low-temp">Low Temp: ${unit === "F" ? day.tempMinF : day.tempMinC}°${unit === "F" ? "F" : "C"}</p>
      </div>
    `;
  });
  forecastDisplay.innerHTML = html;
}

export function initDOMEvents() {
  searchForm.addEventListener("submit", handleSearch);
  unitBtn.addEventListener("click", handleUnitBtnClick);
  renderUnitToggle();
  applyWeatherTheme(getCurrentWeather());
}

async function handleSearch(e) {
  e.preventDefault();
  const formData = new FormData(searchForm);
  const searchValue = formData.get("location").trim();
  if (!searchValue) {
    clearStatus();
    renderError("Please enter a location.");
    return;
  }

  try {
    clearStatus();
    renderLoading();
    disableSubmitBtn();
    searchForm.reset();
    const weatherData = await searchWeather(searchValue);
    renderWeather(weatherData);
    renderForecast(weatherData.forecast);
    applyWeatherTheme(weatherData);
    clearStatus();
  } catch (err) {
    clearStatus();
    console.error(err);
    renderError("Could not find weather data for that location.");
  } finally {
    enableSubmitBtn();
  }
}

function disableSubmitBtn() {
  submitBtn.disabled = true;
  submitBtn.textContent = "Searching...";
}

function enableSubmitBtn() {
  submitBtn.disabled = false;
  submitBtn.textContent = "Search";
}

function handleUnitBtnClick() {
  toggleUnit();
  renderUnitToggle();
  const curWeather = getCurrentWeather();
  if (curWeather) {
    renderWeather(curWeather);
    renderForecast(curWeather.forecast);
  }
}

function renderLoading() {
  statusMessage.textContent = "Loading weather...";
}

function renderError(errorMsg) {
  statusMessage.textContent = errorMsg;
}

function clearStatus() {
  statusMessage.textContent = "";
}

function renderUnitToggle() {
  unitBtn.textContent = getCurrentUnit() === "F" ? "Show °C" : "Show °F";
}
