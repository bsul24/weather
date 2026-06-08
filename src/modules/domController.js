import {
  searchWeather,
  getCurrentWeather,
  getCurrentUnit,
  toggleUnit,
} from "./appController.js";

const searchForm = document.querySelector(".search-form");
const weatherDisplay = document.querySelector(".weather-display");
const forecastDisplay = document.querySelector(".forecast-display");
const statusMessage = document.querySelector(".status-message");
const submitBtn = document.querySelector(".submit-btn");
const unitBtn = document.querySelector(".unit-toggle");
const weatherThemes = [
  "weather-cloudy",
  "weather-clear",
  "weather-rainy",
  "weather-snowy",
  "weather-foggy",
  "weather-stormy",
  "weather-windy",
  "weather-default",
];

function renderWeather(weatherData) {
  const unit = getCurrentUnit();
  weatherDisplay.innerHTML = `
    <p class="location">Location: ${weatherData.location}</p>
    <p class="temperature">Temperature: ${unit === "F" ? weatherData.tempF : weatherData.tempC}°${unit === "F" ? "F" : "C"}</p>
    <p class="condition">Condition: ${weatherData.condition}</p>
    <p class="description">Description: ${weatherData.description}</p>
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
    html += `
      <div class="forecast-card">
        <p class="forecast-card-date">Date: ${day.date}</p>
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
  try {
    const formData = new FormData(searchForm);
    const searchValue = formData.get("location").trim();
    if (!searchValue) {
      clearStatus();
      renderError("Please enter a location.");
      return;
    }
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
}

function enableSubmitBtn() {
  submitBtn.disabled = false;
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

function getWeatherTheme(icon) {
  if (!icon) {
    return "weather-default";
  }
  if (icon.includes("storm") || icon.includes("thunder")) {
    return "weather-stormy";
  }
  if (icon.includes("snow")) {
    return "weather-snowy";
  }
  if (icon.includes("rain") || icon.includes("shower")) {
    return "weather-rainy";
  }
  if (icon.includes("fog")) {
    return "weather-foggy";
  }
  if (icon.includes("wind")) {
    return "weather-windy";
  }
  if (icon.includes("cloudy")) {
    return "weather-cloudy";
  }
  if (icon.includes("clear")) {
    return "weather-clear";
  }
  return "weather-default";
}

function applyWeatherTheme(weatherData) {
  weatherThemes.forEach((theme) => document.body.classList.remove(theme));
  if (weatherData) {
    document.body.classList.add(getWeatherTheme(weatherData.icon));
  } else {
    document.body.classList.add("weather-default");
  }
}
