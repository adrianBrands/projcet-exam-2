import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import * as leaflet from "leaflet";
import "leaflet/dist/images/marker-shadow.png";
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'


export default function Map(props) {
  const {lat, lng} = props;
  return (
    <div className="map">
    <MapContainer style={{ height: "50vh", width: "100%" }} center={[lat, lng]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker className="marker" position={[lat, lng]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
    </div>
  );
}
