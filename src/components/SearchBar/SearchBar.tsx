import React from 'react'
interface SearchBarProps {
    city: string;
    cityHistory: string[];
    onCityChange: (value: string) => void;
    onClear: () => void;
    onFocusHistory: () => void;
}
function SearchBar({city, cityHistory, onCityChange, onClear, onFocusHistory}: SearchBarProps
    
) {
  return (
    <>
       <input
            type="text"
            value={city}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onCityChange(e.target.value)}
            onFocus={onFocusHistory}
            list="city-history"
            placeholder="Enter city"
          />
          <datalist id="city-history">
            {cityHistory.map((c, index) => (
              <option key={index} value={c} />
            ))}
          </datalist>
          <button onClick={onClear}>Clear</button>

    </>
  )
}

export default SearchBar;