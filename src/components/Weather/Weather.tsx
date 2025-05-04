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


// type Unit = 'Celsius' | 'Fahrenheit' | 'Kelvin';

interface Condition {
  text: string;
  icon: string;
}

interface WeatherData {
  location: {
    name: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    feelslike_c: number;
    humidity: number;
    wind_kph: number;
    condition: Condition;
  };
  forecast: {
    forecastday: Array<{
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        daily_chance_of_rain: number;
      };
      astro: {
        sunrise: string;
        sunset: string;
      };
      hour: Array<{
        time: string;
        temp_c: number;
        condition: Condition;
      }>;
    }>;
  };
}

function Weather() {
  const [city, setCity] = useState('Coquitlam');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState<'Celsius' | 'Fahrenheit' | 'Kelvin'>('Celsius');
  const [loading, setLoading] = useState(false);
  const [cityHistory, setCityHistory] = useState([]);

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
          
          <select
            id="unitDropdown"
            value={unit}
            onChange={(e:ChangeEvent<HTMLSelectElement>) => setUnit(e.target.value as 'Celsius' | 'Fahrenheit' | 'Kelvin')}
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
              <WeatherCard 
                weatherData={weatherData}
                unitSymbols={{
                  unit: unit
                }} 
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
            unitSymbols={{
              unit: unit
            }} 
            onGetTemperature={getTemperature} />

            // <div className="extra-info-card">           
            //   <p>Feels Like: {getTemperature(weatherData.current.feelslike_c)}°{unitSymbols[unit]}</p>
            //   <p>Max Temp: {getTemperature(weatherData.forecast.forecastday[0].day.maxtemp_c)}°{unitSymbols[unit]}</p>
            //   <p>Min Temp: {getTemperature(weatherData.forecast.forecastday[0].day.mintemp_c)}°{unitSymbols[unit]}</p>
            //   <p>Chance of Rain: {weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%</p>
            //   <p>Sunrise: {weatherData.forecast.forecastday[0].astro.sunrise}</p>
            //   <p>Sunset: {weatherData.forecast.forecastday[0].astro.sunset}</p>
            // </div>
          )}
        </div>

      </div>


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
    
  );
}

export default Weather;
