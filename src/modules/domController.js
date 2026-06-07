import {
  searchWeather,
  getCurrentWeather,
  getCurrentUnit,
  toggleUnit,
} from "./appController.js";

const searchForm = document.querySelector(".search-form");
const weatherDisplay = document.querySelector(".weather-display");
const statusMessage = document.querySelector(".status-message");
const unitBtn = document.querySelector(".unit-toggle");

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

export function initDOMEvents() {
  searchForm.addEventListener("submit", handleSearch);
  unitBtn.addEventListener("click", handleUnitBtnClick);
  renderUnitToggle();
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
    searchForm.reset();
    const weatherData = await searchWeather(searchValue);
    renderWeather(weatherData);
    clearStatus();
  } catch (err) {
    clearStatus();
    console.error(err);
    renderError("Could not find weather data for that location.");
  }
}

function handleUnitBtnClick() {
  toggleUnit();
  renderUnitToggle();
  const curWeather = getCurrentWeather();
  if (curWeather) {
    renderWeather(curWeather);
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
