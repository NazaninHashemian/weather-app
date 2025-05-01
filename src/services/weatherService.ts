
// services/weatherService.js
import axios from 'axios';

const apiKey = "a9e87d92b47747bf855172142252304"; 
// const location = "Coquitlam"; 
// const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=no&alerts=no`;

const http = axios.create({
    baseURL: 'https://api.weatherapi.com/v1/'
});

const fetchWeather = async (city: string) => {
    try {
        // Get current weather data
        const response = await http.get(
            `forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`);
        return response.data;
    } catch (error) {
        // Propagate error for handling in the component
        throw error;
    }

}

export default fetchWeather;