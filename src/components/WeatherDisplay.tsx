import WeatherCard from "./WeatherCard";
import { Button } from "./Button";
import type { CurrentWeather } from "../types/weather";


type CityCurrent = {
  city: string;
  current: CurrentWeather;
};

interface WeatherDisplayProps {
  weather: CityCurrent;   
}

export function WeatherDisplay({ weather }: WeatherDisplayProps) {
  return (
    <div className="flex flex-col items-center space-y-6">
      <WeatherCard city={weather.city} weather={weather.current} />
      <Button href={`/weather/${weather.city.toLowerCase()}`} variant="default">
        View Detailed Forecast
      </Button>
    </div>
  );
}


// /**
//  * Displays weather information with a link to detailed forecast
//  */

// interface WeatherDisplayProps {
//   weather: WeatherData;
// }

// export function WeatherDisplay({ weather }: WeatherDisplayProps) {
//   return (
//     <div className="flex flex-col items-center space-y-6">
//       <WeatherCard city={weather.city} weather={weather.current} />

//       {/* Link to detailed weather */}
//       <Button href={`/weather/${weather.city.toLowerCase()}`} variant="default">
//         View Detailed Forecast
//       </Button>
//     </div>
//   );
// }
