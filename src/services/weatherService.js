
// services/weatherService.js
import axios from 'axios';

const apiKey = '4e5c6111439b8ec97661a32222b32c21';

const http = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/'
});

const fetchWeather = async (city) => {
    try {
        // Get current weather data
        const currentWeatherResponse = await http.get(
            `weather?q=${city}&appid=${apiKey}`);
        return currentWeatherResponse.data;
    } catch (error) {
        // Propagate error for handling in the component
        throw error;
    }

}

export default fetchWeather;
