import React, { useEffect, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Avatar, Badge } from "@material-tailwind/react";
import BadgeOutline from "./BadgeOutline";
import Find from "./Find";
import { Typography } from "@material-tailwind/react";
import axiosInstance from "@/ulities/axios";
import { useParams } from "react-router-dom";
import ReactStars  from 'react-rating-stars-component';

const FindServiceProviders = () => {
  const [cityCoordinates, setCityCoordinates] = useState();
  async function getCityBoundaryCoordinates(location) {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location?.lat},${location?.lng}&result_type=administrative_area_level_1&key=AIzaSyAUI_hqf3GJQ7c80e0rK9aki1fT6kDVuiU`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const viewport = data.results[0].geometry.viewport;
        const boundaryCoordinates = [
          { lat: viewport.northeast.lat, lng: viewport.northeast.lng },
          { lat: viewport.southwest.lat, lng: viewport.northeast.lng },
          { lat: viewport.southwest.lat, lng: viewport.southwest.lng },
          { lat: viewport.northeast.lat, lng: viewport.southwest.lng },
          { lat: viewport.northeast.lat, lng: viewport.northeast.lng },
        ];
        return boundaryCoordinates;
      } else {
        console.error("No results found for reverse geocoding");
        return null;
      }
    } catch (error) {
      console.error("Error fetching city boundary coordinates:", error);
      return null;
    }
  }

  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentaddress, setcurrentaddress] = useState("");
  const [CityName, setCityName] = useState("");
  const [ZipCode, setZipCode] = useState("");
  const [currentservice, setcurrentservice] = useState(null);
  const [currentServiceProviders, setcurrentServiceProviders] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (currentLocation === null) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            // Reverse geocode the coordinates to get the address
            fetchAddressFromCoordinates({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Error getting current location:", error);
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    if (currentLocation) {
      // Fetch city boundary coordinates using reverse geocoding
      getCityBoundaryCoordinates(currentLocation)
        .then((coordinates) => {
          setCityCoordinates(coordinates);
        })
        .catch((error) => {
          console.error("Error fetching city coordinates:", error);
        });
    }

    // send service id and currentlocation
    getCurrentService();
    if (currentLocation && CityName && currentservice?.category?.category) {
      getallserviceProvidersnearMe();
    }
  }, [currentLocation, CityName]);
  //   get address using co ordinates

  const fetchAddressFromCoordinates = async ({ lat, lng }) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAUI_hqf3GJQ7c80e0rK9aki1fT6kDVuiU`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;

        setcurrentaddress(formattedAddress);
      }
      if (data.status === "OK") {
        const result = data.results[0];

        const addressComponents = result.address_components;
        const cityComponent = addressComponents.find((component) =>
          component.types.includes("locality")
        );
        const zipComponent = addressComponents.find((component) =>
          component.types.includes("postal_code")
        );

        if (cityComponent) {
          setCityName(cityComponent.long_name);
        }
        if (zipComponent) {
          setZipCode(zipComponent.long_name);
        }
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  //   get current service from backend by using id

  const getCurrentService = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/single-service/${id}`);
      setcurrentservice(data.service);
      localStorage.setItem("currentService", JSON.stringify(data.service));
    } catch (error) {
      console.log(error);
    }
  };

  //   get all service provider based on location
  const getallserviceProvidersnearMe = async () => {
    try {
      const { data } = await axiosInstance.post(
        "/api/v1/find-serviceproviders/nearme",
        {
          city: CityName,
          currentLocation,
          job: currentservice?.category?.category,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setcurrentServiceProviders(data.serviceProviders);
    } catch (error) {
      console.log(error);
    }
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <div className="grid grid-cols-8 ">
      <div className="bg-cardbg min-h-screen flex flex-col col-span-2 gap-3 px-4 ">
        <h3 className="pt-4 arimo text-[18px] font-bold">Carpainter</h3>

        {CityName ? (
          <>
            <h3 className=" arimo text-[16px] ">Location: {CityName}</h3>
          </>
        ) : (
          <>
            <div className="max-w-full animate-pulse">
              <Typography
                as="div"
                variant="h1"
                className="mb-4 h-3 w-56 rounded-full bg-gray-300"
              ></Typography>
            </div>
          </>
        )}
        {currentServiceProviders?.map((serviceprovider) => {
          return (
            <div className="flex items-center gap-2 justify-between bg-primarycolor px-4 py-1 rounded-[6px] shadow-md">
              <div className="flex gap-3 items-center justify-center">
                <Badge overlap="circular" color="green" className="">
                  <Avatar
                    src={serviceprovider?.avatar?.url}
                    alt="Photo by Drew Beamer"
                    className="object-cover rounded-full w-14 h-14 border-2 border-[#29B40B]"
                  />
                </Badge>
                <div>
                  <p className="arimo ">
                    {serviceprovider?.firstname +
                      " " +
                      serviceprovider?.lastname}
                  </p>
                  <p className="arimo text-sm">Active 2 hour ago</p>
                  <div className="flex justify-between items-center ">
                  <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={20}
                      activeColor="#ffd700"
                      edit={false}
                      value={3.3}
                      half={true}
                    />
                    <p className="arimo text-[13px]">3.4</p>
                  </div>
                </div>
              </div>

              <div>
                <BadgeOutline status={"Online"} color="text-green-600" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="col-span-6">
        <Find
          currentLocation={currentLocation}
          currentServiceProviders={currentServiceProviders}
          cityCoordinates={cityCoordinates}
        />
      </div>
    </div>
  );
};

export default FindServiceProviders;
