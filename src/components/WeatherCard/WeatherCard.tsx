import React, { ReactNode } from 'react'
import {WeatherData, Condition} from '../../types/weatherTypes';

interface WeatherCardProps {
    weatherData: WeatherData;
    unitSymbols: { unit: string };
    onGetWeatherIcon: (value: Condition | undefined) => ReactNode;
    onGetTemperature: (value: number) => string;
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
            Temperature: {onGetTemperature(weatherData.current.temp_c)}°{unitSymbols.unit}
        </p>
        <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
        </div>
</>
  )
}

export default WeatherCard