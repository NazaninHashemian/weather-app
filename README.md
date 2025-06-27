🌦️ React Weather Forecast App
A professional, real-time weather application built with React and TypeScript, delivering accurate, location-based weather updates with a clean and responsive UI. The app uses the OpenWeatherMap API and offers dynamic visuals, interactive charts, and a smooth user experience across devices.

🔗 Live Demo – Try it now
https://nazaninhashemian.github.io/weather-app

✨ Features
🔍 City Search: Look up current weather by typing any city name.

📍 Geolocation: Automatically detects and shows the weather for the user's current location.

📊 Hourly Temperature Chart: Displays today’s hourly forecast with an interactive line chart using Recharts.

🗓️ 3-Day Forecast: View weather data for today, tomorrow, and the day after (up to 72 hours).

🌅 Dynamic Backgrounds: Changes based on weather condition and time (day/night).

🗺️ Interactive Map: Displays the city location using Leaflet.

🕒 Real-Time Data: Live temperature, humidity, weather condition, and wind speed.

🧠 Search History: Previously searched cities are saved in local storage.

♿ Accessibility: Includes ARIA labels and semantic HTML for screen readers.

🧩 Modular Architecture: Clean, reusable components and utility functions.

📱 Responsive Design: Fully functional on mobile, tablet, and desktop.

🛠 Technologies Used
React (w/ Hooks)

TypeScript

Axios

OpenWeatherMap API

Recharts (for data visualization)

Leaflet.js (for maps)

HTML5 & CSS3

Local Storage

Browser Geolocation API


🚀 Installation
Clone this repository:

git clone https://github.com/nazaninhashemian/weather-app.git
Navigate to the project directory:

cd weather-app
Install dependencies:

npm install
Start the app:

npm start
Open your browser and go to:

http://localhost:3000
🧩 Folder Structure Highlights
components/: Modular UI components like WeatherCard, SearchBar, and ForecastChart.

utils/: Utility functions for date formatting, API handling, and condition mapping.

assets/: Dynamic images for background rendering.

styles/: Centralized styling files and responsive design helpers.

