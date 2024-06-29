import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-markercluster";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-easybutton/src/easy-button.css';
import 'leaflet-easybutton/src/easy-button.js';
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css'; 
import 'leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js'; 
import '../css/MapStyles.css';

const icon = L.ExtraMarkers.icon({
    icon: 'fa-coffee', 
    markerColor: 'green',
    shape: 'circle',
    prefix: 'fa' 
});

const position = [51.505, -0.09];

function ResetCenterView(props) {
    const { selectPostion } = props;
    const map = useMap();

    useEffect(() => {
        if (selectPostion) {
            map.setView(
                L.latLng(selectPostion?.lat, selectPostion?.lon),
                map.getZoom()
            );
            animate: true;
        }
    }, [selectPostion]);
    return null;
}

const customButton = L.easyButton({
    states: [{
        icon: 'fa-globe',
        title: 'Custom Button',
        onClick: () => {
            alert('Custom button clicked!');
        }
    }]
});

function MapB(props) {
    const { selectPostion } = props;
    const locationSelection = [selectPostion?.lat, selectPostion?.lon];

    return (
        <MapContainer
            center={position}
            zoom={9}
            scrollWheelZoom={false}
            className='map-container'
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=H8M9xWwnoZ9DXMtLpX1z"
            />
            {selectPostion && (
                <Marker position={locationSelection} icon={icon}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            )}
            <ResetCenterView selectPostion={selectPostion} />
        </MapContainer>
    );
}

export default MapB;
