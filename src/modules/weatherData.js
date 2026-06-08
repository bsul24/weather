export function processWeatherData(rawData) {
  return {
    location: rawData.resolvedAddress,
    tempF: rawData.currentConditions.temp,
    tempC: fahrenheitToCelsius(rawData.currentConditions.temp),
    feelsLikeF: rawData.currentConditions.feelslike,
    feelsLikeC: fahrenheitToCelsius(rawData.currentConditions.feelslike),
    sunrise: formatTime(rawData.currentConditions.sunrise),
    sunset: formatTime(rawData.currentConditions.sunset),
    uvIndex: rawData.currentConditions.uvindex ?? "N/A",
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

function formatDate(dateString) {
  if (!dateString) {
    return "";
  }

  const [year, month, day] = dateString.split("-");
  const date = new Date(year, month - 1, day);

  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return formatter.format(date);
}

function formatTime(timeString) {
  if (!timeString) {
    return "";
  }

  let isPM = false;
  const timeParts = timeString.split(":").slice(0, 2);
  timeParts[0] = Number(timeParts[0]);
  if (timeParts[0] >= 12) {
    isPM = true;
  }
  if (timeParts[0] > 12) {
    timeParts[0] -= 12;
  }
  if (timeParts[0] === 0) {
    timeParts[0] = 12;
  }
  return `${timeParts.join(":")} ${isPM ? "PM" : "AM"}`;
}

function buildForecastArray(days) {
  return days.slice(0, 7).map((day) => {
    return {
      date: day.datetime,
      displayDate: formatDate(day.datetime),
      tempMaxF: day.tempmax,
      tempMaxC: fahrenheitToCelsius(day.tempmax),
      tempMinF: day.tempmin,
      tempMinC: fahrenheitToCelsius(day.tempmin),
      condition: day.conditions,
      icon: day.icon,
    };
  });
}
