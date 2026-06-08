# Weather App

A responsive weather forecast app built for The Odin Project. Users can search for a location, view current weather conditions, see a 7-day forecast, and toggle temperatures between Fahrenheit and Celsius.

The app uses the Visual Crossing Weather API and updates the page theme and weather icons based on the returned conditions.

## Features

- Search weather by location
- View current weather and a 7-day forecast
- Toggle between Fahrenheit and Celsius
- Display real SVG weather icons
- Change the page theme based on weather conditions
- Show loading and error states
- Display feels-like temperature, humidity, wind speed, UV index, sunrise, and sunset
- Responsive layout for desktop and mobile screens

## Built With

- HTML
- CSS
- JavaScript
- Webpack
- ESLint
- Prettier
- Visual Crossing Weather API

## What I Practiced

- Fetching data from an API with `async`/`await`
- Handling errors with `try`/`catch`/`finally`
- Separating code into focused modules
- Processing raw API data into cleaner app data
- Managing simple app state
- Rendering dynamic DOM content
- Importing local SVG assets with webpack
- Building responsive layouts with CSS Grid and Flexbox

## Project Structure

```txt
src/
  assets/
    weather-icons/
  modules/
    appController.js
    domController.js
    weatherAPI.js
    weatherData.js
    weatherIcons.js
    weatherTheme.js
  index.js
  styles.css
  template.html
```

## API Key Note

This project uses the Visual Crossing Weather API directly from the frontend as part of The Odin Project assignment.

In a production app, API keys should be protected on a server instead of exposed in client-side code.

## Installation

Clone the repository:

```bash
git clone https://github.com/bsul24/weather.git
cd weather
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run linting and formatting checks:

```bash
npm run lint
npm run format:check
```

## Live Demo

[View the live app](https://weather-bsul24.netlify.app/)

## Acknowledgments

- [The Odin Project](https://www.theodinproject.com/)
- [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)
- Weather icons from [Visual Crossing WeatherIcons](https://github.com/visualcrossing/WeatherIcons)
