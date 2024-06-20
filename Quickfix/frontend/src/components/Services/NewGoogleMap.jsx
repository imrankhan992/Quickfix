import React, { useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Skeleton } from "../ui/skeleton";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 48.8584,
  lng: 2.2945,
};

function GoogleMapPage() {
  const [directionResponse, setdirectionResponse] = useState(null);
  const [distance, setdistance] = useState("");
  const [duration, setduration] = useState("");
  const originRef = useRef();
  const destinationRef = useRef();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAUI_hqf3GJQ7c80e0rK9aki1fT6kDVuiU",
    libraries: ["places"],
  });
  console.log(originRef?.current?.value);
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    const directionservice = new google.maps.DirectionsService();
    const result = await directionservice.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setdirectionResponse(result);
    setdistance(result.routes[0].legs[0].distance.text);
    setduration(result.routes[0].legs[0].duration.text);
  }
  console.log(directionResponse);
  return isLoaded ? (
    <>
      <Autocomplete>
        <input type="text" placeholder="Origin" ref={originRef} />
      </Autocomplete>
      <Autocomplete>
        <input type="text" placeholder="destination" ref={destinationRef} />
      </Autocomplete>
      <button
        className="bg-red-500 p-2 rounded-xl text-primarycolor arimo"
        onClick={calculateRoute}
      >
        Calculate route
      </button>
      <p>duration : {duration}</p>
      <p>distance : {distance}</p>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <>
          <Marker position={center} />
          {directionResponse && (
            <DirectionsRenderer directions={directionResponse} />
          )}
        </>
      </GoogleMap>
    </>
  ) : (
    <>
      <Skeleton />
    </>
  );
}

export default GoogleMapPage;
