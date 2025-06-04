// services/weatherService.js
import axios from 'axios';

const apiKey = "a9e87d92b47747bf855172142252304"; 
// const location = "Coquitlam"; 
// const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=no&alerts=no`;
// const url = `https://api.weatherapi.com/v1/forecast.json?key=a9e87d92b47747bf855172142252304&q=Coquitlam&days=1&aqi=no&alerts=no`;
const http = axios.create({
    baseURL: 'https://api.weatherapi.com/v1/'
});

const fetchWeather = async (city: string, signal?: AbortSignal) => {
    try {
        // Get current weather data
        const response = await http.get(
            `forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`,
            { signal });
        return response.data;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request cancelled:', error.message);
          }
        throw error;
    }

}

export default fetchWeather;