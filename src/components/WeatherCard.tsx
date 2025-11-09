"use client";
// import { CurrentWeather } from "@/types/weather";

// /**
//  * Basic weather card - no styling, just data display
//  * Perfect for teaching how to start with data and gradually add styling
//  */

// interface WeatherCardProps {
//   city: string;
//   weather: CurrentWeather;
// }

// export function WeatherCard({ city, weather }: WeatherCardProps) {
//   return (
//     <div>
//       <h2>{city}</h2>
//       <p>{weather.temperature}°F</p>
//       <p>{weather.condition.description}</p>
//       <p>Feels like: {weather.feelsLike}°F</p>
//       <p>Humidity: {weather.humidity}%</p>
//       <p>Wind: {weather.windSpeed} mph</p>
//     </div>
//   );
// }



import type { CurrentWeather } from "../types/weather";

interface WeatherCardProps {
  city: string;
  weather: CurrentWeather;
}

function iconFor(condition: string) {
  const c = condition?.toLowerCase() ?? "";
  if (c.includes("sun") || c.includes("clear")) return "☀️";
  if (c.includes("rain") || c.includes("drizzle")) return "🌧️";
  if (c.includes("storm") || c.includes("thunder")) return "⛈️";
  if (c.includes("snow")) return "❄️";
  if (c.includes("fog") || c.includes("mist") || c.includes("haze")) return "🌫️";
  if (c.includes("cloud")) return "☁️";
  return "⛅";
}

function bgFor(condition: string) {
  const c = condition?.toLowerCase() ?? "";
  if (c.includes("sun") || c.includes("clear")) return "from-amber-100 to-orange-100";
  if (c.includes("rain") || c.includes("drizzle")) return "from-blue-100 to-cyan-100";
  if (c.includes("storm") || c.includes("thunder")) return "from-indigo-100 to-slate-100";
  if (c.includes("snow")) return "from-sky-100 to-slate-100";
  if (c.includes("cloud")) return "from-slate-100 to-slate-50";
  return "from-zinc-50 to-white";
}

export default function WeatherCard({ city, weather }: WeatherCardProps) {
  // Your type already uses these field names in your existing card
  const desc = weather.condition?.description ?? "";

  return (
    <article
      className={`group rounded-2xl border border-zinc-200/70 bg-gradient-to-br ${bgFor(desc)} p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md text-black`}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{city}</h3>
        <span className="text-3xl leading-none">{iconFor(desc)}</span>
      </div>

      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-4xl font-semibold">
          {Math.round(weather.temperature)}°
        </span>
        <span className="text-sm text-zinc-600">
          Feels {Math.round(weather.feelsLike)}°
        </span>
      </div>

      <p className="mt-1 text-sm capitalize">{desc}</p>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-xl border border-zinc-200/70 bg-white px-3 py-2">
          <div className="text-[10px] uppercase tracking-wide text-zinc-500">Humidity</div>
          <div className="text-sm font-medium">{Math.round(weather.humidity)}%</div>
        </div>
        <div className="rounded-xl border border-zinc-200/70 bg-white px-3 py-2">
          <div className="text-[10px] uppercase tracking-wide text-zinc-500">Wind</div>
          <div className="text-sm font-medium">{Math.round(weather.windSpeed)} mph</div>
        </div>
      </div>
    </article>
  );
}
