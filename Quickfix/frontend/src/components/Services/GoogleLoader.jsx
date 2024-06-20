

// GoogleMapsLoader.js
import { memo } from "react";
import { useJsApiLoader } from "@react-google-maps/api";

// Define libraries as a constant variable outside of the component
const libraries = ["places", "maps"];

const GoogleMapsLoader = ({ children }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAUI_hqf3GJQ7c80e0rK9aki1fT6kDVuiU",
    libraries: libraries, // Use the constant libraries
  });

  return isLoaded ? children : "Please wait...";
};

export default memo(GoogleMapsLoader);
