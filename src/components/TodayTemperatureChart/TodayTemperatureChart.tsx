import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';
import convertTemperature from '../../utils/convertTemperature';
import { WeatherData } from '../../types/weatherTypes';
import './TodayTemperatureChart.css';

interface TodayTemperatureChartProps {
  weatherData: WeatherData;
  unit: 'Celsius' | 'Fahrenheit' | 'Kelvin';
}

const TodayTemperatureChart: React.FC<TodayTemperatureChartProps> = ({ weatherData, unit }) => {
  if (!weatherData?.forecast?.forecastday?.length) return <p>No data to display</p>;

  const todayForecast = weatherData.forecast.forecastday[0];
  const data = todayForecast.hour.map(h => ({
    hour: new Date(h.time).getHours(),
    temp: convertTemperature(h.temp_c, unit),
  }));

  return (
    <div className="chart-container">
      {/* ↓ SHRINK height from 300 → 180 (pick what fits) */}
      <ResponsiveContainer width="100%" height={180}>
        <LineChart
          data={data}
          /* ↓ Tighten the padding around the plot */
          // margin={{ top: 5, right: 10, bottom: 5, left: 5 }}
        >
          <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
          {/* ↓ Smaller tick font so labels don’t crowd */}
          <XAxis
            dataKey="hour"
            tick={{ fontSize: 10}}
            tickLine={false}
            label={{ value: 'Hour', position: 'insideBottomRight', offset: 4, fontSize: 11 }}
          />
          <YAxis
            domain={['auto', 'auto']}
            tick={{ fontSize: 11 }}
            tickLine={false}
            label={{
              value: `Temp (${unit === 'Celsius' ? '°C' : unit === 'Fahrenheit' ? '°F' : 'K'})`,
              angle: -90,
              position: 'insideLeft',
              offset: 1,
              fontSize: 13,
            }}
          />
          <Tooltip formatter={(v: number) => v.toFixed(1)} />
          <Line type="monotone" dataKey="temp" stroke="#8884d8" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TodayTemperatureChart;
