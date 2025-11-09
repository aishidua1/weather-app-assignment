// import { notFound } from "next/navigation";
// import { CITIES } from "@/data/cities"; // or "../../data/cities" if you’re on relatives

// type Params = { city: string };

// export default async function WeatherCityPage({ params }: { params: Params }) {
//   const cityParam = params.city.toLowerCase();
//   const city = CITIES.find(c => c.name.toLowerCase() === cityParam);
//   if (!city) return notFound();

//   // tolerate either lat/lon or latitude/longitude in your data
//   const lat = (city as any).lat ?? (city as any).latitude;
//   const lon = (city as any).lon ?? (city as any).longitude;
//   if (lat == null || lon == null) return notFound();

//   const qs = new URLSearchParams({
//     lat: String(lat),
//     lon: String(lon),
//     timezone: "auto",
//     current: "temperature_2m,wind_speed_10m",
//     hourly: "temperature_2m,relative_humidity_2m,precipitation,weather_code",
//     daily: "temperature_2m_max,temperature_2m_min,precipitation_sum"
//   });

//   const res = await fetch(`/api/weather?${qs}`, { next: { revalidate: 600 } });
//   if (!res.ok) return notFound();
//   const data = await res.json();

//   return (
//     <main className="mx-auto max-w-3xl p-6">
//       <h1 className="text-2xl font-semibold mb-4">Weather — {city.name}</h1>
//       <p>
//         <strong>Current:</strong> {data?.current?.temperature_2m}
//         {data?.current_units?.temperature_2m}, wind {data?.current?.wind_speed_10m}
//         {data?.current_units?.wind_speed_10m}
//       </p>
//     </main>
//   );
// }


// 


import { notFound } from "next/navigation";
import { CITIES } from "../../../data/cities";

type Params = { city: string };

export default async function WeatherCityPage({ params }: { params: Params }) {
  const cityParam = (params.city ?? "").toLowerCase();
  if (!cityParam) return notFound();

  const city = CITIES.find(c => c.name.toLowerCase() === cityParam);
  if (!city) return notFound();

  const qs = new URLSearchParams({
    lat: String(city.latitude),
    lon: String(city.longitude),
    timezone: "auto",
    current: "temperature_2m,wind_speed_10m",
    hourly: "temperature_2m,relative_humidity_2m,precipitation,weather_code",
    daily: "temperature_2m_max,temperature_2m_min,precipitation_sum",
  });

  const res = await fetch(`/api/weather?${qs}`, { next: { revalidate: 600 } });
  if (!res.ok) return notFound();
  const data = await res.json();

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Weather — {city.name}</h1>
      <p>
        <strong>Current:</strong> {data?.current?.temperature_2m}
        {data?.current_units?.temperature_2m}, wind {data?.current?.wind_speed_10m}
        {data?.current_units?.wind_speed_10m}
      </p>
    </main>
  );
}
