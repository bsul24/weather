import {
  searchWeather,
  getCurrentWeather,
  getCurrentUnit,
  toggleUnit,
} from "./appController.js";

const searchForm = document.querySelector(".search-form");
const weatherDisplay = document.querySelector(".weather-display");
const statusMessage = document.querySelector(".status-message");

function renderWeather(weatherData) {
  weatherDisplay.innerHTML = `
    <p class="location">Location: ${weatherData.location}</p>
    <p class="temperature">Temperature: ${weatherData.tempF}°${getCurrentUnit === "F" ? "F" : "C"}</p>
    <p class="condition">Condition: ${weatherData.condition}</p>
    <p class="description">Description: ${weatherData.description}</p>
    <p class="humidity">Humidity: ${weatherData.humidity}%</p>
    <p class="wind-speed">Wind Speed: ${weatherData.windSpeed} mph</p>
  `;
}

export function initDOMEvents() {
  searchForm.addEventListener("submit", handleSearch);
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

function renderLoading() {
  statusMessage.textContent = "Loading weather...";
}

function renderError(errorMsg) {
  statusMessage.textContent = errorMsg;
}

function clearStatus() {
  statusMessage.textContent = "";
}
