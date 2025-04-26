// Weather.jsx
import debounce from 'lodash.debounce';
import React, { useState, useEffect } from 'react';
import {
  saveCityToLocalStorage,
  loadCityHistoryFromLocalStorage,
} from '../utils/localStorageUtils.js';
import fetchWeather from '../services/weatherService.js';
import './Weather.css';

function Weather() {
  const [city, setCity] = useState('Coquitlam');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('Celsius');
  const [loading, setLoading] = useState(false);
  const [cityHistory, setCityHistory] = useState([]);

  const getWeatherIcon = (condition) => {
    const iconUrl = condition?.icon;
    if (!iconUrl) return null;
    return (
      <div className='icon-wrapper'>
        <img 
          src={`https:${iconUrl}`} 
          alt={`Weather icon representing ${condition.text}`}
          width="100" 
          height="100" 
        />
      </div>
    );
  };

  const getTemperature = (tempCelsius) => {
    if (unit === 'Celsius') return tempCelsius.toFixed(1);
    if (unit === 'Fahrenheit') return ((tempCelsius * 9) / 5 + 32).toFixed(1);
    return (tempCelsius + 273.15).toFixed(1); // Kelvin
  };

  const unitSymbols = {
    Celsius: 'C',
    Fahrenheit: 'F',
    Kelvin: 'K',
  };

  const debouncedFetchWeather = debounce((cityName) => {
    if (!cityName.trim()) {
      setError('Please enter a city name.');
      setWeatherData(null);
      return;
    }

    setLoading(true);
    fetchWeather(cityName)
      .then((data) => {
        setWeatherData(data);
        setError('');
        const lat = data.location.lat;
        const lon = data.location.lon;
        console.log('Latitude:', lat, 'Longitude:', lon);

        if (data.location.name) {
          saveCityToLocalStorage(data.location.name);
          setCityHistory(loadCityHistoryFromLocalStorage());
        }
      })
      .catch((error) => {
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
  }, [city]);

  return (
    <div>
      <h1>Weather Forecast</h1>

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onFocus={() => {
          setCityHistory(loadCityHistoryFromLocalStorage());
        }}
        list="city-history"
        placeholder="Enter city"
      />
      <datalist id="city-history">
        {cityHistory.map((c, index) => (
          <option key={index} value={c} />
        ))}
      </datalist>
      <button onClick={() => setCity('')}>Clear</button>

      <select
        id="unitDropdown"
        value={unit}
        onChange={(e) => setUnit(e.target.value)}
        aria-label="Choose temperature unit"
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
            <h2>{weatherData.location.name}</h2>
            {getWeatherIcon(weatherData.current.condition)}
            <p>{weatherData.current.condition.text}</p>
            <p>Humidity: {weatherData.current.humidity} %</p>
            <p>
              Temperature: {getTemperature(weatherData.current.temp_c)}°
              {unitSymbols[unit]}
            </p>
            <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
          </div>
        )}

        {/* <hr className="divider" /> */}

        {weatherData && (
          <>
            <div className="gradient-line"></div>
            <div  className="hourly-forecast-container">
                <h2>Hourly Forecast</h2>
                <div className="hourly-forecast">
                  {weatherData.forecast.forecastday[0].hour.map((hour, index) => (
                    <div key={index} className="hour">
                      {/* <p>{hour.time.split(' ')[1]}</p> */}
                      <p>{new Date(hour.time).toLocaleTimeString([], { hour: 'numeric', hour12: true })}</p>
                      {getWeatherIcon(hour.condition)}
                      <p>{hour.condition.text}</p>
                      <p>
                        {getTemperature(hour.temp_c)}°{unitSymbols[unit]}
                      </p>
                    </div>
                  ))}
                </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Weather;
