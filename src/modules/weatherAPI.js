export async function getRawWeatherData(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=us&contentType=json&key=${"CW8W2BVAPWP334DQ26VVLBVFF"}`,
  );
  if (!response.ok) {
    throw new Error(`Weather request failed: ${response.status}`);
  }
  const json = await response.json();
  return json;
}
