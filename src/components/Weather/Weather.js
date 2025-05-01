"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Weather.jsx
const lodash_debounce_1 = __importDefault(require("lodash.debounce"));
const react_1 = __importStar(require("react"));
const localStorageUtils_js_1 = require("../../utils/localStorageUtils.js");
const weatherService_js_1 = __importDefault(require("../../services/weatherService.js"));
require("./Weather.css");
function Weather() {
    const [city, setCity] = (0, react_1.useState)('Coquitlam');
    const [weatherData, setWeatherData] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)('');
    const [unit, setUnit] = (0, react_1.useState)('Celsius');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [cityHistory, setCityHistory] = (0, react_1.useState)([]);
    const getWeatherIcon = (condition) => {
        const iconUrl = condition === null || condition === void 0 ? void 0 : condition.icon;
        if (!iconUrl)
            return null;
        return (react_1.default.createElement("div", { className: 'icon-wrapper' },
            react_1.default.createElement("img", { src: `https:${iconUrl}`, alt: `Weather icon representing ${condition.text}`, width: "100", height: "100" })));
    };
    const getTemperature = (tempCelsius) => {
        if (unit === 'Celsius')
            return tempCelsius.toFixed(1);
        if (unit === 'Fahrenheit')
            return ((tempCelsius * 9) / 5 + 32).toFixed(1);
        return (tempCelsius + 273.15).toFixed(1); // Kelvin
    };
    const unitSymbols = {
        Celsius: 'C',
        Fahrenheit: 'F',
        Kelvin: 'K',
    };
    const debouncedFetchWeather = (0, lodash_debounce_1.default)((cityName) => {
        if (!cityName.trim()) {
            setError('Please enter a city name.');
            setWeatherData(null);
            return;
        }
        setLoading(true);
        (0, weatherService_js_1.default)(cityName)
            .then((data) => {
            setWeatherData(data);
            setError('');
            const lat = data.location.lat;
            const lon = data.location.lon;
            console.log('Latitude:', lat, 'Longitude:', lon);
            if (data.location.name) {
                (0, localStorageUtils_js_1.saveCityToLocalStorage)(data.location.name);
                setCityHistory((0, localStorageUtils_js_1.loadCityHistoryFromLocalStorage)());
            }
            setLoading(false);
        })
            .catch((error) => {
            var _a, _b, _c, _d, _e, _f;
            if (!error.response) {
                setError('No internet connection');
            }
            else {
                const errorMessage = ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) ||
                    (((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.cod) === '401'
                        ? 'Invalid API key'
                        : ((_f = (_e = error.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.cod) === '429'
                            ? 'Request limit exceeded'
                            : 'City not found!');
                setError(errorMessage);
            }
            setWeatherData(null);
            setLoading(false);
        });
    }, 500);
    (0, react_1.useEffect)(() => {
        debouncedFetchWeather(city);
        return () => {
            debouncedFetchWeather.cancel();
        };
    }, [city]);
    return (react_1.default.createElement("div", { className: "container" },
        react_1.default.createElement("h1", null, "Weather Forecast"),
        react_1.default.createElement("div", { className: "top-bar" },
            react_1.default.createElement("div", { className: "left-bar" },
                react_1.default.createElement("input", { type: "text", value: city, onChange: (e) => setCity(e.target.value), onFocus: () => {
                        setCityHistory((0, localStorageUtils_js_1.loadCityHistoryFromLocalStorage)());
                    }, list: "city-history", placeholder: "Enter city" }),
                react_1.default.createElement("datalist", { id: "city-history" }, cityHistory.map((c, index) => (react_1.default.createElement("option", { key: index, value: c })))),
                react_1.default.createElement("button", { onClick: () => setCity('') }, "Clear"),
                react_1.default.createElement("select", { id: "unitDropdown", value: unit, onChange: (e) => setUnit(e.target.value), "aria-label": "Choose temperature unit" },
                    react_1.default.createElement("option", { value: "Celsius" }, "Celsius (\u00B0C)"),
                    react_1.default.createElement("option", { value: "Fahrenheit" }, "Fahrenheit (\u00B0F)"),
                    react_1.default.createElement("option", { value: "Kelvin" }, "Kelvin (K)")),
                react_1.default.createElement("div", { className: "result-container" },
                    loading && react_1.default.createElement("p", { id: "loading-message" }, "Loading...."),
                    error && react_1.default.createElement("p", { id: "error-message" }, error),
                    weatherData && (react_1.default.createElement("div", { className: "weather-card" },
                        react_1.default.createElement("h2", null, weatherData.location.name),
                        getWeatherIcon(weatherData.current.condition),
                        react_1.default.createElement("p", null, weatherData.current.condition.text),
                        react_1.default.createElement("p", null,
                            "Humidity: ",
                            weatherData.current.humidity,
                            " %"),
                        react_1.default.createElement("p", null,
                            "Temperature: ",
                            getTemperature(weatherData.current.temp_c),
                            "\u00B0",
                            unitSymbols[unit]),
                        react_1.default.createElement("p", null,
                            "Wind Speed: ",
                            weatherData.current.wind_kph,
                            " km/h"))))),
            react_1.default.createElement("div", { className: "right-bar" },
                react_1.default.createElement("h3", null, "Today\u2019s Details"),
                weatherData && (react_1.default.createElement("div", { className: "extra-info-card" },
                    react_1.default.createElement("p", null,
                        "Feels Like: ",
                        getTemperature(weatherData.current.feelslike_c),
                        "\u00B0",
                        unitSymbols[unit]),
                    react_1.default.createElement("p", null,
                        "Max Temp: ",
                        getTemperature(weatherData.forecast.forecastday[0].day.maxtemp_c),
                        "\u00B0",
                        unitSymbols[unit]),
                    react_1.default.createElement("p", null,
                        "Min Temp: ",
                        getTemperature(weatherData.forecast.forecastday[0].day.mintemp_c),
                        "\u00B0",
                        unitSymbols[unit]),
                    react_1.default.createElement("p", null,
                        "Chance of Rain: ",
                        weatherData.forecast.forecastday[0].day.daily_chance_of_rain,
                        "%"),
                    react_1.default.createElement("p", null,
                        "Sunrise: ",
                        weatherData.forecast.forecastday[0].astro.sunrise),
                    react_1.default.createElement("p", null,
                        "Sunset: ",
                        weatherData.forecast.forecastday[0].astro.sunset))))),
        weatherData && (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: "gradient-line" }),
            react_1.default.createElement("div", { className: "hourly-forecast-container" },
                react_1.default.createElement("h2", null, "Hourly Forecast"),
                react_1.default.createElement("div", { className: "hourly-forecast" }, weatherData.forecast.forecastday[0].hour.map((hour, index) => (react_1.default.createElement("div", { key: index, className: "hour" },
                    react_1.default.createElement("p", null, new Date(hour.time).toLocaleTimeString([], { hour: 'numeric', hour12: true })),
                    getWeatherIcon(hour.condition),
                    react_1.default.createElement("p", null, hour.condition.text),
                    react_1.default.createElement("p", null,
                        getTemperature(hour.temp_c),
                        "\u00B0",
                        unitSymbols[unit]))))))))));
}
exports.default = Weather;
