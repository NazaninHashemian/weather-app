
// services/weatherService.js
import axios from 'axios';

const apiKey = '4e5c6111439b8ec97661a32222b32c21';

const http = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather'
});

export const fetchWeather = (city) => {
    return axios
    .get(`${baseURL}?q=${city}&appid=${apiKey}`)
    .then((response) => response.data)   // response.data is an object
    .catch((error) => {
        // Let the component handle the error details
        throw error;
    });



}
