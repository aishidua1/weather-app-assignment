// // import WeatherCard from "./WeatherCard";
// // import { Button } from "./Button";
// // import type { CurrentWeather } from "../types/weather";


// // type CityCurrent = {
// //   city: string;
// //   current: CurrentWeather;
// // };

// // interface WeatherDisplayProps {
// //   weather: CityCurrent;   
// // }

// // export function WeatherDisplay({ weather }: WeatherDisplayProps) {
// //   return (
// //     <div className="flex flex-col items-center space-y-6">
// //       <WeatherCard city={weather.city} weather={weather.current} />
// //       <Button href={`/weather/${weather.city.toLowerCase()}`} variant="default">
// //         View Detailed Forecast
// //       </Button>
// //     </div>
// //   );
// // }


// // // /**
// // //  * Displays weather information with a link to detailed forecast
// // //  */

// // // interface WeatherDisplayProps {
// // //   weather: WeatherData;
// // // }

// // // export function WeatherDisplay({ weather }: WeatherDisplayProps) {
// // //   return (
// // //     <div className="flex flex-col items-center space-y-6">
// // //       <WeatherCard city={weather.city} weather={weather.current} />

// // //       {/* Link to detailed weather */}
// // //       <Button href={`/weather/${weather.city.toLowerCase()}`} variant="default">
// // //         View Detailed Forecast
// // //       </Button>
// // //     </div>
// // //   );
// // // }


// import WeatherCard from "./WeatherCard";
// import { Button } from "./Button";
// import type { CurrentWeather } from "../types/weather";

// type CityCurrent = { city: string; current: CurrentWeather };

// interface WeatherDisplayProps {
//   weather: CityCurrent;
// }

// export function WeatherDisplay({ weather }: WeatherDisplayProps) {
//   const slug = (weather?.city ?? "").toLowerCase(); 
//   return (
//     <div className="flex flex-col items-center space-y-6">
//       <WeatherCard city={weather.city} weather={weather.current} />
//       {slug && (
//         <Button href={`/weather/${encodeURIComponent(slug)}`} variant="default">
//           View Detailed Forecast
//         </Button>
//       )}
//     </div>
//   );
// }

// import Link from "next/link";

// // if your city control stores something like "Durham"
// <Link href={`/weather/${encodeURIComponent(city)}`}>
//   <button>View Detailed Forecast</button>
// </Link>


// src/components/WeatherDisplay.tsx
type City = { name: string; latitude: number; longitude: number };

type WeatherDisplayProps = {
  city: City;
  data: any; // narrow later if you like
};

export default function WeatherDisplay({ city, data }: WeatherDisplayProps) {
  return (
    <div className="p-4 bg-gray-800 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-3">{city.name}</h2>

      <div className="space-y-1">
        <div>Now: {data?.current_weather?.temperature}°C</div>
        <div>Wind: {data?.current_weather?.windspeed} km/h</div>
      </div>

      <h3 className="font-medium mt-4 mb-2">Next hours (temperature)</h3>
      <ul className="text-sm space-y-1">
        {data?.hourly?.time?.slice(0, 12).map((t: string, i: number) => (
          <li key={t}>
            {t}: {data.hourly.temperature_2m[i]} °C
          </li>
        ))}
      </ul>
    </div>
  );
}
