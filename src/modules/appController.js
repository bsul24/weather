import { getRawWeatherData } from "./weatherAPI.js";
import { processWeatherData } from "./weatherData.js";

let currentWeather = null;
let currentUnit = "F";

export async function searchWeather(location) {
  const rawWeatherData = await getRawWeatherData(location);
  currentWeather = processWeatherData(rawWeatherData);
  return currentWeather;
}

export function getCurrentWeather() {
  return currentWeather;
}

export function getCurrentUnit() {
  return currentUnit;
}

export function toggleUnit() {
  currentUnit = currentUnit === "F" ? "C" : "F";
  return currentUnit;
}
