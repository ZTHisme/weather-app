import React from 'react'
import { useEffect, useRef } from 'react';
import L from "leaflet";
import '../../node_modules/leaflet/dist/leaflet.css';

const today = ({lat, long}) => {
	const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current, {
      center: [lat, long],
      zoom: 7,
      layers: [
        L.tileLayer(
          "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        ),
      ],
    }).setView([lat, long], 8);

    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    const Temp = L.tileLayer(
      "https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid={API_KEY}",
      {
        API_KEY: "2830c4d36ba561f3686be621be9a0be4",
      }
    ),
    Precipitation = L.tileLayer(
      "https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid={API_KEY}",
      {
        API_KEY: "2830c4d36ba561f3686be621be9a0be4",
      }
    ),
    Wind = L.tileLayer(
      "https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid={API_KEY}",
      {
        API_KEY: "2830c4d36ba561f3686be621be9a0be4",
      }
    ),
    Pressure = L.tileLayer(
      "https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid={API_KEY}",
      {
        API_KEY: "2830c4d36ba561f3686be621be9a0be4",
      }
    ),
    Clouds = L.tileLayer(
      "https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid={API_KEY}",
      {
        API_KEY: "2830c4d36ba561f3686be621be9a0be4",
      }
    )
    Temp.addTo(map);

    var overlays = {
      Temperature: Temp,
      Precipitation: Precipitation,
      Clouds: Clouds,
      Pressure: Pressure,
      Wind: Wind
    };
    L.control.layers(overlays, null, { collapsed: false }).addTo(map);
    return () => {
      map.remove();
    };
  }, [lat, long]);

  return (
    <div className="weather-map-blk">
        <h2>PRECIPITATION MAP</h2>
      <div className="weather-map">
        <div
          ref={mapRef}
          className="weather-map-size"
        />
      </div>
    </div>
  );
}

export default today