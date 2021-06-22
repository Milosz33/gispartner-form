import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React, { useState, useEffect } from "react";
import "../scss/Map.scss";

export const Map = ({ users }) => {
  //   const [points, setPoints] = useState([]);
  console.log(users);
  //   useEffect(() => {
  //     async function fetchPoints() {
  //       const body = {
  //         reqs: users.map((user) => ({
  //           pkt_numer: user.nr,
  //           pkt_kodPocztowy: user.kod,
  //           ul_pelna: user.ulc,
  //           miejsc_nazwa: user.msc,
  //         })),
  //       };
  //       const response = await fetch(
  //         "https://capap.gugik.gov.pl/api/fts/gc/pkt",
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify(body),
  //         }
  //       ).then((r) => r.json());

  //       const newPoints =
  //         response.single?.map((record) => record.geometry.coordinates) || [];
  //       setPoints(newPoints);
  //     }
  //     fetchPoints();
  //   }, [users]);
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
          <Marker position={user.geo}>
            <Popup>{users[i].name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};
