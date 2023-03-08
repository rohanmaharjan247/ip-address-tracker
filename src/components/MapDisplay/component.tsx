import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useState } from 'react';

const iconLocation = L.icon({
  iconUrl: '/images/icon-location.svg',
});

interface MapDisplayProps {
  lat: number;
  lng: number;
  locationName: string;
}

interface LocationMarkerProps {
  position: L.LatLng;
  locationName: string;
}

const LocationMarker = ({ position, locationName }: LocationMarkerProps) => {
  const map = useMap();

  map.flyTo(position);

  return (
    <Marker position={position} icon={iconLocation}>
      <Popup>{locationName}</Popup>
    </Marker>
  );
};

const MapDisplay = ({ lat, lng, locationName }: MapDisplayProps) => {
  const position = L.latLng(lat, lng);
  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker position={position} locationName={locationName} />
    </MapContainer>
  );
};

export default MapDisplay;
