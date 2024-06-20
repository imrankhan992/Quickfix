import React from "react";
import { Menu } from "./Menu";


const Header = () => {
  return (
    <>
      <div className= "bg-bodycolor sticky top-0  bg-opacity-50 border-b border-bordercolor h-14 w-full flex items-center justify-end px-6">
       <Menu/>
        </div>
    </>
  );
};

export default Header;
