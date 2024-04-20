import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";
import { Input } from "../ui/input";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 48.8584,
  lng: 2.2945,
};

function GoogleMapAddress({ handleChange,touched, setaddress, errors, handleBlur }) {
  const [selectedPlace, setSelectedPlace] = useState(null); // State to store selected place

  const originRef = useRef(null); // Reference to the origin input element

  useEffect(() => {}, []);

  // Event handler for the onPlaceChanged event of the Autocomplete component
  const handlePlaceChanged = () => {
    if (originRef.current) {
      const autocomplete = originRef.current.value; // Get the Autocomplete
      setaddress(autocomplete);
      // if (autocomplete) {
      //   const place = autocomplete.getPlace(); // Get the selected place from the Autocomplete instance
      //   setSelectedPlace(place); // Update the selectedPlace state with the selected place
      // }
    }
  };

  return (
    <>
      <Autocomplete onLoad={() => {}} onPlaceChanged={handlePlaceChanged}>
        <Input
          type="text"
          name="address"
          placeholder="Type your address here"
          ref={originRef}
          onChange={handleChange}
          onBlur={handleBlur}
          id="address"
          className={`arimo text-[16px]  w-full bg-primarycolor focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl ${
            errors?.address && touched?.address ? "border-errorcolor" : ""
          }`}
        />
      </Autocomplete>

      {/* Your Google Map component */}
      <div className="hidden">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {/* Child components, such as markers, info windows, etc. */}
        </GoogleMap>
      </div>
    </>
  );
}

export default GoogleMapAddress;
