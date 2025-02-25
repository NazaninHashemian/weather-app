import React, { useEffect, useState } from 'react';
const API_KEY = '4e5c6111439b8ec97661a32222b32c21';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '4e5c6111439b8ec97661a32222b32c21';

  useEffect(() => {});

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={() => setCity(city)}>Get Weather</button>
      {error & <p>{error}</p>}
    </div>
  );
};
export default WeatherApp;
