"use client";

import { useEffect, useState } from "react";
import { LocationSearch } from "@/components/LocationSearch";
import { LoadingState } from "@/components/LoadingState";
import { ErrorMessage } from "@/components/ErrorMessage";
import { WeatherDisplay } from "@/components/WeatherDisplay";
import { PageHeader } from "@/components/PageHeader";
import { getWeatherData } from "@/lib/getWeather";
import { WeatherData } from "@/types/weather";

// Default city to display on load
const DEFAULT_CITY = "Durham";

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Load default city weather on mount
    loadCityWeather(DEFAULT_CITY);
  }, []);

  const loadCityWeather = (cityName: string) => {
    setLoading(true);
    setError("");

    const data = getWeatherData(cityName);

    if (data) {
      setWeather(data);
    } else {
      setError(`Failed to load weather data for ${cityName}`);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12">
      <main className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <PageHeader
          title="Weather App"
          subtitle="Simple weather forecast for your city"
        />

        {/* Search at the top */}
        <div className="flex flex-col items-center">
          <LocationSearch onCitySelect={loadCityWeather} />
        </div>

        {/* Weather display */}
        {loading && <LoadingState />}
        {error && <ErrorMessage message={error} />}
        {weather && !loading && <WeatherDisplay weather={weather} />}
      </main>
    </div>
  );
  
}

// import WeatherCard from "@/app/components/WeatherCard";
// import { CITIES } from "@/data/cities";
// import { DUMMY_WEATHER_DATA } from "@/data/weather-data";
// import type { CurrentWeather } from "@/types/weather";

// // ...inside your component's JSX, under header/search:
// <section className="mt-10">
//   <h2 className="mb-4 text-xl font-semibold">Featured Cities</h2>
//   <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//     {CITIES.slice(0, 6).map((c) => {
//       const w = DUMMY_WEATHER_DATA[c.name] as CurrentWeather | undefined; // keys must match c.name
//       if (!w) return null;
//       return <WeatherCard key={c.name} city={c.name} weather={w} />;
//     })}
//   </div>
// </section>


