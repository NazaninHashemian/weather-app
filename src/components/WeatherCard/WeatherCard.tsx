//WeatherCard.tsx
import React, { ReactNode } from 'react'
import {WeatherData, Condition} from '../../types/weatherTypes';
import './WeatherCard.css';
import { getUnitSymbol } from '../../utils/weatherUtils';

interface WeatherCardProps {
    weatherData: WeatherData;
    unitSymbols: 'Celsius' | 'Fahrenheit' | 'Kelvin' ;
    onGetWeatherIcon: (
      value: Condition | undefined,
       size?: 'small' | 'large'
    ) => ReactNode;
    onGetTemperature: (tempCelsius: number, unit:'Celsius' | 'Fahrenheit' | 'Kelvin') => string;
}

function WeatherCard({weatherData, unitSymbols, onGetWeatherIcon, onGetTemperature}: WeatherCardProps) {
  return (
    <>
        <div className="weather-card">
        <h2>{weatherData.location.name}</h2>
        {onGetWeatherIcon(weatherData.current.condition, 'large')}
        <h3>{weatherData.current.condition.text}</h3>
        <p>Feels Like: {onGetTemperature(weatherData.current.feelslike_c, unitSymbols)}{getUnitSymbol(unitSymbols)}</p>
        <p>Humidity: {weatherData.current.humidity} %</p>
        <p>
            Temperature: {onGetTemperature(weatherData.current.temp_c, unitSymbols)}{getUnitSymbol(unitSymbols)}
        </p>
        <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
        </div>
</>
  )
}

export default WeatherCard;