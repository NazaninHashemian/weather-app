"use strict";
// localStorageUtils.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadCityHistoryFromLocalStorage = exports.saveCityToLocalStorage = void 0;
// Function to save the city to localStorage
const saveCityToLocalStorage = (city) => {
    const cityHistory = JSON.parse(localStorage.getItem('cityHistory') || '[]');
    if (!cityHistory.includes(city)) {
        cityHistory.unshift(city); // Add to the beginning of the array
    }
    if (cityHistory.length > 5) {
        cityHistory.pop(); // Remove the last city if there are more than 5
    }
    localStorage.setItem('cityHistory', JSON.stringify(cityHistory)); // Save back to localStorage
};
exports.saveCityToLocalStorage = saveCityToLocalStorage;
// Function to load the city history from localStorage
const loadCityHistoryFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('cityHistory') || '[]');
};
exports.loadCityHistoryFromLocalStorage = loadCityHistoryFromLocalStorage;
