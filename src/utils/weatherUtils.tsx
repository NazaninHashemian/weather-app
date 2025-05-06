// utils/weatherUtils.tsx
import { Condition } from "../types/weatherTypes";
import React, { ReactNode} from "react";

const getWeatherIcon = (condition: Condition | undefined) : ReactNode => {
    const iconUrl = condition?.icon;
    if (!iconUrl) return null;
    return (
      <div className='icon-wrapper'>
        <img 
          src={`https:${iconUrl}`} 
          alt={`Weather icon representing ${condition.text}`}
          width="100" 
          height="100" 
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

export { getWeatherIcon, getTemperature };
