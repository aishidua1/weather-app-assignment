import type { WeatherData } from "@/types/weather";

export async function getWeather(lat: number, lon: number): Promise<WeatherData> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,precipitation,weather_code&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) throw new Error("Failed to fetch weather");
  return res.json();
}
