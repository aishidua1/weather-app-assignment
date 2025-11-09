import { NextResponse } from "next/server";
export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  if (!q) return NextResponse.json({ error: "q is required" }, { status: 400 });

  const url =
    `https://geocoding-api.open-meteo.com/v1/search?` +
    `name=${encodeURIComponent(q)}&count=5&language=en&format=json`;

  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) return NextResponse.json({ error: "Geocoding failed" }, { status: 502 });

  const data = await res.json();
  return NextResponse.json(data);
}