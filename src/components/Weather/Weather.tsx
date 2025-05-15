// Weather.tsx
import debounce from 'lodash.debounce';
import React, { useState, useEffect } from 'react';
import {
  saveCityToLocalStorage,
  loadCityHistoryFromLocalStorage,
} from '../../utils/localStorageUtils.js';
import fetchWeather from '../../services/weatherService.js';
import './Weather.css';
import SearchBar from '../SearchBar/SearchBar.js';
import WeatherCard from '../WeatherCard/WeatherCard.js';
import ExtraInfoCard from '../ExtraInfoCard/ExtraInfoCard.js';
import { WeatherData } from '../../types/weatherTypes.js';
import HourlyForecast from '../HourlyForecast/HourlyForecast.js';
import UnitSelector from '../UnitSelector/UnitSelector.js';
import getWeatherIcon from '../../utils/getWeatherIcon.js';
import getTemperature from '../../utils/getTemperature.js';
import getBackgroundImageByCondition from '../../utils/getBackgroundImageByCondition.js';
import getUserLocation from '../UnitSelector/locationUtils.js';
import WeatherMap from '../CityMap/CityMap.js';

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState<'Celsius' | 'Fahrenheit' | 'Kelvin'>('Celsius');
  const [loading, setLoading] = useState(false);
  const [cityHistory, setCityHistory] = useState<string[]>([]);

  useEffect(() => {
    if (!city)
      getUserLocation()
        .then((detectedCity) => setCity(detectedCity))
        .catch((error) => {
          console.log(error);
          setCity('');
        });
  }, []);

  const handleDetectLocation = () => {
    if (loading) return;

    setLoading(true);
    getUserLocation()
      .then((detectedCity) => {
        setCity(detectedCity);
        setError('');
      })
      .catch((error) => {
        console.error("Error detecting location:", error);
        setError("Could not detect your location.");
      })
      .finally(() => setLoading(false));
  };

  const getDayName = (offset: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
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
      });
  }, 500);

  useEffect(() => {
    debouncedFetchWeather(city);
    return () => debouncedFetchWeather.cancel();
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
            city={city}
            cityHistory={cityHistory}
            onCityChange={setCity}
            onClear={() => setCity('')}
            onFocusHistory={() => setCityHistory(loadCityHistoryFromLocalStorage())}
          />
          <UnitSelector unit={unit} onSetUnit={setUnit} />

          <button className="my-location" onClick={handleDetectLocation} disabled={loading}>
            My Location
          </button>

          <div className="result-container">
            {loading && <p id="loading-message">Loading....</p>}
            {error && <p id="error-message">{error}</p>}

            {weatherData && (
              <WeatherCard
                weatherData={weatherData}
                unitSymbols={unit}
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

      {/* === MIDDLE BAR with MAP === */}
      {weatherData?.location && (
        <div className="middle-bar">
            <WeatherMap
              lat={weatherData.location.lat}
              lon={weatherData.location.lon}
              city={weatherData.location.name}
            />
        </div>
      )}

      {/* === HOURLY FORECAST === */}
      {weatherData && (
        <HourlyForecast
          weatherData={weatherData}
          unitSymbols={unit}
          onGetWeatherIcon={getWeatherIcon}
          onGetTemperature={getTemperature}
        />
      )}

      {/* === FOOTER LOCATION === */}
      {weatherData && (
        <div className="footer-location">
          <p>
            Showing weather for:{' '}
            <strong>
              {weatherData.location.name}, {weatherData.location.country}
            </strong>
          </p>
        </div>
      )}
    </div>
  );
}

export default Weather;
