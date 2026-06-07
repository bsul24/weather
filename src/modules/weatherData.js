export function processWeatherData(rawData) {
  return {
    location: rawData.resolvedAddress,
    tempF: rawData.currentConditions.temp,
    tempC: Number(
      fahrenheitToCelsius(rawData.currentConditions.temp).toFixed(1),
    ),
    feelsLikeF: rawData.currentConditions.feelslike,
    feelsLikeC: Number(
      fahrenheitToCelsius(rawData.currentConditions.feelslike).toFixed(1),
    ),
    condition: rawData.currentConditions.conditions,
    description: rawData.description,
    humidity: rawData.currentConditions.humidity,
    windSpeed: rawData.currentConditions.windspeed,
    icon: rawData.currentConditions.icon,
  };
}

function fahrenheitToCelsius(tempF) {
  return (tempF - 32) * (5 / 9);
}
