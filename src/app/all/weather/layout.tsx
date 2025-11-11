import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weather Dashboard",
  description: "Detailed city weather forecasts using Open-Meteo API",
};

export default function WeatherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 dark:bg-zinc-900 dark:text-white">
        <header className="px-6 py-4 border-b border-gray-200 dark:border-zinc-700">
          <h1 className="text-2xl font-semibold text-center">
            🌤️ Weather Dashboard
          </h1>
        </header>

        <main className="max-w-4xl mx-auto p-6">{children}</main>

        <footer className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400 pb-4">
          Data powered by <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" className="underline">Open-Meteo</a>
        </footer>
      </body>
    </html>
  );
}
