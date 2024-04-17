import React from "react";
import { Menu } from "./Menu";
import { Input } from "@/components/ui/input";


const Header = ({user}) => {
  return (
    <>
      <div className= " flex gap-3  h-14 w-full   items-center justify-end px-6">
    <Input placeholder="Search" className=" bg-primarycolor text-hoverblack border border-gray-400 max-w-xs  focus:border-hoverblack  focus:bg-buttoncolor p-6 h-8 rounded-full"/>
       <Menu user={user}/>
        </div>
    </>
  );
};

export default Header;
