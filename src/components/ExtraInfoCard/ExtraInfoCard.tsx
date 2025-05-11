// ExtraInfoCard.tsx
import React from 'react'
import { WeatherData } from '../../types/weatherTypes';
import './ExtraInfoCard.css';
import { getUnitSymbol } from '../../utils/weatherUtils';

interface ExtraInfoCardProps {
  weatherData: WeatherData;
  unitSymbols: 'Celsius' | 'Fahrenheit' | 'Kelvin';
  onGetTemperature: (tempCelsius: number, unit:'Celsius' | 'Fahrenheit' | 'Kelvin') => string;
  dayIndex: number; //  0 = today, 1 = tomorrow, 2 = day after tomorrow
}

function ExtraInfoCard({weatherData, unitSymbols, onGetTemperature, dayIndex} : ExtraInfoCardProps) {
  const forecast = weatherData.forecast.forecastday[dayIndex];
  return (
    <>
        <div className="extra-info-card">           
              {/* <p>Feels Like: {onGetTemperature(weatherData.current.feelslike_c, unitSymbols)}{getUnitSymbol(unitSymbols)}</p> */}
              <p>Max Temp: {onGetTemperature(forecast.day.maxtemp_c, unitSymbols)}{getUnitSymbol(unitSymbols)}</p>
              <p>Min Temp: {onGetTemperature(forecast.day.mintemp_c, unitSymbols)}{getUnitSymbol(unitSymbols)}</p>
              <p>Chance of Rain: {forecast.day.daily_chance_of_rain}%</p>
              <p>Sunrise: {forecast.astro.sunrise}</p>
              <p>Sunset: {forecast.astro.sunset}</p>
        </div>
    </>
  )
}

export default ExtraInfoCard;