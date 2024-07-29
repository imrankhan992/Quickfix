import React, { useEffect, useState } from "react";

import Aside from "./Aside";
import Main from "./Main";
import { BurgerMenu } from "./BurgerMenu";
import { useSelector } from "react-redux";
import { useSocketContext } from "@/context/SocketContext";


const Dashboard = () => {
  const { SPuser, SPloading } = useSelector((state) => state.spData);
 const {newServiceProviders, setNewServiceProviders}= useSocketContext()
 if(SPuser?.length > 0){
  const pending = SPuser.filter(report => report.accountStatus === "pending")
  setNewServiceProviders(pending?.length)
 }
  return (
    <>
     <BurgerMenu />
      <div className="flex ">
      
        <Aside open={1} />

        <Main />
      </div>
    </>
  );
};

export default Dashboard;
