import { notFound } from "next/navigation";
// adjust the path if you use path aliases; this relative path works with your tree
import { CITIES } from "@/data/cities";

type Params = { city: string };

export default async function WeatherDetail({
  params,
}: { params: Params }) {
  // 1) read the URL segment that matches [city]
  const cityParam = (params.city ?? "").toLowerCase();
  if (!cityParam) return notFound();

  // 2) find this city in your CITIES list to get its coordinates
  const city = CITIES.find((c) => c.name.toLowerCase() === cityParam);
  if (!city) return notFound();

  // 3) fetch Open-Meteo (you can later swap this to your /api/weather proxy)
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation,weather_code&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) return notFound();
  const data = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Detailed forecast for {city.name}
      </h1>

      <section className="space-y-2">
        <div>Now: {data?.current_weather?.temperature}°C</div>
        <div>Wind: {data?.current_weather?.windspeed} km/h</div>
      </section>

      <section className="mt-6">
        <h2 className="font-medium mb-2">Next hours (temp)</h2>
        <ul className="text-sm space-y-1">
          {data?.hourly?.time?.slice(0, 12).map((t: string, i: number) => (
            <li key={t}>
              {t}: {data.hourly.temperature_2m[i]} °C
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
