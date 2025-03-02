import debounce from 'lodash.debounce';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  saveCityToLocalStorage,
  loadCityHistoryFromLocalStorage,
} from '../utils/localStorageUtils.js';

function Weather() {
  const [city, setCity] = useState('Coquitlam'); // Triggers API call
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('Celsius');
  const [loading, setLoading] = useState(false);
  const [cityHistory, setCityHistory] = useState([]);

  const apiKey = '4e5c6111439b8ec97661a32222b32c21';

  // Debounced API fetch function
  const debouncedFetchWeather = debounce((city) => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      setWeatherData(null);
      return;
    }

    setLoading(true);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )
      .then((response) => {
        setWeatherData(response.data);
        setError('');

        if (response.data.name && response.status === 200) {
          saveCityToLocalStorage(response.data.name); //Use API-corrected name
          setCityHistory(loadCityHistoryFromLocalStorage());
        }
      })

      .catch((error) => {
        // Check if the error is related to no network connection
        if (!error.response) {
          setError('No internet connection');
        } else {
          const errorMessage =
            error.response?.data?.message ||
            (error.response?.data?.cod === '401'
              ? 'Invalid API key'
              : error.response?.data?.cod === '429'
              ? 'Request limit exceeded'
              : 'City not found!');
          setError(errorMessage);
        }
        setWeatherData(null);
      })

      .finally(() => {
        setLoading(false);
      });
  }, 500);

  useEffect(() => {
    debouncedFetchWeather(city);

    return () => {
      debouncedFetchWeather.cancel();
    };
  }, [city]); // Runs only when "city" changes

  const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);
  const kelvinToFahrenheit = (kelvin) =>
    (((kelvin - 273.15) * 9) / 5 + 32).toFixed(2);

  // Function to toggle between Celsius, Fahrenheit, and Kelvin
  const handleUnitToggle = () => {
    if (unit === 'Celsius') {
      setUnit('Fahrenheit');
    } else if (unit === 'Fahrenheit') {
      setUnit('Kelvin');
    } else {
      setUnit('Celsius');
    }
  };

  // Function to get the correct temperature value based on the selected unit
  const getTemperature = (kelvin) => {
    if (unit === 'Celsius') {
      return kelvinToCelsius(kelvin);
    } else if (unit === 'Fahrenheit') {
      return kelvinToFahrenheit(kelvin);
    } else {
      return kelvin.toFixed(2);
    }
  };

  const unitSymbols = {
    Celsius: 'C',
    Fahrenheit: 'F',
    Kelvin: 'K',
  };

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={() => setCity('')}>Clear</button>
      <select
        id="unitDropdown"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
      >
        <option value="Celsius">Celsius (°C)</option>
        <option value="Fahrenheit">Fahrenheit (°F)</option>
        <option value="Kelvin">Kelvin (K)</option>
      </select>

      <div className="result-container">
        {loading && <p id="loading-message">Loading....</p>}
        {error && <p id="error-message">{error}</p>}
        {weatherData && (
          <div className="weather-card">
            <h2>{weatherData.name}</h2>
            <p>{weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity} %</p>
            <p>
              Temperature: {getTemperature(weatherData.main.temp)}°
              {unitSymbols[unit]}
            </p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}

        {/* Show City History */}
        {cityHistory.length > 0 && (
          <div>
            <h3>Search History:</h3>
            <ul>
              {cityHistory.map((c, index) => (
                <li key={index} onClick={() => setCity(c)}>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;
