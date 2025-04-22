// Weather.jsx
import debounce from 'lodash.debounce';
import React, { useState, useEffect } from 'react';
import {
  saveCityToLocalStorage,
  loadCityHistoryFromLocalStorage,
} from '../utils/localStorageUtils.js';
import fetchWeather from '../services/weatherService.js';
// import {
//   WiDaySunny,
//   WiDayCloudy,
//   WiRain,
//   WiSnow,
//   WiCloudy,
// } from 'react-icons/wi';

import {
  mdiWeatherSunny,
  mdiWeatherCloudy,
  mdiWeatherRainy,
  mdiWeatherSnowy,
  mdiWeatherWindy,
  mdiWeatherLightning,
} from '@mdi/js';
import Icon from '@mdi/react';

function Weather() {
  const [city, setCity] = useState('Coquitlam'); // Triggers API call
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('Celsius');
  const [loading, setLoading] = useState(false);
  const [cityHistory, setCityHistory] = useState([]);

  const getWeatherIcon = (condition) => {
    console.log('Weather condition:', weatherData?.weather?.[0]?.main);

    switch (condition.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return (
          <div style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }}>
            <Icon path={mdiWeatherSunny} size={2} color="yellow" />
          </div>
        );
      case 'cloudy':
      case 'overcast':
      case 'clouds':
        return (
          <div style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }}>
            <Icon path={mdiWeatherCloudy} size={2} color="gray" />
          </div>
        );
      case 'rain':
      case 'rainy':
        return (
          <div style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }}>
            <Icon path={mdiWeatherRainy} size={2} color="blue" />
          </div>
        );
      case 'snow':
        return (
          <div style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }}>
            <Icon path={mdiWeatherSnowy} size={2} color="lightblue" />
          </div>
        );
      case 'windy':
        return (
          <div style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }}>
            <Icon path={mdiWeatherWindy} size={2} />
          </div>
        );
      case 'thunderstorm': // New case for Thunderstorm
        return (
          <div style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }}>
            <Icon path={mdiWeatherLightning} size={2} color="purple" />
          </div>
        );
      default:
        return (
          <div style={{ filter: 'drop-shadow(2px 2px 2px rgba(0,0,0,0.5))' }}>
            <Icon path={mdiWeatherCloudy} size={2} />
          </div>
        );
    }
  };

  // Debounced API fetch function
  const debouncedFetchWeather = debounce((city) => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      setWeatherData(null);
      return;
    }

    setLoading(true);
    fetchWeather(city)
      .then((data) => {
        setWeatherData(data);
        setError('');

        // Extract latitude and longitude from the current weather data
        const lat = data.coord.lat;
        const lon = data.coord.lon;
        console.log('Latitude:', lat, 'Longitude:', lon);

        if (data.name) {
          saveCityToLocalStorage(data.name); //Use API-corrected name
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
      {}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onFocus={() => {
          setCityHistory(loadCityHistoryFromLocalStorage());
        }}
        list="city-history" //  Link input to the datalist
        placeholder="Enter city"
      />
      <datalist id="city-history">
        {cityHistory.map((c, index) => {
          return <option key={index} value={c} />;
        })}
      </datalist>
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
            {getWeatherIcon(weatherData.weather[0].main)}
            <p>{weatherData.weather[0].description}</p>
            <p>Humidity: {weatherData.main.humidity} %</p>
            <p>
              Temperature: {getTemperature(weatherData.main.temp)}°
              {unitSymbols[unit]}
            </p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Weather;
