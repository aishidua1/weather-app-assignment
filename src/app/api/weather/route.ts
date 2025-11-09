import { NextResponse } from "next/server";
export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const hourly = searchParams.get("hourly") ?? "temperature_2m";
  const daily = searchParams.get("daily") ?? "";
  const current = searchParams.get("current") ?? "temperature_2m,wind_speed_10m";
  const timezone = searchParams.get("timezone") ?? "auto";

  if (!lat || !lon) {
    return NextResponse.json({ error: "lat and lon are required" }, { status: 400 });
  }

  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    timezone,
    ...(hourly && { hourly }),
    ...(daily && { daily }),
    ...(current && { current }),
  });

  const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m`;
  const res = await fetch(url, { next: { revalidate: 600 } });
  if (!res.ok) return NextResponse.json({ error: "Open-Meteo failed" }, { status: 502 });

  const data = await res.json();
  return NextResponse.json(data, { headers: { "Cache-Control": "public, max-age=60" } });
}
