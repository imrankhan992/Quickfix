import React, { useEffect, useState } from "react";

import BadgeOutline from "./BadgeOutline";
import Find from "./Find";
import "./FindServiceProvider.css";
import axiosInstance from "@/ulities/axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { ImagePlacehoderSkeleton } from "./ImagePlaceHolderSkeleton";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Badge,
  Button,
  Switch,
} from "@material-tailwind/react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ChangePriceDialog from "./ChangePriceDialog";
import PickTotalServie from "./PickTotalServie";

import GoogleMapsLoader from "./GoogleLoader";
import { setDate } from "date-fns";
import { useFormik } from "formik";
import { FindServiceProvidersSchema } from "@/Schemas";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useSocketContext } from "@/context/SocketContext";
import { useSelector } from "react-redux";
import useSendOrder from "@/Hooks/useSendOrder";
import { FindingServiceProviders } from "../Drawer/FindingServiceProviders.";
import GetAddressMap from "./GetAddressMap";
import useTrackPrice from "@/Hooks/useTrackPrice";
import useDeleteOrder from "@/Hooks/useDeleteOrder";
import { errorToast, showtoast } from "@/Toast/Toast";

const FindServiceProviders = () => {
  const formatRating = (rating) => {
    return parseFloat(rating).toFixed(1);
  };
  const getMinDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  const options = {
    value: 0,
    readOnly: true,
    precision: 0.5,
    edit: false,
    size: window.innerWidth < 600 ? 15 : 22,
    isHalf: true,
  };

  // formate date
  const formateDate = (date) => {
    //  I WANT TO GET live counter that how many time remaining in order expire
    const newDate = new Date(date);
    return newDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };
  const { deleteOrder, sendOrderLoading } = useDeleteOrder();
  const { socket, newOrder, onlineUsers, orderExpiresTime,expiresOrderId } =
    useSocketContext();

  const { sendOrder, loading, mapTracking, setMapTracking } = useSendOrder();
  const { user } = useSelector((state) => state.user);
  onlineUsers.includes(user?._id);

  const [currentLocation, setCurrentLocation] = useState(null);
  console.log(currentLocation, "this is my current location");

  const [currentaddress, setcurrentaddress] = useState("");
  const [CityName, setCityName] = useState("");
  const [ZipCode, setZipCode] = useState("");
  const [currentservice, setcurrentservice] = useState(null);
  const [currentServiceProviders, setcurrentServiceProviders] = useState([]);
  const [loadingserviceproviders, setloadingserviceproviders] = useState(false);
  const [sucess, setsucess] = useState("");
  // ordering states

  const [dateandtime, setdateandtime] = useState("");
  const [address, setaddress] = useState("");

  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const total = useTrackPrice(quantity, price);

  const [orderExpiresDateAndTime, setOrderExpiresDateAndTime] = useState();

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
      clientId: "",
      serviceId: "",
      CityName: "Abbottabad",
      currentService: "",
      category: "",
      // 5 time to expire the order
      orderExpiresAt: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
    },
    validationSchema: FindServiceProvidersSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await sendOrder(values);
    },
  });
