
// services/weatherService.js
import axios from 'axios';

const apiKey = '4e5c6111439b8ec97661a32222b32c21';

const http = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather'
});

const fetchWeather = async (city) => {
    try {
        const response = await http
            .get(`?q=${city}&appid=${apiKey}`);
        return response.data;
    } catch (error) {
        // Propagate error for handling in the component
        throw error;
    }

}

export default fetchWeather;
