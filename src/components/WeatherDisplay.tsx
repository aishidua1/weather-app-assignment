import type { WeatherData } from "@/types/weather";
import { useState } from "react";

type Props = {
  weather: WeatherData;
  title?: string;
};

// Convert °C ↔ °F
function toF(tempC: number) {
  return (tempC * 9) / 5 + 32;
}

const codeToText = (code?: number) => {
  if (code === 0) return "Clear";
  if ([1, 2, 3].includes(code ?? -1)) return "Cloudy";
  if ([45, 48].includes(code ?? -1)) return "Fog";
  if ([51, 53, 55].includes(code ?? -1)) return "Drizzle";
  if ([61, 63, 65].includes(code ?? -1)) return "Rain";
  if ([71, 73, 75].includes(code ?? -1)) return "Snow";
  if ([95, 96, 99].includes(code ?? -1)) return "Thunderstorm";
  return "—";
};

export default function WeatherDisplay({ weather, title }: Props) {
  const [isFahrenheit, setIsFahrenheit] = useState(false);
  const toggleUnit = () => setIsFahrenheit((prev) => !prev);

  const now = weather.current_weather;
  const desc = codeToText(now.weathercode);
  const humidity = weather.hourly?.relative_humidity_2m?.[0] ?? undefined;

  return (
    <div className="space-y-6">
      {/* Top row: big temp + summary */}
      <div className="flex items-start justify-between gap-6">
        <div>
          {title ? (
            <h2 className="text-2xl font-medium">{title}</h2>
          ) : null}
          <div className="mt-1 text-zinc-400">{desc}</div>
          <div className="mt-4 text-6xl font-semibold leading-none">
            {Math.round(
              isFahrenheit ? toF(now.temperature) : now.temperature
            )}
            °
            <span className="ml-1 align-top text-2xl text-zinc-400">
              {isFahrenheit ? "F" : "C"}
            </span>
          </div>
        </div>

        {/* °C ↔ °F toggle */}
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span className={!isFahrenheit ? "text-white" : "opacity-50"}>
            °C
          </span>
          <button
            onClick={toggleUnit}
            className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
              isFahrenheit ? "bg-blue-500" : "bg-zinc-700"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                isFahrenheit ? "translate-x-4" : "translate-x-1"
              }`}
            />
          </button>
          <span className={isFahrenheit ? "text-white" : "opacity-50"}>
            °F
          </span>
        </div>
      </div>

      {/* Badges */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 px-4 py-3 text-center">
          <div className="text-xs uppercase tracking-wide text-zinc-400">
            Wind
          </div>
          <div className="text-lg font-medium">
            {Math.round(now.windspeed)} km/h
          </div>
        </div>
        <div className="rounded-xl border border-zinc-800/70 bg-zinc-950/40 px-4 py-3 text-center">
          <div className="text-xs uppercase tracking-wide text-zinc-400">
            Humidity
          </div>
          <div className="text-lg font-medium">
            {humidity ?? "—"}
            {humidity !== undefined ? "%" : ""}
          </div>
        </div>
      </div>

      {/* Hourly List */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-zinc-300">
          Next hours (temperature)
        </h3>
        <ul className="max-h-64 space-y-1 overflow-auto pr-1 text-sm text-zinc-300/90">
          {weather.hourly.time.slice(0, 24).map((t, i) => (
            <li
              key={t}
              className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-zinc-800/40"
            >
              <span className="tabular-nums">{t.replace("T", " ")}</span>
              <span className="ml-6 font-medium">
                {isFahrenheit
                  ? toF(weather.hourly.temperature_2m[i]).toFixed(1)
                  : weather.hourly.temperature_2m[i].toFixed(1)}{" "}
                °{isFahrenheit ? "F" : "C"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
