import React, { useMemo, useState } from "react";
import { RxCross2 } from "react-icons/rx";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Chip,
  Typography,
  Avatar,
  Badge,
} from "@material-tailwind/react";
import {

  DirectionsRenderer,
  GoogleMap,
  Marker,
 
} from "@react-google-maps/api";
import pin from "../../assets/pin.gif";
import ReactStars from "react-rating-stars-component";
import useMapZooming from "@/Hooks/useMapZooming";


const center = {
  lat: 30.3753,
  lng: 69.3451,
};

function Find({
  currentLocation,
  currentServiceProviders,
  mapTracking,
}) {


  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setdistance] = useState("");
  const [duration, setduration] = useState("");
  const [singleserviceprovider, setsingleserviceprovider] = useState();
  const handleMarkerClick = async (markerPosition) => {
    if (!currentLocation) return;

    const directionsService = new google.maps.DirectionsService();
    const result = await directionsService.route({
      origin: currentLocation,
      destination: markerPosition?.currentlocation,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionResponse(result);
    setdistance(result.routes[0].legs[0].distance.text);
    setduration(result.routes[0].legs[0].duration.text);
  };

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
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const {zoom}=useMapZooming()
 
  return (
    <>
      

      <GoogleMap
        mapContainerClassName=" h-[400px] md:h-full md:w-full"
        center={currentLocation ? currentLocation : center}
        zoom={mapTracking?zoom: 12}
        // zoom={zoom}
        options={options}
      >
        <>
         <Marker
           key="12345A_@67"
            position={currentLocation}
            icon={{
              url: pin,
              scaledSize: new window.google.maps.Size(60, 60),
            }}
          
          />
         
          {currentServiceProviders.length > 0 &&
            currentServiceProviders?.map((serviceProvider) => {
              return (
                <Marker
                  key={serviceProvider?._id}
                  position={serviceProvider?.currentlocation}
                />
              );
            })}

          {currentServiceProviders.length > 0 &&
            currentServiceProviders?.map((serviceProvider) => (
              <Marker
                key={serviceProvider._id}
                position={serviceProvider.currentlocation}
                onClick={() => {
                  handleMarkerClick(serviceProvider);
                }}
                onMouseOver={() => {
                  setIsPopoverOpen(true);
                  setsingleserviceprovider(serviceProvider);
                }}
                onMouseOut={() => {
                  //   setIsPopoverOpen(false);
                  setsingleserviceprovider(serviceProvider);
                }}
              />
            ))}

          {directionResponse && (
            <DirectionsRenderer directions={directionResponse} />
          )}
        </>
      </GoogleMap>
    </>
  );
}

export default Find;
