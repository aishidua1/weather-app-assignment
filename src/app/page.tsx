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

// // Default city to display on load


// export default function Home() {
//   const [weather, setWeather] = useState<WeatherData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [isFahrenheit, setIsFahrenheit] = useState(false);

//   const toggleTempUnit = () => setIsFahrenheit((prev) => !prev);
//   const DEFAULT_CITY = "Durham";
//   const onCitySelect = async (cityName: string) => {
//   await loadCityWeather(cityName);
// };
//   const [selectedCity, setSelectedCity] = useState(() =>
//   CITIES.find(c => c.name.toLowerCase() === DEFAULT_CITY.toLowerCase())
  
// );

//   useEffect(() => {
//     // Load default city weather on mount
//     loadCityWeather(DEFAULT_CITY);
//   }, []);

//   const loadCityWeather = async (cityName: string) => {
//     setLoading(true);
//     setError("");

//     const city = CITIES.find(
//       (c) => c.name.toLowerCase() === cityName.toLowerCase()
//     );

//     if (!city) {
//       setWeather(null);
//       setError(`Unknown city: ${cityName}`);
//       setLoading(false);
//       return;
//     }

//      setSelectedCity(city);

//     try {
//       const data = await getWeather(city.latitude, city.longitude); // expects lat, lon
//       setWeather(data); // data matches WeatherData shape
//     } catch (e) {
//       setWeather(null);
//       setError(`Failed to load weather data for ${cityName}`);
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//   <div className="p-10">
//     <button
//       onClick={() => setIsFahrenheit((v) => !v)}
//       className="rounded bg-blue-600 px-4 py-2"
//     >
//       Toggle (works?)
//     </button>
//     <div className="mt-4">isFahrenheit: {String(isFahrenheit)}</div>
//   </div>
// );


// }


// Type helper for a city entry from your CITIES array
type City = (typeof CITIES)[number];

const DEFAULT_CITY = "Durham";

export default function Home() {
  // ---- state ----
  const defaultCity: City | null = useMemo(
    () =>
      CITIES.find(
        (c) => c.name.toLowerCase() === DEFAULT_CITY.toLowerCase()
      ) ?? null,
    []
  );

  const [selectedCity, setSelectedCity] = useState<City | null>(defaultCity);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isFahrenheit, setIsFahrenheit] = useState<boolean>(false);

  // ---- effects ----
  useEffect(() => {
    // load on first mount
    loadCityWeather(selectedCity?.name ?? DEFAULT_CITY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- handlers / helpers ----
  const toggleTempUnit = () => setIsFahrenheit((prev) => !prev);

  const onCitySelect = async (cityName: string) => {
    await loadCityWeather(cityName);
  };

  async function loadCityWeather(cityName: string) {
    setLoading(true);
    setError("");

    const city =
      CITIES.find(
        (c) => c.name.toLowerCase() === cityName.toLowerCase()
      ) ?? null;

    if (!city) {
      setWeather(null);
      setSelectedCity(null);
      setError(`Unknown city: ${cityName}`);
      setLoading(false);
      return;
    }

    setSelectedCity(city);

    try {
      // getWeather must accept (lat, lon) and return WeatherData
      const data = await getWeather(city.latitude, city.longitude);
      setWeather(data);
    } catch (e) {
      console.error(e);
      setWeather(null);
      setError(`Failed to load weather data for ${cityName}`);
    } finally {
      setLoading(false);
    }
  }

  return (
  <main className="min-h-screen text-white">
    <PageHeader />

    {/* Search */}
    <section className="mx-auto max-w-3xl p-6">
      <LocationSearch
        cities={CITIES.map((c) => c.name)}
        defaultValue={selectedCity?.name ?? DEFAULT_CITY}
        onSelect={onCitySelect}
      />
    </section>

    {/* Status / Errors */}
    <section className="mx-auto max-w-3xl px-6">
      {error && <ErrorMessage message={error} />}
      {loading && <LoadingState />}
    </section>

    {/* Weather */}
    {!loading && !error && weather && selectedCity && (
      <section className="mx-auto max-w-3xl p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {selectedCity.name}
            {selectedCity.state ? `, ${selectedCity.state}` : ""}
            {selectedCity.country ? `, ${selectedCity.country}` : ""}
          </h2>

          <button
            onClick={toggleTempUnit}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium hover:bg-blue-500"
          >
            Toggle °{isFahrenheit ? "C" : "F"}
          </button>
        </div>

        {/* If WeatherDisplay prop names differ, adjust below to match your file */}
        <WeatherDisplay
          data={weather}
          isFahrenheit={isFahrenheit}
          onUnitToggle={toggleTempUnit}
        />
      </section>
    )}

    {/* Empty state */}
    {!loading && !error && !weather && (
      <p className="mx-auto max-w-3xl p-6 opacity-70">
        Pick a city to load weather.
      </p>
    )}
  </main>
);
