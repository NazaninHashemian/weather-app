import React from 'react'
import getWeatherIcon from '../../utils/getWeatherIcon'
import { WeatherData } from '../../types/weatherTypes'

interface HeaderProps {
    weatherData: WeatherData | null;
}
function Header({ weatherData }: HeaderProps) {
  return (
    <div className="header">
    <div className="header-content">
      {weatherData && (
        <div className="weather-icon">
          {getWeatherIcon(weatherData.current.condition, 'large')}
        </div>
      )}
      <h1>Weather Forecast</h1>
    </div>
  </div>
  )
}

export default Header;