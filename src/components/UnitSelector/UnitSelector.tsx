import React, { ChangeEvent } from 'react';

interface UnitSelectorProps {
    unit: 'Celsius' | 'Fahrenheit' | 'Kelvin';
    onSetUnit: (value:  'Celsius' | 'Fahrenheit' | 'Kelvin' ) => void;
}

function UnitSelector({unit, onSetUnit}: UnitSelectorProps) {
  return (
    <>
       <select
            id="unitDropdown"
            value={unit}
            onChange={(e:ChangeEvent<HTMLSelectElement>) => onSetUnit(e.target.value as 'Celsius' | 'Fahrenheit' | 'Kelvin')}
            aria-label="Choose temperature unit"
        >
            <option value="Celsius">Celsius (°C)</option>
            <option value="Fahrenheit">Fahrenheit (°F)</option>
            <option value="Kelvin">Kelvin (K)</option>
        </select>
    </>
    
  )
}

export default UnitSelector