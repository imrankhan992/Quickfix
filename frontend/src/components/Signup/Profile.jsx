import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { TextInput } from "@tremor/react";
import { Label } from "../ui/label";
import { FaLocationArrow } from "react-icons/fa6";
import { MdMyLocation } from "react-icons/md";
import profileimage from "../../assets/profile.svg";
import plus from "../../assets/plus.gif";
import "./profile.css";
import { MdOutlineErrorOutline } from "react-icons/md";

import { DropdownMenuProfile } from "./DropdownMenuProfile";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { submitProfileSchema } from "@/Schemas";
import { useDispatch, useSelector } from "react-redux";
import { loadUserData, submitProfileAction } from "../Actions/Registration";

import { Loader2 } from "lucide-react";
import axiosInstance from "@/ulities/axios";
import { showtoast } from "@/Toast/Toast";

import GoogleMapPage from "../Services/GoogleMap";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Marker } from "@react-google-maps/api";
const Profile = () => {
  const { user, success, setup, loading, submitprofile } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const LogOut = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/logout/${user?._id}`);

      if (data?.success) {
        dispatch(loadUserData());
        showtoast(data?.message);
        navigate("/login");
      }
    } catch (error) {}
  };
  const dispatch = useDispatch();

  const [profile, setprofile] = useState();
  const [avatarPreview, setavatarPreview] = useState();
  const [openmap, setopenmap] = useState(false);
  const [CityName, setcurrentCityname] = useState("");
  const [ZipCode, setCurrentZipcode] = useState("");
  const [currentaddress, setcurrentaddress] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  console.log(currentLocation);
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
      avatar: null,
      phoneNumber: "",
      address: "",
      dateOfBirth: "",
      experience: "",
      city: "",
      job: "",
      zipcode: "",
      currentlocation: "",
    },
    validationSchema: submitProfileSchema,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(submitProfileAction(values));
    },
  });

  const handleFileChange = (e) => {
    setprofile(e.currentTarget.files[0]);
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setavatarPreview(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };
  const [allcategories, setallcategories] = useState();
  // get all categories
  const getallcategories = async (req, res) => {
    try {
      const { data } = await axiosInstance.get(
        "/api/v1/admin/get-all-categories"
      );
      if (data?.success) {
        setallcategories(data?.categories);
      }
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };

  useEffect(() => {
    if (CityName) {
      setFieldValue("city", CityName);
    }
    if (ZipCode) {
      setFieldValue("zipcode", ZipCode);
    }
    if (currentaddress) {
      setFieldValue("address", currentaddress);
    }
    if (currentLocation) {
      setFieldValue("currentlocation", currentLocation);
    }
    dispatch(loadUserData);
    if (user?.address !== undefined || user?.dateOfBirth) {
      navigate("/submitprofile");
    }
    getallcategories();
    setFieldValue("avatar", profile);
  }, [
    profile,
    submitprofile,
    dispatch,
    CityName,
    ZipCode,
    currentaddress,
    currentLocation,
  ]);

  const getmycurrentLocation = async () => {
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
      console.error("Geolocation is not supported by this browser.");
    }
  };

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
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const handleOpen = () => setopenmap(!openmap);
  const handleMarkerDragEnd = (e) => {
    const newLatLng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    // Update current location with new position
    setCurrentLocation(newLatLng);

    // Perform reverse geocoding to get the address
    fetchAddressFromCoordinates(newLatLng);
  };
  console.log(values);
  return (
    <div className="w-full md:max-w-[1750px] mx-auto h-[100vh]">
      <div className="w-full md:flex ">
        <div className="md:w-[20%] w-full  md:min-h-screen px-6 md:px-0 flex flex-col  ">
          <div className="flex items-center justify-center flex-col relative  rounded-full mt-6">
            <img
              src={profile ? avatarPreview : profileimage}
              className="w-32 flex bg-thirdcolor border border-bordercolor  p-2 rounded-full"
              alt=""
            />
            <Input
              id="picture"
              name="avatar"
              className="absolute h-full w-full cursor-pointer opacity-0"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              onBlur={handleBlur}
            />

            <div className="flex gap-1 items-center justify-center border border-buttonborder text-hoverblack arimo hover:bg-thirdcolor py-1 px-3  bg-buttoncolor   mt-3 rounded-full mb-6">
              {" "}
              <img src={plus} className="w-8 " /> Upload Photo
            </div>
            {/* error */}
            <div className="flex gap-2 items-center">
              {errors?.avatar ? (
                <span className="arimo text-errorcolor flex gap-2 items-center mt-2 text-[1rem] arimo">
                  <MdOutlineErrorOutline className="text-xl" />
                  {errors?.avatar}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {/* first grid */}
        <div className="w-full pb-4">
          <div className="py-5 px-8 md:flex items-center justify-between  hidden ">
            <h2 className="text-2xl text-hoverblack font-semibold arimo bg-buttoncolor px-2 rounded-xl">
              Setup your profile
            </h2>
            <div
              onClick={() => {
                LogOut();
              }}
            >
              <DropdownMenuProfile />
            </div>
          </div>
          <form className="w-full " onSubmit={handleSubmit}>
            <div className="md:grid md:grid-cols-2 gap-6 w-full px-6 mt-6">
              <div className="flex  flex-col col-span-2 gap-2">
                <Label
                  htmlFor="dob"
                  className="font-bold arimo  text-hoverblack  text-lg "
                >
                  Date of Birth
                </Label>

                <Input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="dateOfBirth"
                  type="date"
                  className={` arimo bg-hovertext-hoverblack focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl md:w-[30%] ${
                    errors?.dateOfBirth && touched?.dateOfBirth
                      ? "border-errorcolor border-2"
                      : ""
                  }  `}
                />

                {/* error */}
                <div className="flex gap-2 items-center">
                  {errors?.dateOfBirth && touched?.dateOfBirth ? (
                    <span className="arimo text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                      <MdOutlineErrorOutline className="text-xl" />
                      {errors?.dateOfBirth}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <hr className="border border-bordercolor my-4" />
              </div>

              <div className="rounded-lg flex col-span-2 flex-col gap-3 ">
                <Label
                  htmlFor="experience"
                  className="font-bold arimo  text-hoverblack text-lg "
                >
                  Experience
                </Label>
                <Input
                  id="experience"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="experience"
                  className={` arimo bg-hovertext-hoverblack focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl md:w-[30%]   ${
                    errors?.experience && touched?.experience
                      ? "border-errorcolor border-2"
                      : ""
                  }  `}
                  placeholder="Experience"
                />
                {/* error */}
                <div className="flex gap-2 items-center">
                  {errors?.experience && touched?.experience ? (
                    <span className="arimo text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                      <MdOutlineErrorOutline className="text-xl" />
                      {errors?.experience}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
                <Label
                  htmlFor="city"
                  className="font-bold arimo  text-hoverblack text-lg "
                >
                  Job
                </Label>
                <select
                  onChange={handleChange}
                  name="job"
                  defaultValue={"Please Select Job"}
                  onBlur={handleBlur}
                  className={`rounded-xl border border-bordercolor text-hoverblack arimo  h-14   focus:bg-buttoncolor   ${
                    errors?.job && touched?.job
                      ? "border-errorcolor border-2"
                      : ""
                  }  `}
                >
                  <option value="Please Select Job" className="arimo" disabled>
                    Please Select Job
                  </option>
                  {allcategories?.map((category) => {
                    return (
                      <option value={category?._id} className="arimo">
                        {category?.category}
                      </option>
                    );
                  })}
                </select>
                {/* error */}
                <div className="flex gap-2 items-center">
                  {errors?.job && touched?.job ? (
                    <span className="arimo text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                      <MdOutlineErrorOutline className="text-xl" />
                      {errors?.job}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div></div>
              <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
                <Label
                  htmlFor="address"
                  className="font-bold arimo  text-hoverblack text-lg "
                >
                  Address
                </Label>
                {/* <Input
                  id="address"
                  name="address"
                  onBlur={handleBlur}
                  className={` arimo bg-hovertext-hoverblack focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl  ${
                    errors?.address && touched?.address
                      ? "border-errorcolor border-2"
                      : ""
                  }  `}
                  placeholder="Enter street address"
                  onChange={handleChange}
                /> */}

                <Dialog open={openmap} size="xl">
                  <DialogBody>
                    <h3 className="text-2xl arimo text-hoverblack font-bold">
                      Choose your location
                    </h3>
                    <p className="text-[16px] text-muted arimo py-2">
                      Just by drag the marker
                    </p>
                    <GoogleMapPage
                      currentaddress={currentaddress}
                      currentLocation={currentLocation}
                      setCurrentLocation={setCurrentLocation}
                      setopenmap={setopenmap}
                      height={"300px"}
                      width={"100%"}
                      openmap={openmap}
                      setcurrentCityname={setcurrentCityname} // Pass setcurrentCityname as prop
                      setCurrentZipcode={setCurrentZipcode} // Pass setCurrentZipcode as prop
                      marker={
                        <Marker
                          position={currentLocation}
                          draggable={true}
                          onDragEnd={handleMarkerDragEnd}
                          icon={<MdMyLocation />}
                        />
                      }
                    />
                  </DialogBody>
                  <DialogFooter>
                    <Button
                      variant="text"
                      color="red"
                      onClick={handleOpen}
                      className="mr-1"
                    >
                      <span className="arimo text-[16px]">Cancel</span>
                    </Button>
                  </DialogFooter>
                </Dialog>
                <p
                  onClick={() => getmycurrentLocation()}
                  className="arimo cursor-pointer text-red-900 font-bold flex gap-3 items-center "
                >
                  <FaLocationArrow />
                  Use my current location
                </p>
                <div className="bg-buttoncolor overflow-auto p-2 rounded-xl">
                  <GoogleMapPage
                    currentaddress={currentaddress}
                    currentLocation={currentLocation}
                    setCurrentLocation={setCurrentLocation}
                    setopenmap={setopenmap}
                    setcurrentCityname={setcurrentCityname} // Pass setcurrentCityname as prop
                    setCurrentZipcode={setCurrentZipcode} // Pass setCurrentZipcode as prop
                    height={"200px"}
                    width={"100%"}
                  />
                </div>
                {/* error */}
                <div className="flex gap-2 items-center">
                  {errors?.address && touched?.address ? (
                    <span className="arimo text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                      <MdOutlineErrorOutline className="text-xl" />
                      {errors?.address}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* city */}
              <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
                <Label
                  htmlFor="city"
                  className="font-bold arimo  text-hoverblack text-lg "
                >
                  City
                </Label>

                <Input
                  id="city"
                  name="city"
                  onBlur={handleBlur}
                  value={values?.city}
                  className={` arimo bg-hovertext-hoverblack focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl ${
                    errors?.city && touched?.city
                      ? "border-errorcolor border-2"
                      : ""
                  }  `}
                  placeholder="Enter City Name"
                />
                {/* error */}
                <div className="flex gap-2 items-center">
                  {errors?.city && touched?.city ? (
                    <span className="arimo text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                      <MdOutlineErrorOutline className="text-xl" />
                      {errors?.city}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
                <Label
                  htmlFor="zipcode"
                  className="font-bold arimo  text-hoverblack text-lg "
                >
                  Zip code
                </Label>
                <Input
                  id="zipcode"
                  name="zipcode"
                  value={values?.zipcode}
                  onBlur={handleBlur}
                  className={` arimo bg-hovertext-hoverblack focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl ${
                    errors?.zipcode && touched?.zipcode
                      ? "border-errorcolor border-2"
                      : ""
                  }  `}
                  placeholder="Enter Zip/Postal code"
                  onChange={handleChange}
                />
                {/* error */}
                <div className="flex gap-2 items-center">
                  {errors?.zipcode && touched?.zipcode ? (
                    <span className="arimo text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                      <MdOutlineErrorOutline className="text-xl" />
                      {errors?.zipcode}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="rounded-lg flex   flex-col mt-3 gap-3 w-full ">
                <Label
                  htmlFor="zipcode"
                  className="font-bold arimo  text-hoverblack text-lg "
                >
                  Phone
                </Label>
                <Input
                  type="number"
                  id="phoneNumber"
                  onBlur={handleBlur}
                  value={values?.phoneNumber}
                  name="phoneNumber"
                  className={` arimo bg-hovertext-hoverblack focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl  ${
                    errors?.phoneNumber && touched?.phoneNumber
                      ? "border-errorcolor border-2"
                      : ""
                  }  `}
                  placeholder="Enter number"
                  onChange={handleChange}
                />
                {/* error */}
                <div className="flex gap-2 items-center">
                  {errors?.phoneNumber && touched?.phoneNumber ? (
                    <span className="arimo text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                      <MdOutlineErrorOutline className="text-xl" />
                      {errors?.phoneNumber}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="rounded-lg flex  col-span-2 mb-6 flex-col mt-6 gap-3 w-full md:w-[20%]">
                {!loading && (
                  <Button
                    type="submit"
                    className="bg-buttoncolor rounded-xl hover:border-t-2 hover:border-b-0 border-b-2 border-hoverblack w-full text-hoverblack text-[16px] arimo capitalize"
                  >
                    Submit
                  </Button>
                )}
                {loading && (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
