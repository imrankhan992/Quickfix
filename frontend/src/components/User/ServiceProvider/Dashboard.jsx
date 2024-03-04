import React, { useEffect } from "react";
import Aside from "./Aside";
import { BurgerMenu } from "./BurgerMenu";
import Main from "./Main";
import { useDispatch, useSelector } from "react-redux";
import { loadUserData } from "@/components/Actions/Registration";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px] ">
      <div className="flex relative">
        <BurgerMenu />
        <Aside user={user}/>
        <Main user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
