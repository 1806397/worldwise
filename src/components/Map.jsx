import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [searchParams] = useSearchParams();
  const { cities } = useCities();
  const mapLat = searchParams.get("lat") || 40;
  const mapLng = searchParams.get("lng") || 0;
  //Storing last render
  useEffect(function () {
    if (mapLat && mapLng)
      setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng])
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={[mapPosition[0] || 40, mapPosition[1] || 0]} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
//Changing position on map on clicking for specific location
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position, 6);
  return null;
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })

}
export default Map;
