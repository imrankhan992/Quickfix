import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useLoadScript,
} from "@react-google-maps/api";
import GoogleMapsLoader from "../../Services/GoogleLoader";
import { useSelector } from "react-redux";
import { useSocketContext } from "@/context/SocketContext";

import pin from "../../../assets/pin.gif";
function AddressGoogleMap({ order, setDistance, setTime, time, distance }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAUI_hqf3GJQ7c80e0rK9aki1fT6kDVuiU", // replace with your actual API key
  });
  const { newOrder } = useSocketContext();
  const { user } = useSelector((state) => state.user);
  const [directions, setDirections] = useState(null);

  const containerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    overflow: "hidden",
  };
  const [markerPosition, setMarkerPosition] = useState(null);
  const geocodeAddress = async (address) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=AIzaSyAUI_hqf3GJQ7c80e0rK9aki1fT6kDVuiU`
    );
    const data = await response.json();
    setMarkerPosition(data.results[0].geometry.location);
  };
  useEffect(() => {
    if (isLoaded && !loadError) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: user?.currentlocation,
          destination: markerPosition,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);

            // Calculate distance and time
            const route = result.routes[0].legs[0];
            setDistance(route.distance.text);
            setTime(route.duration.text);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [user, markerPosition, isLoaded, loadError]);

  useEffect(() => {
    geocodeAddress(order?.address);
  }, [order]);

  const options = useMemo(
    () => ({
      clickableIcons: false,
    }),
    []
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const center = user?.currentlocation || { lat: 48.8584, lng: 2.2945 };
  return (
    <GoogleMapsLoader>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={user?.currentlocation ? 17 : 5}
        options={options}
      >
        <Marker
          position={user?.currentlocation}
          icon={
            window.google?.maps
              ? {
                  url: pin,
                  // scaledSize: new window.google.maps.Size(60, 60),
                }
              : undefined
          }
        />
        <Marker position={markerPosition} />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </GoogleMapsLoader>
  );
}

export default AddressGoogleMap;
