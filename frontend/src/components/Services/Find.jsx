import React, { useEffect, useMemo, useState } from "react";
import { Circle, GoogleMap, Marker, Polygon, useJsApiLoader } from "@react-google-maps/api";
import pin from "../../assets/pin.gif";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 30.3753,
  lng: 69.3451,
};

function Find({ currentLocation, currentServiceProviders ,cityCoordinates}) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAUI_hqf3GJQ7c80e0rK9aki1fT6kDVuiU",
  });

  const [map, setMap] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(
      currentLocation ? currentLocation : center
    );
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
    }),
    []
  );

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation ? currentLocation : center}
        zoom={currentLocation || currentServiceProviders.length > 0 ? 12 : 5}
        options={options}
      >
        <>
          <Marker
            position={currentLocation}
            icon={{
              url: pin,
              scaledSize: new window.google.maps.Size(60, 60),
            }}
          />
          {currentServiceProviders.length > 0 &&
            currentServiceProviders?.map((serviceProvider) => {
              return <Marker key={serviceProvider?._id} position={serviceProvider?.currentlocation} />;
            })}

          {/* Add circle for 5km radius */}
          {/* <Circle
            center={currentLocation ? currentLocation : center}
            radius={5000}
            options={{
            
              strokeOpacity: 0.8,
              strokeWeight: 1,
              fillColor: "#98FB98",
              fillOpacity: 0.35,
            }}
          /> */}
          {/* Add circle for 15km radius */}
          {/* <Circle
            center={currentLocation ? currentLocation : center}
            radius={15000}
            options={{
              strokeColor: "#0000FF",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#4F7942",
              fillOpacity: 0.35,
            }}
          /> */}

          
        </>
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default Find;
