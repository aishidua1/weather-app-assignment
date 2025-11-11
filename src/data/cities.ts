export type City = {
  name: string;
  latitude: number;
  longitude: number;
}

export const CITIES: City[] = [
  {
    name: "Durham",
    latitude: 35.9940,
    longitude: -78.8986,
  },
  {
    name: "New York",
    latitude: 40.7128,
    longitude: -74.0060,
  },
  {
    name: "Tokyo",
    latitude: 35.6762,
    longitude: 139.6503,
  },

  // new data
  {
    name: "San Francisco",
    latitude: 37.7749,
    longitude: 122.4194
  }, 
  {
    name: "Los Angeles",
    latitude: 34.0549,
    longitude: 118.2426
  },
  {
    name: "Portland",
    latitude: 45.5152,
    longitude: 122.6784
  },
  {
    name: "Seattle",
    latitude: 47.6061,
    longitude: 122.3328
  }
];

export function getCityByName(name: string): City | undefined {
  return CITIES.find(
    (city) => city.name.toLowerCase() === name.toLowerCase()
  );
}

export function getRandomCity(): City {
  const randomIndex = Math.floor(Math.random() * CITIES.length);
  return CITIES[randomIndex];
}
