import React from "react";
import { ComplexNavbar } from "../Navbar/Navbar";

import areawecovera from "../../assets/areawecovera.png";
import "./home.css";

import JoinUsCard from "./JoinUsCard";

import { Footer } from "./Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import heropagebg from "../../assets/heropage.png";
import heropagebg2 from "../../assets/heropage2.jpg";
import homepagestars from "../../assets/homepage-stars.svg";
import carpenterpng from "../../assets/carpenter.png";
import voltmeterpng from "../../assets/voltmeter.png";
import plumberpng from "../../assets/plumber.png";
import imranhomepic from "../../assets/imranhomepic.png";
import attaurrehamanhomepic from "../../assets/attaurrehamanhomepic.jpg";
import danishkaremhomepic from "../../assets/danishkaremhomepic.jpg";
import { FiArrowUpRight } from "react-icons/fi";

import "swiper/css";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className=" w-full px-10 h-[100vh] mx-auto max-w-[1750px] ">
      {/* header */}

      <ComplexNavbar />

      <div className="h-full  flex items-center justify-center ">
        <div className="text-primarycolor flex flex-col  justify-start items-center mb-28">
          {/* <Caurosal /> */}
          {/* <div className=' mt-10'>

         </div> */}
          <div className="grid grid-cols-2 px-10  gap-4 w-full  ">
            <div className="flex flex-col justify-center">
              <h2 className="text-5xl font-medium text-hoverblack arimo">
                Home improvements you can trust
              </h2>
              <p className="py-6 text-hoverblack arimo text-justify">
                Quick Fix is a one stop shop for any small or large jobs around
                your home or business. We work with local reputable tradespeople
                to deliver a quality service, and what’s more our work is
                guaranteed.
              </p>

              <div>
                <button className="px-10 rounded-xl capitalize bg-buttoncolor text-[16px] py-3 text-hoverblack border-b-4 border-hoverblack  hover:bg-[#B9FF66] hover:text-hoverblack font-bold">
                  Get Start
                </button>
              </div>
            </div>
            <div className=" flex items-center justify-center">
              <Swiper
                spaceBetween={30}
                navigation={true}
                modules={[Autoplay, Pagination]}
                className="mySwiper h-full w-full shadow-xl rounded-3xl "
                autoplay={{ delay: 5000, disableOnInteraction: false }}
              >
                <SwiperSlide className="text-black">
                  <img
                    className="rounded-3xl "
                    src={
                      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide className="text-black">
                  <img
                    className="rounded-3xl"
                    src="https://img.freepik.com/free-photo/tiler-working-renovation-apartment_23-2149278584.jpg?w=826&t=st=1711998198~exp=1711998798~hmac=f240c17de2b6d20a8a9346c06188032cb0afe5739ef9fc960e80ebd97d219530"
                    alt=""
                  />
                </SwiperSlide>
                <SwiperSlide className="text-black">
                  <img
                    className="rounded-3xl"
                    src="https://img.freepik.com/premium-photo/side-view-young-black-afro-handyman-repairman-repairing-dishwasher-changing-siphon-wearing-blue-workwear-overalls-confident-professional-handyman-focused-work-alone-kitchen_183219-8428.jpg?w=826"
                    alt=""
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      <div className=" px-10">
        <div className="h-[15rem] bg-cardbg rounded-3xl  flex  items-center justify-around text-hoverblack p-10">
          <div className="flex  flex-col gap-3 max-w-xl">
            <h1 className="text-4xl text-hoverblack  inline font-bold arimo">
              Quicfix company!
            </h1>
            <p className="text-lg text-hoverblack mt-2 arimo text-justify">
              QuickFix is your go-to and on-demand expert for all your Home &
              Personal Care Services. We are serving you 24/7 since 2024. The
              trust and love you have shown us over this period, has inspired us
              to go bigger & better.
            </p>
          </div>
          <div>
            <img src={homepagestars} className="w-80 h-80" alt="" />
          </div>
        </div>
        {/* services */}
        <div className="pt-28 pb-10 px-12">
          <div className=" grid grid-cols-4 gap-6 ">
            <h2 className="text-hoverblack text-center  bg-buttoncolor arimo inline text-4xl font-semibold px-2 rounded-xl">
              Our Services
            </h2>
            <p className="col-span-3 text-[16px] font-normal arimo max-w-xl">
              Connecting customers and technicians for quick, safe, and
              affordable bookings
            </p>
          </div>
        </div>
        {/* services cards */}
        <div className="grid grid-cols-3 gap-14 ">
          <div className="bg-cardbg h-[16rem] relative    rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl p-8">
            <p className="text-hoverblack arimo text-2xl mb-6 font-semibold">
              Carpenter Services
            </p>
            <p className="text-hoverblack arimo text-[16px] mb-6 ">
              Wood Fixtures, Construct, Build, Install and More
            </p>
            <FiArrowUpRight className="text-buttoncolor font-bold  bg-hoverblack text-3xl rounded-full p-1" />
            <div className="absolute bottom-0 bg-buttoncolor right-0 p-5 rounded-tl-[2rem]">
              <img src={carpenterpng} className="w-20 " alt="" />
            </div>
          </div>
          {/* electration */}
          <div className="bg-hoverblack h-[16rem] relative    rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl p-8">
            <p className="text-primarycolor arimo text-2xl mb-6 font-semibold">
              Electrician Services
            </p>
            <p className="text-primarycolor arimo text-[16px] mb-6 ">
              Complete Electrical Solutions for Residentials & Commercials
            </p>
            <FiArrowUpRight className="text-hoverblack  bg-primarycolor text-3xl rounded-full p-1" />
            <div className="absolute bottom-0 bg-buttoncolor right-0 p-5 rounded-tl-[2rem]">
              <img src={voltmeterpng} className="w-20 " alt="" />
            </div>
          </div>
          {/* Plumber Services */}
          <div className="bg-cardbg h-[16rem] relative    rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl p-8">
            <p className="text-hoverblack arimo text-2xl mb-6 font-semibold">
              Plumber Services
            </p>
            <p className="text-hoverblack arimo text-[16px] mb-6 ">
              From Plumbing Installs, Repairs, and Upgrades – We Fix it All
            </p>
            <FiArrowUpRight className="text-buttoncolor font-bold  bg-hoverblack text-3xl rounded-full p-1" />
            <div className="absolute bottom-0 bg-buttoncolor right-0 p-5 rounded-tl-[2rem]">
              <img src={plumberpng} className="w-20 " alt="" />
            </div>
          </div>
        </div>

        {/* about us */}

        {/* services */}
        <div className="pt-28 pb-10 px-12">
          <div className=" grid grid-cols-4 gap-6 ">
            <h2 className="text-hoverblack text-center  bg-buttoncolor arimo inline text-4xl font-semibold  rounded-xl">
              About us
            </h2>
            <p className="col-span-3 text-[16px] font-normal arimo max-w-xl">
              We're the driving force behind your online success, crafting
              strategies that captivate audiences and elevate brands.
            </p>
          </div>
        </div>
        <div className="h-[30rem] rounded-3xl bg-hoverblack p-16 flex  flex-col gap-5">
          <p className="text-primarycolor arimo text-justify ">
            Unicus Creative Media is a leading digital media and marketing
            agency based in Ahmedabad, India. Our agency was founded by Darshan
            Prajapati, who has imense experience in the digital marketing
            industry, and co-founded by Bhavy Chaudhary and Ronak Chaudhary, who
            bring a wealth of experience in social media and content creation.
          </p>
          <p className="text-primarycolor arimo text-justify ">
            Our agency specializes in providing a wide range of services
            including social media management, digital marketing, brand collabs,
            content strategy, video editing, advertising campaigns, and social
            media optimization. Our team of experts work with brands to create
            and implement unique and engaging social media campaigns that help
            increase brand awareness and drive conversions.
          </p>
          <p className="text-primarycolor arimo text-justify ">
            At Unicus Creative Media, we pride ourselves on providing our
            clients with exceptional service and delivering high-quality
            results. We understand the importance of staying up-to-date with the
            latest social media trends and best practices, which is why our team
            of experts are constantly researching and implementing new
            strategies to help our clients stay ahead of the competition.
          </p>
          <Link to={"/"} className="flex gap-3">
            <p className="text-buttoncolor arimo text-[18px]">Learn more </p>{" "}
            <FiArrowUpRight className="text-3xl text-buttoncolor" />{" "}
          </Link>
        </div>

        {/* our team */}

        <div className="pt-28 pb-10 px-12">
          <div className=" grid grid-cols-4 gap-6 ">
            <h2 className="text-hoverblack text-center  bg-buttoncolor arimo inline text-4xl font-semibold  rounded-xl">
              Our Team
            </h2>
            <p className="col-span-3 text-[16px] font-normal arimo max-w-xl">
              Meet the skilled and experienced team behind our successful
              digital marketing strategies
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* imran khan */}
          <div className="h-[16rem] p-4 rounded-3xl border border-hoverblack border-b-[6px] border-b-hoverblack">
            <div className="flex gap-3 items-center justify-center">
              <img src={imranhomepic} className="h-20 w-20  rounded-3xl" alt="" />
              <div className="flex flex-col ">
                {" "}
                <h1 className="arimo text-[16px] font-extrabold">Imran khan</h1>
                <p className="arimo  font-normal text-[16px]">Founder & Web Developer  </p>
              </div>
            
            </div>
            <hr className="border my-5 border-hoverblack"/>
            <p className="arimo text-justify text-hoverblack text-[16px] font-normal">Leading the way in digital marketing, Darshan Prajapati, founder of Unicus Creatives blends </p>
            <p className="arimo text-hoverblack text-[16px] font-normal"> artistry with analytics.</p>
          </div>
          {/* danish */}

          <div className="h-[16rem] p-4 rounded-3xl border border-hoverblack border-b-[6px] border-b-hoverblack">
            <div className="flex gap-3 items-center justify-center">
              <img src={danishkaremhomepic} className="h-20 w-20  rounded-3xl" alt="" />
              <div className="flex flex-col ">
                {" "}
                <h1 className="arimo text-[16px] font-extrabold">Danish kareem</h1>
                <p className="arimo  font-normal text-[16px]">CEO </p>
              </div>
            
            </div>
            <hr className="border my-5 border-hoverblack"/>
            <p className="arimo text-justify text-hoverblack text-[16px] font-normal">Leading the way in digital marketing, Darshan Prajapati, founder of Unicus Creatives blends </p>
            <p className="arimo text-hoverblack text-[16px] font-normal"> artistry with analytics.</p>
          </div>
          {/* atta ur rehman */}
          {/* imran khan */}
          <div className="h-[16rem] p-4 rounded-3xl border border-hoverblack border-b-[6px] border-b-hoverblack">
            <div className="flex gap-3 items-center justify-center">
              <img src={attaurrehamanhomepic} className="h-20 w-20  rounded-3xl" alt="" />
              <div className="flex flex-col ">
                {" "}
                <h1 className="arimo text-[16px] font-extrabold">Atta ur rehman</h1>
                <p className="arimo  font-normal text-[16px]">Co-Founder </p>
              </div>
            
            </div>
            <hr className="border my-5 border-hoverblack"/>
            <p className="arimo text-justify text-hoverblack text-[16px] font-normal">Leading the way in digital marketing, Darshan Prajapati, founder of Unicus Creatives blends </p>
            <p className="arimo text-hoverblack text-[16px] font-normal"> artistry with analytics.</p>
          </div>
        </div>
        {/* cards */}
        <div className="px-10 py-6">
          <div className="pb-20 grid grid-cols-3">
            <div className="col-span-2"> </div>
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
