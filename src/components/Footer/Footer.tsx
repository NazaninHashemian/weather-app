import React from 'react'
import { WeatherData } from '../../types/weatherTypes'
import './Footer.css'

interface FooterProps {
    weatherData: WeatherData
}
function Footer({weatherData}: FooterProps) {
  return (
    <div className="footer-location">
    <p>
      Showing weather for:{' '}
      <strong>
        {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}
      </strong>
    </p>
  </div>
  )
}

export default Footer;