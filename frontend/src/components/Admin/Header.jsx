import React from "react";
import { Menu } from "./Menu";


const Header = () => {
  return (
    <>
      <div className= "bg-cardbg sticky top-0    h-14 w-full flex items-center justify-end px-6">
       <Menu/>
        </div>
    </>
  );
};

export default Header;
