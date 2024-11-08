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

const PreviousOrders = () => {
    const { user } = useSelector((state) => state.user);
const dispatch = useDispatch()
  
    // useEffect(() => {
      
    //     dispatch(loadUserData());
      
    //   }, []);
  
  return (
    <div className=" w-full h-screen mx-auto max-w-[1750px] bg-cardbg">
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={4} />
        <main className="text-primarycolor w-full">
          <div>
            <Header user={user} />
          </div>
          
          <div className="px-8 py-6">
            <div className="flex items-center justify-start text-3xl">
              Previous Orders
            </div>
            <div className="text-red-500 flex items-center py-6"><p>No previous orders found</p></div>
          </div>
          
        </main>
      </div>
    </div>
  );
};

export default PreviousOrders;
