// GoogleMapsLoader.js
import { useJsApiLoader } from "@react-google-maps/api";

const GoogleMapsLoader = ({ children }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAUI_hqf3GJQ7c80e0rK9aki1fT6kDVuiU",
    libraries: ["places", "maps"], // Add all required libraries here
  });

  return isLoaded ? children : null;
};

export default GoogleMapsLoader;
