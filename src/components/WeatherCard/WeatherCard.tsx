//WeatherCard.tsx
import React, { ReactNode } from 'react'
import {WeatherData, Condition} from '../../types/weatherTypes';

interface WeatherCardProps {
    weatherData: WeatherData;
    unitSymbols: 'Celsius' | 'Fahrenheit' | 'Kelvin' ;
    onGetWeatherIcon: (value: Condition | undefined) => ReactNode;
    onGetTemperature: (tempCelsius: number, unit:'Celsius' | 'Fahrenheit' | 'Kelvin') => string;
}

function WeatherCard({weatherData, unitSymbols, onGetWeatherIcon, onGetTemperature}: WeatherCardProps) {
  return (
    <>
        <div className="weather-card">
        <h2>{weatherData.location.name}</h2>
        {onGetWeatherIcon(weatherData.current.condition)}
        <p>{weatherData.current.condition.text}</p>
        <p>Humidity: {weatherData.current.humidity} %</p>
        <p>
            Temperature: {onGetTemperature(weatherData.current.temp_c, unitSymbols)}°{unitSymbols}
        </p>
        <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
        </div>
</>
  )
}

export default WeatherCard