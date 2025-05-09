// HourlyForecast.tsx
import React, { ReactNode } from 'react'
import { Condition, WeatherData } from '../../types/weatherTypes';
import './HourlyForecast.css';
import { getUnitSymbol } from '../../utils/weatherUtils';

interface HourlyForecastProps {
  weatherData: WeatherData;
  unitSymbols: 'Celsius' | 'Fahrenheit' | 'Kelvin' ;
  onGetWeatherIcon: (value: Condition | undefined) => ReactNode;
  onGetTemperature: (tempCelsius: number, unit:'Celsius' | 'Fahrenheit' | 'Kelvin') => string;
}

function HourlyForecast({weatherData, unitSymbols , onGetWeatherIcon, onGetTemperature}: HourlyForecastProps) {
  const currentHour = new Date().getHours(); // Get current hour
  const todayHours = weatherData.forecast.forecastday[0].hour;
  const upcomingHours = todayHours.slice(currentHour);
  return (
    <>
        <div className="gradient-line"></div>
            <div  className="hourly-forecast-container">
                <h2>Hourly Forecast</h2>
                <div className="hourly-forecast">
                  {upcomingHours.map((hour, index) => (
                    <div key={index} className="hour">
                       {/* Displaying time */}
                      {/* <p>{hour.time.split(' ')[1]}</p> */}
                      <p>{new Date(hour.time).toLocaleTimeString([], { hour: 'numeric', hour12: true })}</p>
                      {onGetWeatherIcon(hour.condition)}
                      <p aria-label={`Weather condition: ${hour.condition.text}`}>
                        {hour.condition.text}
                      </p>
                      <p>
                        {onGetTemperature(hour.temp_c, unitSymbols)}{getUnitSymbol(unitSymbols)}
                      </p>
                    </div>
                  ))}
                </div>
            </div>
        </>
  )
}

export default HourlyForecast