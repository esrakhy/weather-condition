import React, { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet.offline";
import "leaflet/dist/leaflet.css";
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import { useDispatch } from "../../redux/store";
import { setLatitude, setLongitude } from "../../redux/slices/location";
// ----------------------------------------------------------

export default function OfflineMap() {
  const dispatch = useDispatch();
  const markersRef = useRef(L.layerGroup());
  const [map, setMap] = useState(null);
  const [isMapInitialized, setMapInitialized] = useState(false);
  useEffect(() => {
    if (!isMapInitialized) {
      const mapInstance = L.map('map').setView([38, 33], 5);

      const tileLayerOffline = L.tileLayer.offline(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      );
      tileLayerOffline.addTo(mapInstance);
      markersRef.current.addTo(mapInstance);
      setMap(mapInstance);
      setMapInitialized(true);
    }
  }, [isMapInitialized]);

  useEffect(() => {
    if (map) {
      var blueIcon = L.icon({
        iconUrl: markerIcon
      });
      if (markersRef.current) {
        markersRef.current.clearLayers();
      }

      map.on("click", function (e) {
        markersRef.current.clearLayers();
        var mp = new L.Marker([e.latlng.lat, e.latlng.lng], { icon: blueIcon }).addTo(markersRef.current)
          .openPopup();
        dispatch(setLatitude(mp.getLatLng().lat));
        dispatch(setLongitude(mp.getLatLng().lng));
      });
    }

  }, [map]);

  return (
    <div id="map" style={{ width: "100%", height: "100%" }}></div>
  );
};
