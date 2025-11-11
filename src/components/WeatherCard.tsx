import type { CurrentWeather } from "@/types/weather";

// minimal mapper from Open-Meteo weather codes → human text
function codeToText(code?: number) {
  switch (code) {
    case 0: return "Clear";
    case 1:
    case 2:
    case 3: return "Partly/Mostly Cloudy";
    case 45:
    case 48: return "Fog";
    case 51:
    case 53:
    case 55: return "Drizzle";
    case 61:
    case 63:
    case 65: return "Rain";
    case 71:
    case 73:
    case 75: return "Snow";
    case 95:
    case 96:
    case 99: return "Thunderstorm";
    default: return "—";
  }
}

type WeatherCardProps = {
  city: string;
  weather: CurrentWeather; // <- temperature, windspeed, weathercode
};

export default function WeatherCard({ city, weather }: WeatherCardProps) {
  const desc = codeToText(weather.weatherCode);

  return (
    <article className="group rounded-2xl border border-zinc-200/70 bg-gradient-to-br p-5 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{city}</h3>
        <span className="text-sm leading-none">{desc}</span>
      </div>

      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-4xl font-semibold">
          {Math.round(weather.temperature)}°
        </span>
        {/* Feels like / humidity removed since not in current_weather */}
      </div>

      <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
        Wind: {Math.round(weather.windspeed)} km/h
      </div>
    </article>
  );
}
