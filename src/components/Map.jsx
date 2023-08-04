import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import useGeolocation from "../hooks/useGeolocation";
import Button from "../components/Button";
import useUrlPosition from "../hooks/useURLPosition";
function Map() {
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  const {isLoading:isLoadingPosition,position:geolocationPosition,getPosition}=useGeolocation();
  const[mapLat,mapLng]=useUrlPosition();
  //Storing last render
  useEffect(function () {
    if (mapLat && mapLng)
      setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng])
  useEffect(function(){
    if(geolocationPosition)
    setMapPosition([geolocationPosition.lat,geolocationPosition.lng])
  },[geolocationPosition])
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition&&<Button type="position" onClick={getPosition}>
        {isLoadingPosition?"..Loading":"Use your position"}
      </Button>}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">carto.com</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
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
