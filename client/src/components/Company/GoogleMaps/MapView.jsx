import React, { useEffect, useState } from "react";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "google-maps-react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 5rem;
  margin-right: 5rem;
`;

function MapView({google,userLocation}) {
  const [origin, setOrigin] = useState(userLocation);
  const [destination, setDestination] = useState({
    lat: 37.7749,
    lng: -122.5194,
  });
  const [waypoints, setWaypoints] = useState([
    { location: "San Francisco, CA" },
    { location: "San Jose, CA" },
  ]);
  const [directions, setDirections] = useState(null);

  const onReady = (result) => {
    setDirections(result);
  };

  useEffect(() => {
    setOrigin(userLocation);
  }, [userLocation]);

  return (
    <Map google={google} zoom={14} initialCenter={origin}>
      {origin && <Marker position={origin} />}
      <Marker position={destination} />

      {waypoints.map((waypoint, index) => (
        <Marker key={index} position={waypoint.location} />
      ))}

      {waypoints.length > 0 && (
        <DirectionsService
          options={{
            origin,
            destination,
            waypoints,
            travelMode: "DRIVING",
          }}
          callback={onReady}
        />
      )}

      {directions && <DirectionsRenderer directions={directions} />}
    </Map>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAyiYqBDkr0lyLYEGwQO2blfW8-0_NFJeI",
})(MapView);
