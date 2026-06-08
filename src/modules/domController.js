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
  const temp = unit === "F" ? weatherData.tempF : weatherData.tempC;
  const feelsLike =
    unit === "F" ? weatherData.feelsLikeF : weatherData.feelsLikeC;

  weatherDisplay.innerHTML = `
    <div class="current-weather-main">
      <img class="weather-icon" src="${iconSource}" alt="${weatherData.condition}" />
      <div>
        <p class="location">${weatherData.location}</p>
        <p class="temperature">${temp}°${unit}</p>
        <p class="condition">${weatherData.condition}</p>
        <p class="feels-like-temperature">Feels like ${feelsLike}°${unit}</p>
      </div>
    </div>

    <p class="description">${weatherData.description}</p>

    <div class="weather-details">
      <div class="weather-detail">
        <span class="detail-label">Humidity</span>
        <span class="detail-value">${weatherData.humidity}%</span>
      </div>
      <div class="weather-detail">
        <span class="detail-label">Wind</span>
        <span class="detail-value">${weatherData.windSpeed} mph</span>
      </div>
      <div class="weather-detail">
        <span class="detail-label">UV Index</span>
        <span class="detail-value">${weatherData.uvIndex}</span>
      </div>
      <div class="weather-detail">
        <span class="detail-label">Sunrise</span>
        <span class="detail-value">${weatherData.sunrise}</span>
      </div>
      <div class="weather-detail">
        <span class="detail-label">Sunset</span>
        <span class="detail-value">${weatherData.sunset}</span>
      </div>
    </div>
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
        <p class="forecast-card-date">${day.displayDate}</p>
        <img class="forecast-icon" src="${iconSource}" alt="${day.condition}" />
        <p class="forecast-card-condition">${day.condition}</p>
        <div class="forecast-temps">
          <span>High ${unit === "F" ? day.tempMaxF : day.tempMaxC}°${unit}</span>
          <span>Low ${unit === "F" ? day.tempMinF : day.tempMinC}°${unit}</span>
        </div>
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
  statusMessage.classList.remove("status-error");
  statusMessage.classList.add("status-loading");
}

function renderError(errorMsg) {
  statusMessage.textContent = errorMsg;
  statusMessage.classList.remove("status-loading");
  statusMessage.classList.add("status-error");
}

function clearStatus() {
  statusMessage.textContent = "";
  statusMessage.classList.remove("status-loading", "status-error");
}

function renderUnitToggle() {
  unitBtn.textContent = getCurrentUnit() === "F" ? "Show °C" : "Show °F";
}
