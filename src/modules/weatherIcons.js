import clearDayIcon from "../assets/weather-icons/clear-day.svg";
import clearNightIcon from "../assets/weather-icons/clear-night.svg";
import cloudyIcon from "../assets/weather-icons/cloudy.svg";
import fogIcon from "../assets/weather-icons/fog.svg";
import partlyCloudyDayIcon from "../assets/weather-icons/partly-cloudy-day.svg";
import partlyCloudyNightIcon from "../assets/weather-icons/partly-cloudy-night.svg";
import rainIcon from "../assets/weather-icons/rain.svg";
import snowIcon from "../assets/weather-icons/snow.svg";
import thunderRainIcon from "../assets/weather-icons/thunder-rain.svg";
import windIcon from "../assets/weather-icons/wind.svg";

const weatherIcons = {
  "clear-day": clearDayIcon,
  "clear-night": clearNightIcon,
  cloudy: cloudyIcon,
  fog: fogIcon,
  "partly-cloudy-day": partlyCloudyDayIcon,
  "partly-cloudy-night": partlyCloudyNightIcon,
  rain: rainIcon,
  snow: snowIcon,
  "thunder-rain": thunderRainIcon,
  wind: windIcon,
  "showers-day": rainIcon,
  "showers-night": rainIcon,
  "snow-showers-day": snowIcon,
  "snow-showers-night": snowIcon,
  "thunder-showers-day": thunderRainIcon,
  "thunder-showers-night": thunderRainIcon,
};

export function getWeatherIcon(iconName) {
  return weatherIcons[iconName] || weatherIcons.cloudy;
}
