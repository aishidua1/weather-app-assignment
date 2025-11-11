"use client";

import { useEffect, useMemo, useState } from "react";
import { LocationSearch } from "@/components/LocationSearch";
import { LoadingState } from "@/components/LoadingState";
import { ErrorMessage } from "@/components/ErrorMessage";
import WeatherDisplay from "@/components/WeatherDisplay";
import { PageHeader } from "@/components/PageHeader";
import { getWeather } from "@/lib/getWeather";
import type { WeatherData } from "@/types/weather";
import { CITIES } from "@/data/cities";

// Default city to display on load


export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const toggleTempUnit = () => setIsFahrenheit((prev) => !prev);
  const DEFAULT_CITY = "Durham";
  const onCitySelect = async (cityName: string) => {
  await loadCityWeather(cityName);
};
  const [selectedCity, setSelectedCity] = useState(() =>
  CITIES.find(c => c.name.toLowerCase() === DEFAULT_CITY.toLowerCase())
  
);

  useEffect(() => {
    // Load default city weather on mount
    loadCityWeather(DEFAULT_CITY);
  }, []);

  const loadCityWeather = async (cityName: string) => {
    setLoading(true);
    setError("");

    const city = CITIES.find(
      (c) => c.name.toLowerCase() === cityName.toLowerCase()
    );

    if (!city) {
      setWeather(null);
      setError(`Unknown city: ${cityName}`);
      setLoading(false);
      return;
    }

     setSelectedCity(city);

    try {
      const data = await getWeather(city.latitude, city.longitude); // expects lat, lon
      setWeather(data); // data matches WeatherData shape
    } catch (e) {
      setWeather(null);
      setError(`Failed to load weather data for ${cityName}`);
    } finally {
      setLoading(false);
    }
  };


return (
  <div className="mx-auto max-w-3xl px-4 py-14">
    <header className="mb-10 text-center">
      <h1 className="text-4xl font-semibold tracking-tight">Weather App</h1>
      <p className="mt-2 text-zinc-400">Simple weather forecast for your city</p>
    </header>

    {/* City select */}
    <div className="mb-8 flex justify-center">
      <div className="relative w-full max-w-sm">
        <select
          className="w-full appearance-none rounded-xl border border-zinc-700/60 bg-zinc-900/60 px-4 py-3 pr-10 text-sm text-zinc-100 shadow-inner focus:border-zinc-500 focus:outline-none"
          onChange={(e) => loadCityWeather(e.target.value)}
          defaultValue={DEFAULT_CITY}
        >
          {CITIES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500">▾</span>
      </div>
    </div>

    {/* Content card */}
    <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.6)] backdrop-blur">
      {loading && <LoadingState />}
      {error && <ErrorMessage message={error} />}
      {weather && !loading && <WeatherDisplay weather={weather} />}
    </div>
  </div>
);
}