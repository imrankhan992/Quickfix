import React from "react";
import { Menu } from "./Menu";


const Header = ({user}) => {
  return (
    <>
      <div className= "bg-bodycolor sticky top-0  bg-opacity-50 border-b border-bordercolor h-14 w-full flex items-center justify-end px-6">
       <Menu user={user}/>
        </div>
    </>
  );
};

export default Header;
