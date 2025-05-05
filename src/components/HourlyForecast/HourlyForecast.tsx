import React, { ReactNode } from 'react'
import { Condition, WeatherData } from '../../types/weatherTypes';

interface HourlyForecastProps {
    weatherData: WeatherData;
    unitSymbols: string ;
    onGetWeatherIcon: (value: Condition | undefined) => ReactNode;
    onGetTemperature: (value: number) => string;
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
                      {/* <p>{hour.time.split(' ')[1]}</p> */}
                      <p>{new Date(hour.time).toLocaleTimeString([], { hour: 'numeric', hour12: true })}</p>
                      {onGetWeatherIcon(hour.condition)}
                      <p>{hour.condition.text}</p>
                      <p>
                        {onGetTemperature(hour.temp_c)}°{unitSymbols}
                      </p>
                    </div>
                  ))}
                </div>
            </div>
        </>
  )
}

export default HourlyForecast