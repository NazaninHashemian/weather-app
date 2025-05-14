// utils/getTemperature.tsx
const getTemperature = (tempCelsius: number,
    unit: 'Celsius' | 'Fahrenheit' | 'Kelvin'
  ): string => {
      if (unit === 'Celsius') return tempCelsius.toFixed(1);
      if (unit === 'Fahrenheit') return ((tempCelsius * 9) / 5 + 32).toFixed(1);
      return (tempCelsius + 273.15).toFixed(1); // Kelvin
  };
  
  export default getTemperature;
  