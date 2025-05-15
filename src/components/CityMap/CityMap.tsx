import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './CityMap.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// 🌍 Reusable weather map component
interface WeatherMapProps {
  lat: number;
  lon: number;
  city: string;
}

const WeatherMap: React.FC<WeatherMapProps> = ({ lat, lon, city }) => {
  return (
    <div className="weather-map-container">
        <MapContainer className='weather-map-iframe' center={[lat, lon]} zoom={10} scrollWheelZoom={false} >
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
            <Popup>
            Weather location: <strong>{city}</strong>
            </Popup>
        </Marker>
        </MapContainer>
    </div>
  );
};

export default WeatherMap;
