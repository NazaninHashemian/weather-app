// ExtraInfoCard.tsx
import React from 'react'
import { WeatherData } from '../../types/weatherTypes';
import './ExtraInfoCard.css';
import { getUnitSymbol } from '../../utils/weatherUtils';

interface ExtraInfoCardProps {
  weatherData: WeatherData;
  unitSymbols: 'Celsius' | 'Fahrenheit' | 'Kelvin';
  onGetTemperature: (tempCelsius: number, unit:'Celsius' | 'Fahrenheit' | 'Kelvin') => string;
}

function ExtraInfoCard({weatherData, unitSymbols, onGetTemperature} : ExtraInfoCardProps) {
  return (
    <>
        <div className="extra-info-card">           
              <p>Feels Like: {onGetTemperature(weatherData.current.feelslike_c, unitSymbols)}{getUnitSymbol(unitSymbols)}</p>
              <p>Max Temp: {onGetTemperature(weatherData.forecast.forecastday[0].day.maxtemp_c, unitSymbols)}{getUnitSymbol(unitSymbols)}</p>
              <p>Min Temp: {onGetTemperature(weatherData.forecast.forecastday[0].day.mintemp_c, unitSymbols)}{getUnitSymbol(unitSymbols)}</p>
              <p>Chance of Rain: {weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
              <p>Sunrise: {weatherData.forecast.forecastday[0].astro.sunrise}</p>
              <p>Sunset: {weatherData.forecast.forecastday[0].astro.sunset}</p>
        </div>
    </>
  )
}

export default ExtraInfoCard