import React, { useEffect, useState } from "react";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";
import { loadUserData } from "@/components/Actions/Registration";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import ReactStars from "react-rating-stars-component";
import axiosInstance from "@/ulities/axios";
import { Filter } from "./Filter";
import { errorToast } from "@/Toast/Toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/Input";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // useEffect(() => {

  //     dispatch(loadUserData());

  //   }, []);
  console.log(user);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px] ">
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={5} />
        <main className="text-primarycolor w-full">
          <div>
            <Header user={user} />
          </div>

          <div className="px-8 py-6">
            <div className="text-3xl text-hoverblack">
              Hello! {user?.firstname + " " + user?.lastname}
            </div>
            <form className="w-full">
              <div className="md:grid md:grid-cols-2 gap-2 w-full  mt-6">
                <div className="flex  flex-col col-span-2 gap-3">
                  <Label
                    htmlFor="dob"
                    className="font-normal  text-hoverblack  text-lg "
                  >
                    Date of Birth
                  </Label>

                  <Input
                    value={formatDate(user?.dateOfBirth)}
                    name="dateOfBirth"
                    type="text"
                    className={`arimo bg-primarycolor text-[16px] border border-hoverblack text-hoverblack  focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl md:w-[30%]   `}
                  />

                  <hr className="border border-hoverblack text-hoverblack my-4" />
                </div>

                <div className="rounded-lg flex col-span-2 flex-col gap-3 ">
                  <Label
                    htmlFor="experience"
                    className="font-normal  text-hoverblack text-lg "
                  >
                    Experience
                  </Label>
                  <Input
                    id="experience"
                    value={user?.experience}
                    name="experience"
                    className={`arimo bg-primarycolor text-[16px] border border-hoverblack text-hoverblack  focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl md:w-[30%] bg-Inputbg_color  `}
                    placeholder="Experience"
                  />
                </div>
                <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
                  <Label
                    htmlFor="city"
                    className="font-normal  text-hoverblack text-lg "
                  >
                    City
                  </Label>
                  <Input
                    id="city"
                    value={user?.city}
                    name="city"
                    className={`arimo bg-primarycolor text-[16px] border border-hoverblack text-hoverblack  focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl `}
                    placeholder="Experience"
                  />
                </div>
                <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
                  <Label
                    htmlFor="job"
                    className="font-normal  text-hoverblack text-lg "
                  >
                    Job
                  </Label>
                  <Input
                    id="job"
                    value={user?.job}
                    name="job"
                    className={`arimo bg-primarycolor text-[16px] border border-hoverblack text-hoverblack  focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl `}
                    placeholder="job"
                  />
                </div>
                <div className="rounded-lg flex  col-span-2 flex-col mt-3 gap-3 w-full ">
                  <Label
                    htmlFor="address"
                    className="font-normal  text-hoverblack text-lg "
                  >
                    Address
                  </Label>
                  <textarea
                    name="address"
                    value={user?.address}
                    className="arimo bg-primarycolor text-[16px] border border-hoverblack text-hoverblack  focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl"
                    id="address"
                    cols="20"
                    rows="5"
                  >
                    {user?.address}
                  </textarea>
                </div>
                <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
                  <Label
                    htmlFor="zipcode"
                    className="font-normal  text-hoverblack text-lg "
                  >
                    Zip code
                  </Label>
                  <Input
                    id="zipcode"
                    name="zipcode"
                    value={user?.zipcode}
                    className={`arimo bg-primarycolor text-[16px] border border-hoverblack text-hoverblack  focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl   `}
                    placeholder="Enter Zip/Postal code"
                  />
                </div>
                <div className="rounded-lg flex   flex-col mt-3 gap-3 w-full ">
                  <Label
                    htmlFor="zipcode"
                    className="font-normal  text-hoverblack text-lg "
                  >
                    Phone
                  </Label>
                  <Input
                    type="number"
                    id="phoneNumber"
                    value={user?.phoneNumber}
                    name="phoneNumber"
                    className={`arimo bg-primarycolor text-[16px] border border-hoverblack text-hoverblack  focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl `}
                    placeholder="Enter number"
                  />
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
