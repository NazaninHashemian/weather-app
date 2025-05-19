import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import convertTemperature from '../../utils/convertTemperature';
import { WeatherData } from '../../types/weatherTypes';
import './TodayTemperatureChart.css';

interface TodayTemperatureChartProps {
  weatherData: WeatherData;
  unit: 'Celsius' | 'Fahrenheit' | 'Kelvin';
}

const TodayTemperatureChart: React.FC<TodayTemperatureChartProps> = ({ weatherData, unit }) => {
  if (!weatherData || !weatherData.forecast?.forecastday?.length) {
    return <p>No data to display</p>;
  }

  const todayForecast = weatherData.forecast.forecastday[0];

  // Prepare data for the chart (hour and temperature converted)
  const data = todayForecast.hour.map((hourData) => ({
    hour: new Date(hourData.time).getHours(), // Extract hour number
    temp: convertTemperature(hourData.temp_c, unit),
  }));

  return (
    <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="hour" label={{ value: 'Hour', position: 'insideBottomRight', offset: -5 }} />
            <YAxis
            label={{ value: `Temperature (${unit === 'Celsius' ? '°C' : unit === 'Fahrenheit' ? '°F' : 'K'})`, angle: -90, position: 'insideLeft' }}
            domain={['auto', 'auto']}
            />
            <Tooltip formatter={(value: number) => value.toFixed(1)} />
            <Line type="monotone" dataKey="temp" stroke="#8884d8" dot={false} />
        </LineChart>
        </ResponsiveContainer>
    </div>
  );
};

export default TodayTemperatureChart;
