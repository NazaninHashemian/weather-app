import React, { ReactNode } from 'react'
import { Condition, WeatherData } from '../../types/weatherTypes';

interface HourlyForecastProps {
  weatherData: WeatherData;
  unitSymbols: 'Celsius' | 'Fahrenheit' | 'Kelvin' ;
  onGetWeatherIcon: (value: Condition | undefined) => ReactNode;
  onGetTemperature: (tempCelsius: number, unit:'Celsius' | 'Fahrenheit' | 'Kelvin') => string;
}

function HourlyForecast({weatherData, unitSymbols , onGetWeatherIcon, onGetTemperature}: HourlyForecastProps) {
  return (
    <>
        <div className="gradient-line"></div>
            <div  className="hourly-forecast-container">
                <h2>Hourly Forecast</h2>
                <div className="hourly-forecast">
                  {weatherData.forecast.forecastday[0].hour.map((hour, index) => (
                    <div key={index} className="hour">
                       {/* Displaying time */}
                      {/* <p>{hour.time.split(' ')[1]}</p> */}
                      <p>{new Date(hour.time).toLocaleTimeString([], { hour: 'numeric', hour12: true })}</p>
                      {onGetWeatherIcon(hour.condition)}
                      <p aria-label={`Weather condition: ${hour.condition.text}`}>
                        {hour.condition.text}
                      </p>
                      <p>
                        {onGetTemperature(hour.temp_c, unitSymbols)}
                      </p>
                    </div>
                  ))}
                </div>
            </div>
        </>
  )
}

export default HourlyForecast