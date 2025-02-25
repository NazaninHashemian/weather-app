import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weather() {
  const [city, setCity] = useState('Coquitlam');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '4e5c6111439b8ec97661a32222b32c21';

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )
      .then((response) => {
        setWeatherData(response.data);
        setError('');
      })
      .catch((err) => {
        setError('City not found');
        setWeatherData(null);
      });
  }, [city]);

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={() => setCity(city)}>Get Weather</button>

      {error && <p>{error}</p>}

      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}</p>
          <p>Temperature: {weatherData.main.temp}</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
