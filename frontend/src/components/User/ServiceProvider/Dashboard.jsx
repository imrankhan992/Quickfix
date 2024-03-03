import React from "react";
import Aside from "./Aside";
import { BurgerMenu } from "./BurgerMenu";

const Dashboard = () => {
  return <div className=" w-full h-[100vh] mx-auto max-w-[1750px] ">
        <div className="flex">
            <BurgerMenu />
            <Aside/>
            <main className="w-full">right side</main>
        </div>
    </div>;
};

export default Dashboard;
