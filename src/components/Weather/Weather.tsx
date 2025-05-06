// Weather.jsx
import debounce from 'lodash.debounce';
import React, { useState, useEffect, ChangeEvent, ReactNode } from 'react';
import {
  saveCityToLocalStorage,
  loadCityHistoryFromLocalStorage,
} from '../../utils/localStorageUtils.js';
import fetchWeather from '../../services/weatherService.js';
import './Weather.css';
import SearchBar from '../SearchBar/SearchBar.js';
import WeatherCard from '../WeatherCard/WeatherCard.js';
import ExtraInfoCard from '../ExtraInfoCard/ExtraInfoCard.js';
import {WeatherData, Condition} from '../../types/weatherTypes.js'
import HourlyForecast from '../HourlyForecast/HourlyForecast.js';
import UnitSelector from '../UnitSelector/UnitSelector.js';

// type Unit = 'Celsius' | 'Fahrenheit' | 'Kelvin';

// interface Condition {
//   text: string;
//   icon: string;
// }

// interface WeatherData {
//   location: {
//     name: string;
//     lat: number;
//     lon: number;
//   };
//   current: {
//     temp_c: number;
//     feelslike_c: number;
//     humidity: number;
//     wind_kph: number;
//     condition: Condition;
//   };
//   forecast: {
//     forecastday: Array<{
//       day: {
//         maxtemp_c: number;
//         mintemp_c: number;
//         daily_chance_of_rain: number;
//       };
//       astro: {
//         sunrise: string;
//         sunset: string;
//       };
//       hour: Array<{
//         time: string;
//         temp_c: number;
//         condition: Condition;
//       }>;
//     }>;
//   };
// }

function Weather() {
  const [city, setCity] = useState('Coquitlam');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState<'Celsius' | 'Fahrenheit' | 'Kelvin'>('Celsius');
  const [loading, setLoading] = useState(false);
  const [cityHistory, setCityHistory] = useState<string[]>([]);

  const getWeatherIcon = (condition: Condition | undefined) : ReactNode => {
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

  const getTemperature = (tempCelsius: number): string => {
    if (unit === 'Celsius') return tempCelsius.toFixed(1);
    if (unit === 'Fahrenheit') return ((tempCelsius * 9) / 5 + 32).toFixed(1);
    return (tempCelsius + 273.15).toFixed(1); // Kelvin
  };

  const unitSymbols = {
    Celsius: 'C',
    Fahrenheit: 'F',
    Kelvin: 'K',
  };

  const debouncedFetchWeather = debounce((cityName: string) => {
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

        setLoading(false); 
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
        setLoading(false); 
      })
  }, 500);

  useEffect(() => {
    debouncedFetchWeather(city);
    return () => {
      debouncedFetchWeather.cancel();
    };
  }, [city]);

  return (
    <div className="container">
      <h1>Weather Forecast</h1>
      <div className="top-bar">
        <div className="left-bar">
 
          <SearchBar 
            city= {city}
            cityHistory={cityHistory}
            onCityChange={setCity} 
            onClear={() => setCity('')} 
            onFocusHistory={() => setCityHistory(loadCityHistoryFromLocalStorage())}
          />
          <UnitSelector 
            unit={unit} 
            onSetUnit={setUnit}
          />
        
          <div className="result-container">
            {loading && <p id="loading-message">Loading....</p>}
            {error && <p id="error-message">{error}</p>}

            {weatherData && (
              <WeatherCard 
                weatherData={weatherData}
                unitSymbols={unitSymbols[unit]} 
                onGetWeatherIcon={getWeatherIcon}
                onGetTemperature={getTemperature}           
            />  
            )}
          </div>
        </div>

        <div className="right-bar">
          <h3>Today’s Details</h3>
          {weatherData && (
            <ExtraInfoCard 
            weatherData={weatherData} 
            unitSymbols={unitSymbols[unit]} 
            onGetTemperature={getTemperature} />
          )}
        </div>

      </div>


        {/* <hr className="divider" /> */}

        {weatherData && (
          <HourlyForecast 
            weatherData={weatherData} 
            unitSymbols={unitSymbols[unit]} 
            onGetWeatherIcon={getWeatherIcon} 
            onGetTemperature={getTemperature} 
        />

        )}
      </div>
    
  );
}

export default Weather;
