// Weather.jsx
import debounce from 'lodash.debounce';
import React, { useState, useEffect} from 'react';
import {
  saveCityToLocalStorage,
  loadCityHistoryFromLocalStorage,
} from '../../utils/localStorageUtils.js';
import fetchWeather from '../../services/weatherService.js';
import './Weather.css';
import SearchBar from '../SearchBar/SearchBar.js';
import WeatherCard from '../WeatherCard/WeatherCard.js';
import ExtraInfoCard from '../ExtraInfoCard/ExtraInfoCard.js';
import { WeatherData } from '../../types/weatherTypes.js'
import HourlyForecast from '../HourlyForecast/HourlyForecast.js';
import UnitSelector from '../UnitSelector/UnitSelector.js';
import { getWeatherIcon, getTemperature, getBackgroundImageByCondition } from '../../utils/weatherUtils.js';

function Weather() {
  const [city, setCity] = useState('Coquitlam');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState<'Celsius' | 'Fahrenheit' | 'Kelvin'>('Celsius');
  const [loading, setLoading] = useState(false);
  const [cityHistory, setCityHistory] = useState<string[]>([]);

  const getDayName = (offset: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toLocaleDateString('en-US', { weekday: 'long' }); // e.g., 'Tuesday'
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

  useEffect(() => {
    if (weatherData?.current?.condition?.text && weatherData?.current?.is_day !== undefined) {
      const bgUrl = getBackgroundImageByCondition(
        weatherData.current.condition.text,
        weatherData.current.is_day === 1
      );
      document.body.style.background = `url('${bgUrl}') no-repeat center center fixed`;
      document.body.style.backgroundSize = 'cover';
    }
  }, [weatherData]);
  

  return (
    <div className="container">
      
      <div className="header">
        <div className="header-content">
          {weatherData && (
            <div className="weather-icon">
              {getWeatherIcon(weatherData.current.condition, 'large')}
            </div>
          )}
          <h1>Weather Forecast</h1>
        </div>
      </div>


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
                unitSymbols={unit} 
                onGetWeatherIcon={getWeatherIcon}
                onGetTemperature={getTemperature}           
            />  
            )}
          </div>
        </div>

        <div className="right-bar">         
          <div className="extra-info-section">
            <h3>Today</h3>
            {weatherData && (
              <ExtraInfoCard 
                weatherData={weatherData}
                unitSymbols={unit}
                onGetTemperature={getTemperature} 
                dayIndex={0}            
              />
            )}
          </div>

          <div className="extra-info-section">
            <h3>{getDayName(1)}</h3>
            {weatherData && (
              <ExtraInfoCard 
                weatherData={weatherData}
                unitSymbols={unit}
                onGetTemperature={getTemperature} 
                dayIndex={1}            
              />
            )}
          </div>

          <div className="extra-info-section">
            <h3>{getDayName(2)}</h3>
            {weatherData && (
              <ExtraInfoCard 
                weatherData={weatherData}
                unitSymbols={unit}
                onGetTemperature={getTemperature} 
                dayIndex={2}            
              />
            )}
          </div>
        </div>

      </div>


        {/* <hr className="divider" /> */}

        {weatherData && (
          <HourlyForecast 
            weatherData={weatherData} 
            unitSymbols={unit} 
            onGetWeatherIcon={getWeatherIcon} 
            onGetTemperature={getTemperature} 
        />

        )}
      </div>
    
  );
}

export default Weather;
