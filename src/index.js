import "./styles.css";
import { getRawWeatherData } from "./modules/weatherAPI.js";
import { processWeatherData } from "./modules/weatherData.js";

const searchForm = document.querySelector(".search-form");

async function handleSearch(e) {
  e.preventDefault();
  try {
    const formData = new FormData(searchForm);
    const searchValue = formData.get("location").trim();
    if (!searchValue) {
      throw new Error("No location entered");
    }
    const rawWeatherData = await getRawWeatherData(searchValue);
    const cleanWeatherData = processWeatherData(rawWeatherData);
    console.log(cleanWeatherData);
    searchForm.reset();
  } catch (err) {
    console.error(err);
  }
}

searchForm.addEventListener("submit", handleSearch);
