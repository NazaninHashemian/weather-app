// utils/getUnitSymbol.tsx
const getUnitSymbol = (unit: 'Celsius' | 'Fahrenheit' | 'Kelvin'): string => {
    if (unit === 'Celsius') return '°C';
    if (unit === 'Fahrenheit') return '°F';
    return 'K';
  };
  
  export default getUnitSymbol;
  