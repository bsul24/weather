export function processWeatherData(rawData) {
  return {
    location: rawData.resolvedAddress,
    tempF: rawData.currentConditions.temp,
    tempC: fahrenheitToCelsius(rawData.currentConditions.temp),
    feelsLikeF: rawData.currentConditions.feelslike,
    feelsLikeC: fahrenheitToCelsius(rawData.currentConditions.feelslike),
    condition: rawData.currentConditions.conditions,
    description: rawData.description,
    humidity: rawData.currentConditions.humidity,
    windSpeed: rawData.currentConditions.windspeed,
    icon: rawData.currentConditions.icon,
    forecast: buildForecastArray(rawData.days),
  };
}

function fahrenheitToCelsius(tempF) {
  return Number(((tempF - 32) * (5 / 9)).toFixed(1));
}

function buildForecastArray(days) {
  return days.slice(0, 7).map((day) => {
    return {
      date: day.datetime,
      tempMaxF: day.tempmax,
      tempMaxC: fahrenheitToCelsius(day.tempmax),
      tempMinF: day.tempmin,
      tempMinC: fahrenheitToCelsius(day.tempmin),
      condition: day.conditions,
      icon: day.icon,
    };
  });
}
