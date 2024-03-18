import React from "react";
import { ComplexNavbar } from "../Navbar/Navbar";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

import { AlertDestructive } from "./../Alerts/ErrorAlert";
import { Caurosal } from "./Caursosal";
import areawecovera from "../../assets/areawecovera.png";
import "./home.css";
import Spiral from "./Spiral";
import aboutus from "../../assets/aboutus.png";
import { Link } from "react-router-dom";
import JoinUsCard from "./JoinUsCard";
import homeservice from "../../assets/homeservice.png";
import jal from "../../assets/jal.png";
import { AccordianHomes } from "./Accordian";
import { Footer } from "./Footer";

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

         </div> */}
        <div className="grid grid-cols-2 px-10  w-full">
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-7xl  font-bold">
              Home improvements you can trust
            </h2>
            <p className="py-6">
              Quick Fix is a one stop shop for any small or large jobs around
              your home or business. We work with local reputable trades people
              to deliver a quality service, and what’s more our work is
              guaranteed.
            </p>
          </div>
          <div className="">
            <img src={homeservice} className="opacity-35" alt="" />
          </div>
        </div>
      </div>

      <div className=" ">
        {/* Background Image */}
        {/* <div
          className="absolute inset-0 bg-cover opacity-10 bg-center z-0"
          style={{
            backgroundImage: `url(${aboutus})`,
          }}
        ></div> */}

        {/* Text */}
        <div className="grid grid-cols-2 items-center p-10">
          <div><img src={aboutus} alt="" /></div>
          <div><h1 className="text-4xl text-white font-bold">Quicfix company!</h1>
          <p className="text-lg text-white mt-2 ">
            QuickFix is your go-to and on-demand expert for all your Home &
            Personal Care Services. We are serving you 24/7 since 2019. The
            trust and love you have shown us over this period, has inspired us
            to go bigger & better. Now accelerating & expanding our operations
            to become even more accessible, reliable, fast, safe, and
            pocket-friendly for you, our users. And a pioneer of enablement and
            empowerment to our vendors.
          </p>
          <div className="flex items-center justify-center p-2">
            {" "}
            <Link
              className="text-center text-white border p-2 rounded-full px-4 hover:bg-thirdcolor"
              to={"/"}
            >
              Read more!
            </Link>
          </div></div>
        </div>
        {/* cards */}
        <div className="px-10 py-6">
          <div className="pb-20 grid grid-cols-3">
            <div className="col-span-2">
              {" "}
              <h2 className="text-6xl font-semibold  text-primarycolor">
                How to Join QuickFix Community
              </h2>
            </div>
          </div>
          <JoinUsCard />
        </div>
        {/* area we cover */}
        <div className="px-10 py-8">
          <h3 className="text-primarycolor text-4xl py-4 underline">
            Areas we cover :
          </h3>
          <div className="flex  gap-2 items-center justify-between ">
            <div className="w-full">
              <img src={areawecovera} className="opacity-60 p-4" alt="" />
            </div>
            <div className="flex flex-col w-full items-center gap-5 p-10  border-[#e21c34] ">
              {/* <AccordianHomes /> */}
              <h4 className="text-primarycolor text-5xl underline">Cities:</h4>
              <h3 className="text-7xl font-bold text-[#ff6b00]">Abbottabad</h3>
              <h3 className="text-7xl font-bold text-[#146EF5]">Haripur</h3>
              <h3 className="text-7xl font-bold text-[#ED52CB]">Mansehra</h3>
              {/* <Spiral/> */}
            </div>
          </div>
          {/* contact us
          <div className="">
            <h2 className="text-6xl text-primarycolor text-center ">
              Contact us:
            </h2>
            <div class="grid grid-cols-2 p-16">
              <div class=" border-[4px] shadow-xl shadow-gray-900 bg-thirdcolor rounded-2xl hover:border-blue-500 transition-all duration-200">
                <div class="mx-auto   flex items-center space-y-4 py-16 px-12 font-semibold text-gray-500 flex-col">
                  
                  <h1 class="text-white text-2xl">Submit your quries:</h1>
                  <input
                    class="w-full  p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                    placeholder="Email"
                    type="email"
                    name="email"
                    id=""
                  />
                  <input
                    class="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                    placeholder="Password"
                    type="password"
                    name="password"
                    id=""
                  />
                  <textarea
                    class="w-full p-2 bg-blue-900 rounded-md border border-gray-700 focus:border-blue-700 hover:border-blue-500 transition-all duration-200"
                    name=""
                    id=""
                    cols="10"
                    rows=""
                  ></textarea>
                  <input
                    class="w-full p-2 bg-gray-50 rounded-full font-bold text-gray-900 border-[4px] border-gray-700 hover:border-blue-500 transition-all duration-200"
                    type="submit"
                    id=""
                  />
                </div>
              </div>
              <div></div>
            </div>
          </div> */}

          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
