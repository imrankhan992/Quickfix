import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  Circle,
  LoadScript,
} from "@react-google-maps/api";

import { Skeleton } from "../ui/skeleton";
import { MdEdit, MdModeEdit } from "react-icons/md";

function GoogleMapPage({
  currentLocation,
  setCurrentLocation,
  openmap,
  height,
  width,
  currentaddress,
  setopenmap,
  marker,
  setcurrentCityname,
  setCurrentZipcode
 
}) {
  const containerStyle = {
    width: width,
    height: height,
    borderRadius: "10px",
    overflow: "hidden",
  };
  const [directionResponse, setdirectionResponse] = useState(null);
  const [distance, setdistance] = useState("");
  const [duration, setduration] = useState("");
  const originRef = useRef();
  const destinationRef = useRef();

  const [cityColor, setCityColor] = useState("#ff0000"); // Default color
  
  const libraries = ["places", "maps"]; // Define libraries as a constant
  const [CityName, setCityName] = useState('')
  const [ZipCode, setZipCode] = useState("")
  // Fetch city name and zip code when currentLocation changes
  useEffect(() => {
    if (CityName) {
      setcurrentCityname(CityName)
    }
    if (ZipCode) {
      setCurrentZipcode(ZipCode)
    }
    if (currentLocation) {
      fetchCityDetails();
    }
  }, [currentLocation,CityName,ZipCode]);
// console.log( ZipCode);
const fetchCityDetails = async () => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${currentLocation.lat},${currentLocation.lng}&key=AIzaSyAUI_hqf3GJQ7c80e0rK9aki1fT6kDVuiU`
    );
    const data = await response.json();
    if (data.status === "OK") {
      const result = data.results[0];
      console.log(result); // Log the entire result object to inspect its structure

      const addressComponents = result.address_components;
      const cityComponent = addressComponents.find(
        (component) => component.types.includes("locality")
      );
      const zipComponent = addressComponents.find(
        (component) => component.types.includes("postal_code")
      );

      if (cityComponent) {
        setCityName(cityComponent.long_name);
      }
      if (zipComponent) {
        setZipCode(zipComponent.long_name);
       
      }
    }
  } catch (error) {
    console.error("Error fetching city details:", error);
  }
};






  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAUI_hqf3GJQ7c80e0rK9aki1fT6kDVuiU",
  });

  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);
  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation || { lat: 30.3753, lng: 69.3451 }}
        zoom={currentLocation ? 15 : 5}
        options={options}
      >
        {marker}
        <Marker position={{ lat: 30.3753, lng: 69.3451 }} />
        {!marker && <Marker position={currentLocation} />}
      </GoogleMap>
      {currentLocation && (
        <div className="flex  gap-2 py-2">
          <div className="flex flex-col gap-2">
            <p className="arimo font-bold text-hoverblack">Current Location</p>
            <p className="arimo text-hoverblack">{currentaddress}</p>
          </div>
          {/* edit map */}
          <div className="flex items-center justify-center text-red-900">
            {!openmap && (
              <MdModeEdit
                className={`text-2xl text-red-900 cursor-pointer`}
                onClick={() => setopenmap(true)}
              />
            )}
          </div>
        </div>
      )}
    </>
  ) : (
    <Skeleton />
  );
}

export default GoogleMapPage;
