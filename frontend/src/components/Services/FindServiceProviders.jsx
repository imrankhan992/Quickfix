import React, { useEffect, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";

import BadgeOutline from "./BadgeOutline";
import Find from "./Find";
import "./FindServiceProvider.css";
import axiosInstance from "@/ulities/axios";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { ImagePlacehoderSkeleton } from "./ImagePlaceHolderSkeleton";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Badge,
  ButtonGroup,
  Button,
  Switch,
} from "@material-tailwind/react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ChangePriceDialog from "./ChangePriceDialog";
import PickTotalServie from "./PickTotalServie";
import GoogleMapAddress from "./GoogleMap";
import GoogleMapsLoader from "./GoogleLoader";
import { setDate } from "date-fns";
import { useFormik } from "formik";
import { FindServiceProvidersSchema } from "@/Schemas";
import { MdOutlineErrorOutline } from "react-icons/md";

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
  const [loadingserviceproviders, setloadingserviceproviders] = useState(false);
  const [sucess, setsucess] = useState("");
  // ordering states
  const [price, setprice] = useState(0);
  const [totalnumber, settotalnumber] = useState(1);
  const [newprice, setnewprice] = useState(0);
  const [recommendedprice, setrecommendedprice] = useState(1);
  const [dateandtime, setdateandtime] = useState("");
  const [address, setaddress] = useState("");
  const { id } = useParams();

  const {
    values,
    handleBlur,
    handleChange,
    handleClick,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      price: "",
      dateandtime: "",
      address: "",
      quantity: "",
    },
    validationSchema: FindServiceProvidersSchema,
    onSubmit: async (values, { setSubmitting }) => {},
  });
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

    if (currentLocation && CityName && currentservice) {
      getallserviceProvidersnearMe();
    }
    if (totalnumber) {
      setnewprice(totalnumber * price);
    }
    if (totalnumber <= 0) {
      settotalnumber(1);
    }

    if (address || dateandtime || newprice || totalnumber) {
      setFieldValue("price", newprice);
      setFieldValue("dateandtime", dateandtime);
      setFieldValue("address", address);
      setFieldValue("quantity", totalnumber);
    }
  }, [
    currentLocation,
    CityName,
    currentservice?.category?._id,
    totalnumber,
    recommendedprice,
    address,
    dateandtime,
    newprice,
  ]);
  useEffect(() => {
    getCurrentService();
  }, []);

  //   get address using co ordinates
  // console.log(currentservice?.category);
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
  console.log(price);
  //   get current service from backend by using id

  const getCurrentService = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/single-service/${id}`);
      setcurrentservice(data?.service);
      setprice(data?.service?.price);
      setnewprice(data?.service?.price);
      localStorage.setItem("currentService", JSON.stringify(data.service));
    } catch (error) {
      console.log(error);
    }
  };

  //   get all service provider based on location
  const getallserviceProvidersnearMe = async () => {
    try {
      setloadingserviceproviders(true);
      const { data } = await axiosInstance.post(
        "/api/v1/find-serviceproviders/nearme",
        {
          city: CityName,
          currentLocation,
          job: currentservice?.category?._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data?.success) {
        setloadingserviceproviders(false);
        setcurrentServiceProviders(data.serviceProviders);
        setsucess(data?.length === 0 && "show");
        if (data?.serviceProviders?.length >= 1) {
          setsucess("hide skeleton");
        }
      }
      if (!data?.success) {
        setloadingserviceproviders(false);
        setcurrentServiceProviders(data.serviceProviders);
        setsucess("not show");
      }
    } catch (error) {
      console.log(error);
      setloadingserviceproviders(false);
    }
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  let recommendedPrice = [];
  if (currentservice) {
    for (let i = 1; i <= 5; i++) {
      recommendedPrice.push(currentservice?.price + i * 20);
    }
  }

  const formatLastActive = (lastActive) => {
    const currentTime = new Date();
    const lastActiveTime = new Date(lastActive);
    const timeDifference = Math.abs(currentTime - lastActiveTime); // Difference in milliseconds

    const secondsDifference = Math.floor(timeDifference / 1000);
    const minutesDifference = Math.floor(secondsDifference / 60);
    const hoursDifference = Math.floor(minutesDifference / 60);
    const daysDifference = Math.floor(hoursDifference / 24);

    if (daysDifference > 0) {
      return `${daysDifference} day${daysDifference > 1 ? "s" : ""} ago`;
    } else if (hoursDifference > 0) {
      return `${hoursDifference} hour${hoursDifference > 1 ? "s" : ""} ago`;
    } else if (minutesDifference > 0) {
      return `${minutesDifference} minute${
        minutesDifference > 1 ? "s" : ""
      } ago`;
    } else {
      return "Just now";
    }
  };
  console.log(values);
  console.log(errors);
  return (
    <div className="grid grid-cols-8 ">
      <form
        onSubmit={handleSubmit}
        className="bg-cardbg h-screen flex sticky top-0 flex-col col-span-2 gap-3 p-4 overflow-auto"
      >
        <h3 className="p-2 rounded-xl arimo text-[18px] font-bold mt-3 bg-buttoncolor">
          {currentservice?.category?.category}
        </h3>
        <h3 className="arimo text-[18px] font-bold underline">Title:</h3>
        {/* <h3 className=" arimo text-[16px] font-bold text-gray-500">
          {currentservice?.title}
        </h3> */}

        <div>
          <Card
            shadow={false}
            className="relative grid h-[6rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
          >
            <CardHeader
              floated={false}
              shadow={false}
              color="transparent"
              className={`absolute inset-0 m-0 h-full w-full rounded-none bg-cover bg-center`}
              style={{
                backgroundImage: `url(${currentservice?.picture?.url}), url('/path/to/fallback-image.jpg')`,
              }}
            >
              <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
            </CardHeader>
            <CardBody className="relative  px-6 md:px-12">
              <Typography
                variant="h5"
                color="white"
                className="mb-6 font-medium arimo leading-[1.5]"
              >
                {currentservice?.title}
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col ">
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-3 items-center ">
                <h3 className="text-2xl">PKR</h3>
                <h3 className="text-3xl font-bold">{newprice}</h3>
              </div>
              <ChangePriceDialog
                newprice={newprice}
                currentservice={currentservice}
                price={price}
                setprice={setprice}
                totalnumber={totalnumber}
                setnewprice={setnewprice}
              />
            </div>

            <div className="flex gap-2 justify-between">
              {recommendedPrice?.length > 0 &&
                recommendedPrice?.map((element) => {
                  return (
                    <>
                      <p
                        className="bg-buttoncolor p-2 rounded-[4px] cursor-pointer"
                        onClick={() => {
                          setnewprice(element * totalnumber);
                          setprice(element);
                        }}
                      >
                        {element}
                      </p>
                    </>
                  );
                })}

              {recommendedPrice?.length === 0 && (
                <div className="max-w-full animate-pulse">
                  <Typography
                    as="div"
                    variant="h1"
                    className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                  ></Typography>
                </div>
              )}
            </div>
            <Label
              htmlFor="hellopassword"
              className="font-normal text-[14px] arimo text-hoverblack"
            >
              You can change the recommended Price
            </Label>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-between">
              {" "}
              <h3 className="text-[1rem]">
                Total number of {currentservice?.title}
              </h3>
              <h3 className="text-3xl font-bold">{totalnumber}</h3>
            </div>
            <PickTotalServie
              price={price}
              setprice={setprice}
              totalnumber={totalnumber}
              settotalnumber={settotalnumber}
              currentservice={currentservice}
              setnewprice={setnewprice}
            />
          </div>
          {/* location */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="address"
              className="arimo text-[18px] font-bold underline text-hoverblack"
            >
              Your Address:
            </Label>
            <div className="flex justify-end">
              <p className="text-sm cursor-pointer">Pick my current location</p>
            </div>
            <div>
              <GoogleMapsLoader>
                <GoogleMapAddress
                  handleChange={handleChange}
                  touched={touched}
                  handleBlur={handleBlur}
                  errors={errors}
                  setaddress={setaddress}
                />
              </GoogleMapsLoader>
              <div className="flex gap-2 items-center ">
                {errors?.address && touched?.address ? (
                  <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem] arimo">
                    <MdOutlineErrorOutline className="text-xl" />
                    {errors?.address}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {/* date and time */}
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="dateandtime"
              className="arimo text-[18px] font-bold underline text-hoverblack"
            >
              Select Date and Time:
            </Label>
            <div className="w-full">
              <Input
                type="datetime-local"
                id="dateandtime"
                name="dateandtime"
                onBlur={handleBlur}
                onChange={handleChange}
                className={`arimo text-[16px]  w-full bg-primarycolor focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl ${
                  errors?.dateandtime && touched?.dateandtime ? "border-errorcolor" : ""
                }`}
              />
              <div className="flex gap-2 items-center ">
                {errors?.dateandtime && touched?.dateandtime ? (
                  <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem] arimo">
                    <MdOutlineErrorOutline className="text-xl" />
                    {errors?.dateandtime}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {/* find */}
          <Switch
            label={
              <div className="ml-4">
                <Typography color="blue-gray" className="arimo font-semibold">
                  Automatically accept the nearest{" "}
                  {currentservice?.category?.category} for PKR {newprice}
                </Typography>
              </div>
            }
            containerProps={{
              className: "-mt-5 ",
            }}
          />

          <div>
            <Button
              type="submit"
              className="w-full bg-buttoncolor text-hoverblack arimo text-[16px] capitalize rounded-xl"
            >
              Find {currentservice?.category?.category}
            </Button>
          </div>
        </div>
        {/*  */}
      </form>
      <main className="w-full col-span-4 relative">
        <GoogleMapsLoader>
          <Find
            currentLocation={currentLocation}
            currentServiceProviders={currentServiceProviders}
            cityCoordinates={cityCoordinates}
          />
        </GoogleMapsLoader>
      </main>
      <aside className="overflow-auto h-screen  col-span-2 gap-4 px-3 bg-cardbg sticky top-0 flex flex-col py-4">
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
        {!loadingserviceproviders &&
          currentServiceProviders?.map((serviceprovider) => {
            return (
              <div className="flex items-center gap-2 justify-between bg-primarycolor px-3 py-1 rounded-[6px] shadow-md">
                <div className="flex gap-3 items-center justify-center">
                  <Badge
                    overlap="circular"
                    color={`${
                      serviceprovider?.activeStatus === "Offline"
                        ? "red"
                        : "green"
                    }`}
                    className={``}
                  >
                    <Avatar
                      src={serviceprovider?.avatar?.url}
                      alt="Photo by Drew Beamer"
                      className={`object-cover rounded-full w-14 h-14 border-2 ${
                        serviceprovider?.activeStatus === "Online"
                          ? "border-online"
                          : "border-offline"
                      }`}
                    />
                  </Badge>
                  <div>
                    <p className="arimo ">
                      {serviceprovider?.firstname +
                        " " +
                        serviceprovider?.lastname}
                    </p>
                    <p className="arimo text-[12px]">
                      active{" "}
                      {serviceprovider?.activeStatus === "Offline" &&
                        formatLastActive(serviceprovider?.lastActive)}
                    </p>{" "}
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
                  <BadgeOutline
                    status={
                      serviceprovider?.activeStatus === "Online"
                        ? "Online"
                        : "Offline"
                    }
                    color={`${
                      serviceprovider?.activeStatus === "Offline"
                        ? "bg-offline"
                        : "bg-online"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        {/*if not service provider found then display not found  */}
        {sucess === "show" && (
          <p className="text-red-500">No service providers found</p>
        )}
        {currentServiceProviders?.length <= 0 && (
          <div className={sucess === "show" ? "hidden" : ""}>
            <ImagePlacehoderSkeleton />
          </div>
        )}
      </aside>
    </div>
  );
};

export default FindServiceProviders;
