import React from "react";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";

import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";

import { Button } from "@material-tailwind/react";
import { MdCalendarToday } from "react-icons/md";
import { useSocketContext } from "@/context/SocketContext";
import { OrdersTable } from "./OrdersTable";

const SingleOrder = () => {
  const { user } = useSelector((state) => state.user);
  const { newOrder } = useSocketContext();
  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px] ">
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={6} />
        <main className="bg-cardbg w-full">
          <Header user={user} />

          <div className="px-8 py-6"></div>
        </main>
      </div>
    </div>
  );
};

export default SingleOrder;
