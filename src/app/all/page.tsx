import type { City } from "@/data/cities";
import { CITIES } from "@/data/cities";
import { DUMMY_WEATHER_DATA } from "@/data/weather-data";

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
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold mb-6">All Cities Weather</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CITIES.map((city: City) => {
          const raw = DUMMY_WEATHER_DATA[city.name]; // keys must match city.name
          const data = normalizeWeather(raw);
          if (!data) return null;

          return (
            <div
              key={city.name}
              className="rounded-2xl border border-gray-300 p-5 shadow-sm bg-white hover:shadow-md transition"
            >
              <h2 className="text-xl font-medium mb-2">{city.name}</h2>
              <p className="text-5xl font-semibold">{data.temp}°</p>
              <p className="text-gray-600 mb-1">{data.condition}</p>
              <p className="text-sm text-gray-500">
                High {data.high}° • Low {data.low}°
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Humidity {data.humidity}% • Wind {data.wind} mph
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
}
