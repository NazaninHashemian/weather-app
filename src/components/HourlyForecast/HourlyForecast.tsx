import React, { ReactNode } from 'react';
import { Condition, WeatherData } from '../../types/weatherTypes';
import './HourlyForecast.css';
import getUnitSymbol from '../../utils/getUnitSymbol';

interface HourlyForecastProps {
  weatherData: WeatherData;
  unitSymbols: 'Celsius' | 'Fahrenheit' | 'Kelvin';
  onGetWeatherIcon: (
    value: Condition | undefined,
     size?: 'small' | 'large'
  ) => ReactNode;
  onGetTemperature: (tempCelsius: number, unit: 'Celsius' | 'Fahrenheit' | 'Kelvin') => string;
}

function HourlyForecast({
  weatherData,
  unitSymbols,
  onGetWeatherIcon,
  onGetTemperature,
}: HourlyForecastProps) {
  // Get current time and round down to the nearest full hour
  const localNow = new Date(weatherData.location.localtime);
  // console.log(localNow);

  localNow.setMinutes(0, 0, 0); // Clear minutes, seconds, milliseconds

  // Combine 3 days of hourly data
  const allThreeDays = [
    ...weatherData.forecast.forecastday[0].hour,
    ...weatherData.forecast.forecastday[1].hour,
    ...weatherData.forecast.forecastday[2].hour,
  ];

  // Get only the next 24 hours starting from the rounded current hour
  const filteredHours = allThreeDays.filter((hour) => {
    const hourDate = new Date(hour.time);
    return hourDate >= localNow && hourDate < new Date(localNow.getTime() + 24 * 60 * 60 * 1000);
  });

  return (
    <>
      <div className="gradient-line"></div>
      <div className="hourly-forecast-container">
        <h2>Hourly Forecast</h2>
        <div className="hourly-forecast-wrapper">
          <div className="hourly-forecast">
            {filteredHours.map((hour, index) => {
              const date = new Date(hour.time);
              let hours = date.getHours();
              const ampm = hours >= 12 ? 'PM' : 'AM';
              hours = hours % 12 || 12;
              const label = index === 0 ? 'Now' : `${hours} ${ampm}`;

              return (
                <div key={index} className="hourly-card">
                  <p>{label}</p>
                  {/* {onGetWeatherIcon(hour.condition)} */}
                  {onGetWeatherIcon(hour.condition, 'small')}

                  <p aria-label={`Weather condition: ${hour.condition.text}`}>{hour.condition.text}</p>
                  <p>
                    {onGetTemperature(hour.temp_c, unitSymbols)}
                    {getUnitSymbol(unitSymbols)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default HourlyForecast;