const navigate = useNavigate()
  const handleOrderExpires = async (e) => {
    e.preventDefault();
    if (orderExpiresDateAndTime === "") {
      return errorToast("Please select the expire time");
    }
    try {
      const { data } = await axiosInstance.put("/api/v1/order/expire-time", { orderExpiresDateAndTime, expiresOrderId });
      if (data.success) {
        showtoast(data?.message);
        navigate("")
      }
    } catch (error) {
      errorToast(error?.response?.data?.message || "An error occurred");
    }
  };
  

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

    // send service id and currentlocation

    if (currentLocation && CityName && currentservice) {
      getallserviceProvidersnearMe();
    }
  }, [currentLocation, CityName, currentservice]);

  useEffect(() => {
    if (address) {
      setFieldValue("address", address);
    }

    if (dateandtime) {
      setFieldValue("dateandtime", dateandtime);
    }

    if (user?._id) {
      setFieldValue("clientId", user?._id);
    }

    if (CityName) {
      setFieldValue("CityName", CityName);
    }
  }, [address, CityName]);

  useEffect(() => {
    getCurrentService();
    if (currentservice?.category?._id) {
      setFieldValue("category", currentservice?.category?._id);
    }
    if (currentservice?._id) {
      setFieldValue("serviceId", currentservice?._id);
    }
    if (currentservice?.category) {
      setFieldValue("currentService", currentservice?.category?._id);
    }
  }, []);

  // set price use effect
  useEffect(() => {
    setFieldValue("price", total);
    setFieldValue("quantity", quantity);
  }, [total, quantity, price]);

  //   get address using co ordinates
  // console.log(currentservice?.category?.category);
  const fetchAddressFromCoordinates = async ({ lat, lng }) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAUI_hqf3GJQ7c80e0rK9aki1fT6kDVuiU`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        console.log("formattedAddress this is", formattedAddress);
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

  const PickMyCurrentLocationAddress = async ({ lat, lng }) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAUI_hqf3GJQ7c80e0rK9aki1fT6kDVuiU`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        const formattedAddress = data.results[0].formatted_address;
        console.log("this  picLocationAddress", formattedAddress);
        setFieldValue("address", formattedAddress);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  //   get current service from backend by using id

  const getCurrentService = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/single-service/${id}`);
      setcurrentservice(data?.service);
      setPrice(data?.service?.price);
      setFieldValue("category", data?.service?.category?._id);
      setFieldValue("serviceId", data?.service?._id);
      setFieldValue("currentService", data?.service?.category?._id);
      // setnewprice(data?.service?.price);
      localStorage.setItem("currentService", JSON.stringify(data.service));
    } catch (error) {
      console.log(error);
    }
  };

  //   get all service provider based on location
  const getallserviceProvidersnearMe = async () => {
    try {
      setloadingserviceproviders(true);
      console.log("near by services run start");
      const { data } = await axiosInstance.post(
        "/api/v1/find-serviceproviders/nearme",
        {
          city: CityName,
          currentLocation,
          job: currentservice?.category?._id,
        }
      );
      if (data?.success) {
        setloadingserviceproviders(false);
        setcurrentServiceProviders(data?.serviceProviders);
        setsucess(data?.length === 0 && "show");
        if (data?.serviceProviders?.length >= 1) {
          setsucess("hide skeleton");
        }
      }
      if (!data?.success) {
        setloadingserviceproviders(false);

        setsucess("not show");
      }
    } catch (error) {
      console.log(error);
      setloadingserviceproviders(false);
    }
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
  return (
    <div className="grid md:grid-cols-8 ">
      {!mapTracking && (
        <form
          onSubmit={handleSubmit}
          className="bg-cardbg order-2 md:order-none h-screen flex sticky top-0 flex-col col-span-2 gap-3 p-4 overflow-auto"
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
                  <h3 className="text-3xl font-bold">{total}</h3>
                </div>
                <ChangePriceDialog
                  currentservice={currentservice}
                  price={price}
                  setPrice={setPrice}
                />
              </div>

              <div className="flex gap-2 justify-between">
                {recommendedPrice?.length > 0 &&
                  recommendedPrice?.map((element, index) => {
                    return (
                      <>
                        <p
                          key={index}
                          className="bg-buttoncolor p-2 rounded-[4px] cursor-pointer"
                          onClick={() => {
                            setPrice(element);
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
                <h3 className="text-3xl font-bold">{quantity}</h3>
              </div>
              <PickTotalServie
                currentservice={currentservice}
                quantity={quantity}
                setQuantity={setQuantity}
                setPrice={setPrice}
                price={price}
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
              <div
                className="flex justify-end"
                onClick={() => {
                  PickMyCurrentLocationAddress({
                    lat: currentLocation?.lat,
                    lng: currentLocation?.lng,
                  });
                }}
              ></div>
              <div>
                <GetAddressMap
                  handleChange={handleChange}
                  touched={touched}
                  handleBlur={handleBlur}
                  errors={errors}
                  setaddress={setaddress}
                  address={address}
                />

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
                  min={getMinDateTime()}
                  className={`arimo text-[16px] w-full bg-primarycolor focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl ${
                    errors?.dateandtime && touched?.dateandtime
                      ? "border-errorcolor"
                      : ""
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

            <div>
              <Button
                type="submit"
                className="w-full bg-buttoncolor text-hoverblack arimo text-[16px] capitalize rounded-xl"
              >
                Find {currentservice?.category?.category}
              </Button>
              {/* <FindingServiceProviders
              currentservice={currentservice}
              loading={loading}
              errors={errors}
            /> */}
            </div>
          </div>
          {/*  */}
        </form>
      )}

      {mapTracking && (
        <Card className="bg-cardbg md:order-none order-2 h-screen flex sticky top-0 flex-col col-span-2 gap-3 p-4 overflow-auto">
          <div className="flex flex-col gap-2">
            <div className="w-full flex flex-col gap-3 items-center justify-center">
              {!sendOrderLoading && (
                <Button
                  onClick={() => {
                    deleteOrder();
                  }}
                  type="submit"
                  className="w-full bg-cardbg text-errorcolor  arimo text-[16px] capitalize rounded-xl"
                >
                  Cancel request
                </Button>
              )}
              {orderExpiresTime && (
                <div className="flex items-center justify-center gap-2 py-2 border-b backdrop-blur-sm">
                  <h2>Order Expires At : </h2>
                  <h5 className="arimo text-[13px] font-bold underline text-errorcolor">
                    {new Date(orderExpiresTime) > new Date()
                      ? formateDate(new Date(orderExpiresTime))
                      : "Order Expired"}
                  </h5>
                </div>
              )}

              {sendOrderLoading && (
                <Button
                  disabled
                  className="w-full bg-cardbg text-errorcolor  arimo text-[16px] capitalize rounded-xl"
                >
                  Cancel request
                </Button>
              )}
              <form
                className="flex items-center w-full justify-center gap-3 flex-col"
                onSubmit={handleOrderExpires}
              >
                <h1>
                  If you haven't received the best price or a response yet,
                  don't worry! We'll save your order for you.
                </h1>
                <Label
                  htmlFor="expireTime"
                  className="arimo text-[18px] font-bold underline text-hoverblack"
                >
                  Expire Time
                </Label>
                <Input
                  onChange={(e) => {
                    setOrderExpiresDateAndTime(e.target.value);
                  }}
                  min={getMinDateTime()}
                  required
                  id="expireTime"
                  type="datetime-local"
                  className={`arimo text-[16px]  w-full bg-primarycolor focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl `}
                />
                <Button
                  type="submit"
                  className="w-full bg-buttoncolor text-hoverblack  arimo text-[16px] capitalize rounded-xl"
                >
                  Save
                </Button>
              </form>
            </div>
          </div>
        </Card>
      )}

      <main className="w-full  col-span-4 relative">
        {mapTracking && (
          <iframe
            src="https://lottie.host/embed/ff505e7b-30a8-4e17-afde-3744e3d2e0a3/5PMjASzAQ4.json"
            className="w-full h-full absolute z-40"
          ></iframe>
        )}

        <GoogleMapsLoader>
          <Find
            currentLocation={currentLocation}
            currentServiceProviders={currentServiceProviders}
            mapTracking={mapTracking}
          />
        </GoogleMapsLoader>
      </main>
      <aside className="overflow-auto h-screen hidden  col-span-2 gap-4 px-3 bg-cardbg sticky top-0 md:flex flex-col py-4">
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
          currentServiceProviders.length > 0 &&
          currentServiceProviders?.map((serviceprovider, index) => {
            return (
              <div
                key={index}
                className="flex items-center gap-2 justify-between bg-primarycolor px-3 py-1 rounded-[6px] shadow-md"
              >
                <div className="flex gap-3 items-center justify-center">
                  <Badge
                    overlap="circular"
                    color={`${
                      !onlineUsers.includes(serviceprovider?._id)
                        ? "red"
                        : "green"
                    }`}
                    className={``}
                  >
                    <Avatar
                      src={serviceprovider?.avatar?.url}
                      alt="Photo by Drew Beamer"
                      className={`object-cover rounded-full w-14 h-14 border-2 ${
                        onlineUsers.includes(serviceprovider?._id)
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
                      {!onlineUsers.includes(serviceprovider?._id) &&
                        formatLastActive(serviceprovider?.lastActive)}
                    </p>{" "}
                    <div className="flex justify-between items-center ">
                      <ReactStars
                        value={serviceprovider.ratings  || 0}
                        readOnly={true}
                        precision={0.5}
                        size={window.innerWidth < 600 ? 15 : 22}
                        isHalf={true}
                        edit={false}
                      />
                      <p className="arimo text-[13px]">
                        {formatRating(serviceprovider?.ratings)}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <BadgeOutline
                    status={
                      onlineUsers.includes(serviceprovider?._id)
                        ? "Online"
                        : "Offline"
                    }
                    color={`${
                      !onlineUsers.includes(serviceprovider?._id)
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
        {!loadingserviceproviders && currentServiceProviders?.length <= 0 && (
          <div className={sucess === "show" ? "hidden" : ""}>
            <ImagePlacehoderSkeleton />
          </div>
        )}
      </aside>
    </div>
  );
};

export default FindServiceProviders;
