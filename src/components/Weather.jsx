import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weather() {
  const [city, setCity] = useState('Coquitlam'); // Triggers API call
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = '4e5c6111439b8ec97661a32222b32c21';

  useEffect(() => {
    if (!city.trim()) {
      setError('City can not be empty!');
      setWeatherData(null);
      return;
    }

    setLoading(true);
    console.log('Loading started'); // Debugging message
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )
      .then((response) => {
        setWeatherData(response.data);
        setError('');
      })
      .catch(() => {
        setError('City not found!');
        setWeatherData(null);
      })
      .finally(() => {
        setLoading(false);
        console.log('Loading finished'); // Debugging message
      });
  }, [city]); // Runs only when "city" changes

  // const handleCitySearch = () => {
  //   setCity(city);
  // };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      {/* <button onClick={handleCitySearch}>Get Weather</button> */}
      <div className="result-container">
        {loading && <p id="loading-message">Loading....</p>}
        {error && <p id="error-message">{error}</p>}
        {weatherData && (
          <div>
            <h2>{weatherData.name}</h2>
            <p>{weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Temperature: {weatherData.main.temp}K</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
