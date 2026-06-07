import "./styles.css";
import { getWeatherData } from "./modules/weatherAPI.js";

const searchForm = document.querySelector(".search-form");

async function handleSearch(e) {
  e.preventDefault();
  try {
    const formData = new FormData(searchForm);
    const searchValue = formData.get("location").trim();
    if (!searchValue) {
      throw new Error("No location entered");
    }
    const weatherData = await getWeatherData(searchValue);

    console.log(weatherData);
    searchForm.reset();
  } catch (err) {
    console.error(err);
  }
}

searchForm.addEventListener("submit", handleSearch);
