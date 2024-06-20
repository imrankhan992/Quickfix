import React from "react";

import Aside from "./Aside";
import Main from "./Main";
import { BurgerMenu } from "./BurgerMenu";

const Dashboard = () => {
  
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
