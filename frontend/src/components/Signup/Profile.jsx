import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { TextInput } from "@tremor/react";
import { Label } from "../ui/label";

import profileimage from "../../assets/profile.svg";
import plus from "../../assets/plus.gif";
import "./profile.css";
import { MdOutlineErrorOutline } from "react-icons/md";

import { Button } from "../ui/button";
import { DropdownMenuProfile } from "./DropdownMenuProfile";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { submitProfileSchema } from "@/Schemas";
import { useDispatch, useSelector } from "react-redux";
import { loadUserData, submitProfileAction } from "../Actions/Registration";

import { Loader2 } from "lucide-react";
import axiosInstance from "@/ulities/axios";
import { showtoast } from "@/Toast/Toast";

const Profile = () => {
  const navigate = useNavigate();
  const LogOut = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/admin/logout");
      console.log(data);
      if (data?.success) {
        dispatch(loadUserData())
        showtoast(data?.message);
        navigate("/login");
      }
    } catch (error) {}
  };
  const dispatch = useDispatch();

  const { user, success, setup, loading, submitprofile } = useSelector(
    (state) => state.user
  );
  const [profile, setprofile] = useState();
  const [avatarPreview, setavatarPreview] = useState();
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
  useEffect(() => {
    dispatch(loadUserData)
    if (submitprofile) {
      navigate("/submitprofile");
    }
    setFieldValue("avatar", profile);
  }, [profile, submitprofile,dispatch]);

  return (
    <div className="w-full md:max-w-[1750px] mx-auto h-[100vh]">
      <div className="w-full md:flex ">
        <div className="md:w-[20%] w-full  md:min-h-screen px-6 md:px-0 flex flex-col shadow-xl border-e border-bordercolor  bg-thirdcolor ">
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

            <div className="flex gap-1 items-center justify-center border border-buttonborder text-primarycolor hover:bg-thirdcolor py-1 px-3  bg-buttoncolor   mt-3 rounded-full mb-6">
              {" "}
              <img src={plus} className="w-8 " /> Upload Photo
            </div>
            {/* error */}
            <div className="flex gap-2 items-center">
              {errors?.avatar ? (
                <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
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
            <h2 className="text-2xl text-primarycolor font-semibold">
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
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="md:grid md:grid-cols-2 gap-6 w-full px-6 mt-6">
              <div className="flex  flex-col col-span-2 gap-3">
                <Label
                  htmlFor="dob"
                  className="font-normal text-primarycolor  text-lg "
                >
                  Date of Birth
                </Label>

                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="dateOfBirth"
                  type="date"
                  className={`rounded-lg border border-bordercolor text-primarycolor md:w-[30%] bg-inputbg_color  ${
                    errors?.dateOfBirth && touched?.dateOfBirth
                      ? "border-errorcolor border-2"
                      : ""
                  }  `}
                />

                {/* error */}
                <div className="flex gap-2 items-center">
                  {errors?.dateOfBirth && touched?.dateOfBirth ? (
                    <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
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
                  className="font-normal text-primarycolor text-lg "
                >
                  Experience
                </Label>
                <TextInput
                  id="experience"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="experience"
                  className={`rounded-lg border border-bordercolor text-primarycolor md:w-[30%] bg-inputbg_color  ${
                    errors?.experience && touched?.experience
                      ? "border-errorcolor border-2"
                      : ""
                  }  `}
                  placeholder="Experience"
                />
                {/* error */}
                <div className="flex gap-2 items-center">
                  {errors?.experience && touched?.experience ? (
                    <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
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
                  className="font-normal text-primarycolor text-lg "
                >
                  City
                </Label>

                <select
                  onChange={handleChange}
                  name="city"
                  defaultValue={"Please Select City"}
                  onBlur={handleBlur}
                  className={`rounded-lg border border-bordercolor text-primarycolor  bg-inputbg_color  ${
                    errors?.city && touched?.city
                      ? "border-errorcolor border-2"
                      : ""
                  }  `}
                >
                  <option disabled value={"Please Select City"}>
                    Please Select City
                  </option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
                {/* error */}
                <div className="flex gap-2 items-center">
                  {errors?.city && touched?.city ? (
                    <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
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
                  htmlFor="city"
                  className="font-normal text-primarycolor text-lg "
                >
                  Job
                </Label>
                <select
                  onChange={handleChange}
                  name="job"
                  defaultValue={"Please Select Job"}
                  onBlur={handleBlur}
                  className={`rounded-lg border border-bordercolor text-primarycolor  bg-inputbg_color  ${
                    errors?.job && touched?.job
                      ? "border-errorcolor border-2"
                      : ""
                  }  `}
                >
                  <option value="Please Select Job" disabled>
                    Please Select Job
                  </option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
                {/* error */}
                <div className="flex gap-2 items-center">
                  {errors?.job && touched?.job ? (
                    <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                      <MdOutlineErrorOutline className="text-xl" />
                      {errors?.job}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
                <Label
                  htmlFor="address"
                  className="font-normal text-primarycolor text-lg "
                >
                  Address
                </Label>
                <TextInput
                  id="address"
                  name="address"
                  onBlur={handleBlur}
                  className={`rounded-lg border border-bordercolor text-primarycolor  bg-inputbg_color  ${
                    errors?.address && touched?.address
                      ? "border-errorcolor border-2"
                      : ""
                  }  `}
                  placeholder="Enter street address"
                  onChange={handleChange}
                />
                {/* error */}
                <div className="flex gap-2 items-center">
                  {errors?.address && touched?.address ? (
                    <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
                      <MdOutlineErrorOutline className="text-xl" />
                      {errors?.address}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
                <Label
                  htmlFor="zipcode"
                  className="font-normal text-primarycolor text-lg "
                >
                  Zip code
                </Label>
                <TextInput
                  id="zipcode"
                  name="zipcode"
                  onBlur={handleBlur}
                  className={`rounded-lg border border-bordercolor text-primarycolor  bg-inputbg_color  ${
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
                    <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
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
                  className="font-normal text-primarycolor text-lg "
                >
                  Phone
                </Label>
                <TextInput
                  type="number"
                  id="phoneNumber"
                  onBlur={handleBlur}
                  name="phoneNumber"
                  className={`rounded-lg border border-bordercolor text-primarycolor  bg-inputbg_color  ${
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
                    <span className=" text-errorcolor flex gap-2 items-center mt-2 text-[1rem]">
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
                    className="bg-buttoncolor w-full rounded-lg"
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
