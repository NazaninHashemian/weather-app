// utils/convertTemperature.ts
const convertTemperature = (
  tempCelsius: number,
  unit: 'Celsius' | 'Fahrenheit' | 'Kelvin'
): number => {
  if (unit === 'Celsius') return tempCelsius;
  if (unit === 'Fahrenheit') return (tempCelsius * 9) / 5 + 32;
  return tempCelsius + 273.15;
};

export default convertTemperature;
