"use client";
// import type { City } from "@/data/cities";
// import { CITIES } from "@/data/cities";
// import { DUMMY_WEATHER_DATA } from "@/data/weather-data";
// import type { CurrentWeather } from "@/types/weather";

import CityGrid from "../../components/CityCard";
import type { City } from "../../data/cities";
import { CITIES } from "../../data/cities";
import { DUMMY_WEATHER_DATA } from "../../data/weather-data";
import type { CurrentWeather } from "../../types/weather";

// Map whatever shape you have to a uniform shape the UI can use
type Normalized = {
  temp: number;
  condition: string;
  high: number;
  low: number;
  humidity: number;
  wind: number;
};

// Try common field names + a nested "current" object fallback
function normalizeWeather(raw: any): Normalized | null {
  if (!raw) return null;

  const current = raw.current ?? raw; // support { current: {...} } or flat

  const temp =
    current.temp ?? current.temperature ?? current.tempF ?? current.tempC;
  const condition =
    current.condition ?? current.description ?? current.weather ?? "";
  const high = current.high ?? current.highTemp ?? current.max ?? current.maxTemp;
  const low = current.low ?? current.lowTemp ?? current.min ?? current.minTemp;
  const humidity = current.humidity ?? current.humidityPct ?? current.hum;
  const wind = current.wind ?? current.windMph ?? current.windSpeed;

  // If any essential piece is missing, return null to skip rendering
  if (
    temp === undefined ||
    high === undefined ||
    low === undefined ||
    humidity === undefined ||
    wind === undefined
  ) {
    return null;
  }

  return {
    temp: Number(temp),
    condition: String(condition),
    high: Number(high),
    low: Number(low),
    humidity: Number(humidity),
    wind: Number(wind),
  };
}

export default function AllCitiesPage() {
    const items = CITIES
      .map((c: City) => {
        const w = DUMMY_WEATHER_DATA[c.name.toLowerCase()]?.current_weather as CurrentWeather | undefined;
        return w ? { city: c.name, weather: w } : null;
      })
      .filter(Boolean) as { city: string; weather: CurrentWeather }[];
  
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold mb-6">All Cities Weather</h1>
        <CityGrid items={items} />
      </main>
    );
  }
