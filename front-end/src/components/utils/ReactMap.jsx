import React, {useState} from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import axios from "axios";

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

const ReactMap = React.memo(({center, zoom, markers}) => {
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=404414da6e214da3bbe146119f0e465d`;
      const {data} = await axios.get(url);
      const {lat, lng} = data.results[0].geometry;
      setPosition([lat, lng]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MapContainer
      center={{lat: 51.505, lng: -0.09}}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
});

export default ReactMap;
