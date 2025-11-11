export async function getWeather(lat: number, lon: number) {
  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&hourly=temperature_2m,relative_humidity_2m,precipitation,weather_code` +
    `&current_weather=true` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum` +
    `&timezone=auto`;

  console.log("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m", url);

  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) throw new Error("Failed to fetch weather");
  return res.json();
}
