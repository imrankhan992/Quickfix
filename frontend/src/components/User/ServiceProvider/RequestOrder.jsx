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
import { MdCalendarToday } from "react-icons/md";
import { useSocketContext } from "@/context/SocketContext";
import { OrdersTable } from "./OrdersTable";

const RequestOrder = () => {
  const { user } = useSelector((state) => state.user);
 const {newOrder} =useSocketContext()
  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px] ">
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={6} />
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
            {/* request orders */}
            <div className="flex py-5 ">
              <div className="p-6 rounded-l-2xl shadow-lg border-e-2 bg-primarycolor flex gap-2 justify-center items-center"> 
              <MdCalendarToday/>
                <p className="text-xl font-bold">Today</p>
              </div>
              <div className="flex flex-col rounded-r-2xl shadow-lg bg-primarycolor p-6">
                <div className="text-mutedcolor">Total Orders</div>
                <div><p className="font-bold">{newOrder?.length}</p></div>
              </div>
            </div>
            {/* orders table */}
            <OrdersTable/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RequestOrder;
