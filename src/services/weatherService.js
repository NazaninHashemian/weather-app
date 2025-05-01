"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// services/weatherService.js
const axios_1 = __importDefault(require("axios"));
const apiKey = "a9e87d92b47747bf855172142252304";
const location = "Coquitlam";
const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=1&aqi=no&alerts=no`;
const http = axios_1.default.create({
    baseURL: 'https://api.weatherapi.com/v1/'
});
const fetchWeather = (city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get current weather data
        const response = yield http.get(`forecast.json?key=${apiKey}&q=${city}&days=1&aqi=no&alerts=no`);
        return response.data;
    }
    catch (error) {
        // Propagate error for handling in the component
        throw error;
    }
});
exports.default = fetchWeather;
