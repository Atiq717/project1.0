import React, { useState, useRef, useEffect } from 'react';
import { MapContainer as Map, Marker, TileLayer, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css';
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.min';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster';

const markerIcon = L.ExtraMarkers.icon({
  icon: 'fa-coffee',
  markerColor: 'green',
  shape: 'star',
  prefix: 'fa',
  iconSize: [40, 40],
  iconAnchor: [17, 46],
  popupAnchor: [0, -46],
});

function BasicMap() {
  const [center, setCenter] = useState({ lat: 51.509865, lng: -0.118092 }); // London coordinates
  const ZOOM_LEVEL = 9;
  const mapRef = useRef();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  const fetchMarkers = async (lat, lng) => {
    try {
      const response = await fetch(`fetchMarkers.php?lat=${lat}&lng=${lng}`);
      const data = await response.json();
    } catch (error) {
      console.error('Error fetching markers:', error);
    }
  };

  const handleMapClick = (e) => {
    fetchMarkers(e.latlng.lat, e.latlng.lng);
  };

  return (
    <div>
      <div className="container-fluid">
        <h2 className="text-center">Maps</h2>
        <div className="row">
          <div className="col">
            <div className="map-container">
              <Map
                center={center}
                zoom={ZOOM_LEVEL}
                ref={mapRef}
                style={{ height: '555px', width: '97%' }}
                onClick={handleMapClick}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="© OpenStreetMap contributors"
                />
              </Map>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicMap;
