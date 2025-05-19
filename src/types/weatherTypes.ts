// src/types/weatherTypes.ts
export interface Condition {
    text: string;
    icon: string;
  }
  
  export interface WeatherData {
    location: {
      region: string;
      localtime: string | number | Date;
      name: string;
      lat: number;
      lon: number;
      country: string;
    };
    current: {
      is_day: number;
      temp_c: number;
      feelslike_c: number;
      humidity: number;
      wind_kph: number;
      condition: Condition;
    };
    forecast: {
      forecastday: Array<{
        day: {
          maxtemp_c: number;
          mintemp_c: number;
          daily_chance_of_rain: number;
        };
        astro: {
          sunrise: string;
          sunset: string;
        };
        hour: Array<{
          time: string;
          temp_c: number;
          condition: Condition;
        }>;
      }>;
    };
  }
  