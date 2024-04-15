import React, { useEffect, useMemo, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";

import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Chip,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import {
  Circle,
  DirectionsRenderer,
  GoogleMap,
  Marker,
  Polygon,
  useJsApiLoader,
} from "@react-google-maps/api";
import pin from "../../assets/pin.gif";
import ReactStars  from 'react-rating-stars-component';

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 30.3753,
  lng: 69.3451,
};

function Find({ currentLocation, currentServiceProviders, cityCoordinates }) {
  const [openPopover, setOpenPopover] = useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };
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
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return isLoaded ? (
    <>
      <div className=" relative ">
        <Popover open={isPopoverOpen} handler={setIsPopoverOpen}>
          <PopoverHandler>
            <Button className="hidden"></Button>
          </PopoverHandler>
          <PopoverContent className="ml-[36rem]  z-50 max-w-[26rem]  ">
            <RxCross2
              onClick={() => {
                setIsPopoverOpen(false);
              }}
              className="absolute cursor-pointer right-4  text-xl top-2 border-hoverblack rounded-full border mb-2 text-hoverblack "
            />
            <div className="mb-2 flex items-center justify-between gap-4 mt-2">
              <Avatar
                size="md"
                variant="circular"
                src={singleserviceprovider?.avatar?.url}
                alt="tania andrew"
              />
              <Button
                variant="gradient"
                size="sm"
                className="font-medium capitalize"
              >
                Contact Me
              </Button>
            </div>
            <div className="mb-2 flex items-center gap-3">
              <Typography className="font-bold transition-colors border-none text-hoverblack">
                {singleserviceprovider?.firstname +
                  " " +
                  singleserviceprovider?.lastname}
              </Typography>
              <Chip
                value="Public"
                className="rounded-full px-2 py-1 font-medium capitalize tracking-wide"
              />
            </div>
            <Typography
              variant="small"
              color="gray"
              className="font-normal text-blue-gray-500"
            >
              @material-tailwind is an easy-to-use components library for
              Tailwind CSS and Material Design.
            </Typography>
            <div className="mt-4 flex items-center gap-5">
              <div className="flex items-center gap-1">
                <span className="h-3 w-3 rounded-full bg-blue-700" />
                <Typography
                  color="gray"
                  className="text-xs font-medium text-blue-gray-500"
                >
                  TypeScript
                </Typography>
              </div>
              <div className="flex items-center gap-1">
              <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={20}
                      activeColor="#ffd700"
                      edit={false}
                      value={3.3}
                      half={true}
                    />
                <Typography
                  color="gray"
                  className="text-xs font-medium text-blue-gray-500"
                >
                  1,480
                </Typography>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-mt-px h-4 w-4 text-green-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>
                <Typography
                  color="gray"
                  className="text-xs font-medium text-blue-gray-500"
                >
                  Verified
                </Typography>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

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
  ) : (
    <></>
  );
}

export default Find;
