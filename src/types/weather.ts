// export type CurrentWeather = {
//   temperature: number;
//   windspeed: number;
//   weatherCode: number;
//   time: string;
// };

export type CurrentWeather = {
  temperature: number;   // °F if you requested fahrenheit in the API
  windspeed: number;     // km/h (Open-Meteo default)
  weatherCode: number;   // Open-Meteo current_weather.weathercode
};

export type HourlyWeather = {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m?: number[];
  precipitation?: number[];
  weather_code?: number[];
};

export type DailyWeather = {
  time: string[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum?: number[];
};

export type WeatherData = {
  current_weather: CurrentWeather;
  hourly: HourlyWeather;
  daily?: DailyWeather;
};
