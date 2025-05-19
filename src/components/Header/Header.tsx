import React from 'react'
import getWeatherIcon from '../../utils/getWeatherIcon'
import { WeatherData } from '../../types/weatherTypes'
import './Header.css'

interface HeaderProps {
    weatherData: WeatherData | null;
}
function Header({ weatherData }: HeaderProps) {
  return (
    <div className="header">
      <div className="header-content">
        <div className="weather-icon">
          {weatherData ? getWeatherIcon(weatherData.current.condition, 'large') : null}
        </div>
        <h1>Weather Forecast</h1>
    </div>
  </div>
  )
}

export default Header;