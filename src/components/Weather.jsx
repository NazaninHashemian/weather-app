// Weather.jsx
import debounce from 'lodash.debounce';
import React, { useState, useEffect } from 'react';
import {
  saveCityToLocalStorage,
  loadCityHistoryFromLocalStorage,
} from '../utils/localStorageUtils.js';
import fetchWeather from '../services/weatherService.js';
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
          <div className="icon-wrapper">
            <Icon path={mdiWeatherSunny} size={2} color="yellow" />
          </div>
        );
      case 'cloudy':
      case 'overcast':
      case 'clouds':
        return (
          <div className='icon-wrapper'>
            <Icon path={mdiWeatherCloudy} size={2} color="gray" />
          </div>
        );
      case 'rain':
      case 'rainy':
        return (
          <div className='icon-wrapper'>
            <Icon path={mdiWeatherRainy} size={2} color="blue" />
          </div>
        );
      case 'snow':
        return (
          <div className='icon-wrapper'>
            <Icon path={mdiWeatherSnowy} size={2} color="lightblue" />
          </div>
        );
      case 'windy':
        return (
          <div className='icon-wrapper'>
            <Icon path={mdiWeatherWindy} size={2} />
          </div>
        );
      case 'thunderstorm': // New case for Thunderstorm
        return (
          <div className='icon-wrapper'>
            <Icon path={mdiWeatherLightning} size={2} color="purple" />
          </div>
        );
      default:
        return (
          <div className='icon-wrapper'>
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
        const lat = data.location.lat;
        const lon = data.location.lon;
        console.log('Latitude:', lat, 'Longitude:', lon);

        if (data.location.name) {
          saveCityToLocalStorage(data.location.name); //Use API-corrected name
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

  // const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(2);
  // const kelvinToFahrenheit = (kelvin) =>
  //   (((kelvin - 273.15) * 9) / 5 + 32).toFixed(2);

  // Function to get the correct temperature value based on the selected unit
  const getTemperature = (kelvin) => {
    if (unit === 'Celsius') {
      return weatherData.current.temp_c;
    } else if (unit === 'Fahrenheit') {
      return weatherData.current.temp_f;
    } else {
      return (weatherData.current.temp_c + 273.15).toFixed(2);
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
        aria-label="Choose temperature unit" // For accessibility
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
            {getWeatherIcon(weatherData.current.condition.text)}
            <p>{weatherData.current.condition.text}</p>
            <p>Humidity: {weatherData.current.humidity} %</p>
            <p>
              Temperature: {getTemperature(weatherData.current.temp_c)}°
              {unitSymbols[unit]}
            </p>
            <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
          </div>
        )}

        {/* {weatherData && (
            <div className="hourly-forecast">
              <h3>Hourly Forecast</h3>
              {weatherData.forecast.forecastday[0].hour.map((hour, index) => (
                <div key={index} className="hour">
                  <p>{hour.time.split(' ')[1]}</p>
                  {getWeatherIcon(hour.condition.text)}
                  <p>{getTemperature(hour.temp_c)}°{unitSymbols[unit]}</p>
                </div>
              ))}
            </div>
        )} */}

      </div>
    </div>
  );
}

export default Weather;