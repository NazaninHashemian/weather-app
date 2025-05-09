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
  const tomorrowHours = weatherData.forecast.forecastday[1].hour;
  const upcomingHours = todayHours.slice(currentHour);
  const allHours = [...upcomingHours, ...tomorrowHours]; // Combining remaining today hours and tomorrow hours
  return (
    <>
        <div className="gradient-line"></div>

            <div className="hourly-forecast-container">
              <h2>Hourly Forecast</h2>
              <div className="hourly-forecast-wrapper">
                <div className="hourly-forecast">
                  {allHours.map((hour, index) => (
                    <div key={index} className="hourly-card">
                      <p>{index === 0 ? 'Now' : new Date(hour.time).toLocaleTimeString([], { hour: 'numeric', hour12: true })}</p>
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
            </div>

        </>
  )
}

export default HourlyForecast