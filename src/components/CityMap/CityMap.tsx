import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { Map as LeafletMap } from 'leaflet';
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

interface WeatherMapProps {
  lat: number;
  lon: number;
  city: string;
}

const WeatherMap: React.FC<WeatherMapProps> = ({ lat, lon, city }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const mapRef = useRef<LeafletMap | null>(null);

  const handleMapClick = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (isExpanded && mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 200); // delay slightly to ensure DOM updates
    }
  }, [isExpanded]);

  return (
    <div
      className={`weather-map-container ${isExpanded ? 'expanded' : ''}`}
      onClick={handleMapClick}
    >
      <MapContainer
        className="weather-map-iframe"
        center={[lat, lon]}
        zoom={10}
        scrollWheelZoom={false}
        ref={(instance) => {
          if (instance) mapRef.current = instance;
        }}
      >
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
