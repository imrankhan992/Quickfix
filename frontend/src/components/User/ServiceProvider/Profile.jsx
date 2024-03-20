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
import { Input } from "@/components/ui/input";

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
    const month = date.toLocaleString('default', { month: 'long' });
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
            <div className="text-3xl text-primarycolor">Hello! {user?.firstname + " " + user?.lastname}</div>
          <form className="w-full" >
            <div className="md:grid md:grid-cols-2 gap-6 w-full  mt-6">
              <div className="flex  flex-col col-span-2 gap-3">
                <Label
                  htmlFor="dob"
                  className="font-normal text-primarycolor  text-lg "
                >
                  Date of Birth
                </Label>

                <input
                 value={formatDate(user?.dateOfBirth)}
                  name="dateOfBirth"
                  type="text"
                  className={`rounded-lg border border-bordercolor text-primarycolor md:w-[30%] bg-inputbg_color   `}
                />

               
                <hr className="border border-bordercolor my-4" />
              </div>

              <div className="rounded-lg flex col-span-2 flex-col gap-3 ">
                <Label
                  htmlFor="experience"
                  className="font-normal text-primarycolor text-lg "
                >
                  Experience
                </Label>
                <Input
                  id="experience"
                 
                  value={user?.experience}
                  name="experience"
                  className={`rounded-lg border border-bordercolor text-primarycolor md:w-[30%] bg-inputbg_color  `}
                  placeholder="Experience"
                />
                
              </div>
              <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
                <Label
                  htmlFor="city"
                  className="font-normal text-primarycolor text-lg "
                >
                  City
                </Label>
                <Input
                  id="city"
                 
                  value={user?.city}
                  name="city"
                  className={`rounded-lg border border-bordercolor text-primarycolor  bg-inputbg_color  `}
                  placeholder="Experience"
                />
               
                
              </div>
              <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
                <Label
                  htmlFor="job"
                  className="font-normal text-primarycolor text-lg "
                >
                  Job
                </Label>
                <Input
                  id="job"
                 
                  value={user?.job}
                  name="job"
                  className={`rounded-lg border border-bordercolor text-primarycolor bg-inputbg_color  `}
                  placeholder="job"
                />
                
              </div>
              <div className="rounded-lg flex  col-span-2 flex-col mt-3 gap-3 w-full ">
                <Label
                  htmlFor="address"
                  className="font-normal text-primarycolor text-lg "
                >
                  Address
                </Label>
                <textarea name="address" value={user?.address} className="text-primarycolor bg-inputbg_color border-bordercolor rounded-lg" id="address" cols="20" rows="5">{user?.address}</textarea>
                
              </div>
              <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
                <Label
                  htmlFor="zipcode"
                  className="font-normal text-primarycolor text-lg "
                >
                  Zip code
                </Label>
                <Input
                  id="zipcode"
                  name="zipcode"
                  value={user?.zipcode}
                  className={`rounded-lg border border-bordercolor text-primarycolor  bg-inputbg_color    `}
                  placeholder="Enter Zip/Postal code"
                 
                />
                
              </div>
              <div className="rounded-lg flex   flex-col mt-3 gap-3 w-full ">
                <Label
                  htmlFor="zipcode"
                  className="font-normal text-primarycolor text-lg "
                >
                  Phone
                </Label>
                <Input
                  type="number"
                  id="phoneNumber"
                  value={user?.phoneNumber}
                  name="phoneNumber"
                  className={`rounded-lg border border-bordercolor text-primarycolor  bg-inputbg_color `}
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
