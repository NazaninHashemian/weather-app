// utils/weatherUtils.tsx
import { Condition } from "../types/weatherTypes";
import React, { ReactNode} from "react";

const getWeatherIcon = (
  condition: Condition | undefined,
  size: 'small' | 'large' = 'large'  // default is 'large'
) : ReactNode => {
    const iconUrl = condition?.icon;
    if (!iconUrl) return null;
    return (
      <div className={`icon-wrapper ${size}`}>
        <img 
          src={`https:${iconUrl}`} 
          alt={`Weather icon representing ${condition.text}`}
          // width="100" 
          // height="100" 
        />
      </div>
    );
  };

const getTemperature = (tempCelsius: number,
    unit: 'Celsius' | 'Fahrenheit' | 'Kelvin'
): string => {
    if (unit === 'Celsius') return tempCelsius.toFixed(1);
    if (unit === 'Fahrenheit') return ((tempCelsius * 9) / 5 + 32).toFixed(1);
    return (tempCelsius + 273.15).toFixed(1); // Kelvin
};

const getUnitSymbol = (unit: 'Celsius' | 'Fahrenheit' | 'Kelvin'): string => {
  if (unit === 'Celsius') return '°C';
  if (unit === 'Fahrenheit') return '°F';
  return 'K';
};

const getBackgroundImageByCondition = (
  conditionText: string,
  isDay: boolean
): string => {
  const condition = conditionText.toLowerCase();
  const isNight = !isDay;
  const base = import.meta.env.BASE_URL;

  if (isNight) {
    if (condition.includes('rain')) {
      return `${base}Images/Subtle-night.jpeg`;
    } else if (condition.includes('storm') || condition.includes('thunder')) {
      return `${base}Images/Stormy-night.jpeg`;
    } else if (condition.includes('cloud') || 
      condition.includes('overcast') || condition.includes('mist') || condition.includes('fog')){
      return `${base}Images/Couldy-night.jpeg`;
    } else if (condition.includes('clear') || 
    condition.includes('clear') ){
    return `${base}Images/Clear-night.jpeg`;
    } else if (condition.includes('snow') ){
    return `${base}Images/Snow-night.jpeg`;
    } 
    else {
      return `${base}Images/Couldy-night.jpeg`;
    }
  } else {
    if (condition.includes('sunny') || condition.includes('clear')) {
      return `${base}Images/Sunny-sky.jpg`;
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
      return `${base}Images/Rainy-sky.jpg`;
    } else if (condition.includes('storm') || condition.includes('thunder')) {
      return `${base}Images/Stormy-sky.jpg`;
    } else if (condition.includes('cloud') || condition.includes('overcast') || 
      condition.includes('mist') || condition.includes('fog')) {
      return `${base}Images/Cloudy-sky.jpg`;
    } else {
      return `${base}Images/Cloudy-sky.jpg`;
    }
  }
};



export { getWeatherIcon, getTemperature, getUnitSymbol, getBackgroundImageByCondition };
