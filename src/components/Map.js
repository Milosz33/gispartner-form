import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React from "react";
import "../scss/Map.scss";

export const Map = ({ users }) => {
  console.log(users);

  return (
    <>
      <MapContainer
        style={{ height: "500px", width: "700px" }}
        center={[54, 18]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {users.map((user, i) => (
          <Marker key={i} position={user.geo.slice().reverse()}>
            <Popup>{users[i].name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};
