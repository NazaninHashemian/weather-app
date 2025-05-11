import React, { ReactNode } from 'react';
import { Condition, WeatherData } from '../../types/weatherTypes';
import './HourlyForecast.css';
import { getUnitSymbol } from '../../utils/weatherUtils';

interface HourlyForecastProps {
  weatherData: WeatherData;
  unitSymbols: 'Celsius' | 'Fahrenheit' | 'Kelvin';
  onGetWeatherIcon: (value: Condition | undefined) => ReactNode;
  onGetTemperature: (tempCelsius: number, unit: 'Celsius' | 'Fahrenheit' | 'Kelvin') => string;
}

function HourlyForecast({ weatherData, unitSymbols, onGetWeatherIcon, onGetTemperature }: HourlyForecastProps) {
  const now = new Date();

  const allThreeDays = [
    ...weatherData.forecast.forecastday[0].hour,
    ...weatherData.forecast.forecastday[1].hour,
    ...weatherData.forecast.forecastday[2].hour,
  ];

  // Filter next 24 hours starting from current time
  const filteredHours = allThreeDays.filter((hour) => {
    const hourDate = new Date(hour.time);
    const timeDiff = (hourDate.getTime() - now.getTime()) / (1000 * 60 * 60); // in hours
    return timeDiff >= 0 && timeDiff < 24;
  });

  return (
    <>
      <div className="gradient-line"></div>
      <div className="hourly-forecast-container">
        <h2>Hourly Forecast</h2>
        <div className="hourly-forecast-wrapper">
          <div className="hourly-forecast">
            {filteredHours.map((hour, index) => (
              <div key={index} className="hourly-card">
                <p>
                  {index === 0
                    ? 'Now'
                    // : new Date(hour.time).toLocaleTimeString([], {
                    //     hour: 'numeric',
                    //     hour12: true,
                    //   })}
                    : new Date(hour.time).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: true,
                    })}
                    
                </p>
                {onGetWeatherIcon(hour.condition)}
                <p aria-label={`Weather condition: ${hour.condition.text}`}>{hour.condition.text}</p>
                <p>
                  {onGetTemperature(hour.temp_c, unitSymbols)}
                  {getUnitSymbol(unitSymbols)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HourlyForecast;
