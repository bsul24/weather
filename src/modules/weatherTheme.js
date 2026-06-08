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

export function applyWeatherTheme(weatherData) {
  weatherThemes.forEach((theme) => document.body.classList.remove(theme));
  if (weatherData) {
    document.body.classList.add(getWeatherTheme(weatherData.icon));
  } else {
    document.body.classList.add("weather-default");
  }
}
