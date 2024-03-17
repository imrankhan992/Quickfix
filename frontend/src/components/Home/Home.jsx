import React from "react";
import { ComplexNavbar } from "../Navbar/Navbar";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

import { AlertDestructive } from "./../Alerts/ErrorAlert";
import { Caurosal } from "./Caursosal";
import "./home.css";
import Spiral from "./Spiral";
import aboutus from "../../assets/aboutus.svg";
import { Link } from "react-router-dom";
import homeservice from "../../assets/homeservice.png"
const Home = () => {
  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px]">
      {/* header */}
      <div className=" border-b border-bordercolor">
        <ComplexNavbar />
      </div>
      <div className="text-primarycolor flex flex-col  justify-start h-[80vh] items-center mb-28">
        {/* <Caurosal /> */}
        {/* <div className=' mt-10'>
<Spiral/>
         </div> */}
        <div className="grid grid-cols-2 px-10  w-full">
          <div className="flex flex-col items-center justify-center">
          <h2 className="text-7xl  font-bold">
          Home improvements you can trust
          </h2>
          <p className="py-6">Quick Fix is a one stop shop for any small or large jobs around your home or business. We work with local reputable trades people to deliver a quality service, and what’s more our work is guaranteed.</p>
          </div>
          <div className="">
            <img src={homeservice} alt="" />
          </div>
        </div>
      </div>

      <div className="relative  h-[250px] ">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover opacity-10 bg-center z-0"
          style={{
            backgroundImage: `url(${aboutus})`,
          }}
        ></div>

        {/* Text */}
        <div className="relative z-10 p-10">
          <h1 className="text-4xl text-white font-bold">Quicfix company!</h1>
          <p className="text-lg text-white mt-2 ">
           QuickFix is your go-to and
            on-demand expert for all your Home & Personal Care Services. We are
            serving you 24/7 since 2019. The trust and love you have shown us
            over this period, has inspired us to go bigger & better. Now
            accelerating & expanding our operations to become even more
            accessible, reliable, fast, safe, and pocket-friendly for you, our
            users. And a pioneer of enablement and empowerment to our vendors.
          </p>
         <div className="flex items-center justify-center p-2"> <Link className="text-center text-white border p-2 rounded-full px-4 hover:bg-thirdcolor" to={"/"}>Read more!</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
