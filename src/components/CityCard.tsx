import WeatherCard from "@/components/WeatherCard";
import type { CurrentWeather } from "@/types/weather";

export type CityItem = {
  city: string;
  weather: CurrentWeather;
};

type Props = {
  items: CityItem[];
  className?: string;
};

export default function CityGrid({ items, className }: Props) {
  if (!items?.length) return null;

  return (
    <section className={className}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <WeatherCard key={it.city} city={it.city} weather={it.weather} />
        ))}
      </div>
    </section>
  );
}