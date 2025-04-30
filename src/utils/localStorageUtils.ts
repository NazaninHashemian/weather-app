// localStorageUtils.js

// Function to save the city to localStorage
const saveCityToLocalStorage = (city: string): void => {
  const cityHistory: string[] = JSON.parse(localStorage.getItem('cityHistory') || '[]');

  if (!cityHistory.includes(city)) {
    cityHistory.unshift(city); // Add to the beginning of the array
  }
  if (cityHistory.length > 5) {
    cityHistory.pop(); // Remove the last city if there are more than 5
  }

  localStorage.setItem('cityHistory', JSON.stringify(cityHistory)); // Save back to localStorage
};

// Function to load the city history from localStorage
const loadCityHistoryFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cityHistory') || '[]');
};

export { saveCityToLocalStorage, loadCityHistoryFromLocalStorage };
