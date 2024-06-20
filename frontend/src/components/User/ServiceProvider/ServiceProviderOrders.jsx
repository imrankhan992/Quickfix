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
import { Button } from "@material-tailwind/react";

const ServiceProviderOrders = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // useEffect(() => {

  //     dispatch(loadUserData());

  //   }, []);

  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px] ">
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={3} />
        <main className="bg-cardbg w-full">
          <Header user={user} />

          <div className="px-8 py-6">
            {/* top */}
            <div className="bg-sidebarbg h-32 flex p-6 rounded-xl text-primarycolor ">
              <div className="flex flex-col gap-1">
                <p className="text-xl font-bold">
                  Get The Very Best App For Store
                </p>
                <p className="text-sm">Upgrade the new automation</p>
                <div className="flex items-end">
                  <Button className="capitalize bg-white  text-hoverblack arimo p-0 text-[16px] w-[100px]">
                    Find Now
                  </Button>
                </div>
              </div>
            </div>
           
          </div>
        </main>
      </div>
    </div>
  );
};

export default ServiceProviderOrders;
