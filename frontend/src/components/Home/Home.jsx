import React from "react";
import { ComplexNavbar } from "../Navbar/Navbar";
import JoinUsCard from "./JoinUsCard";
import { Footer } from "./Footer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import homepagestars from "../../assets/homepage-stars.svg";
import carpenterpng from "../../assets/carpenter.png";
import voltmeterpng from "../../assets/voltmeter.png";
import plumberpng from "../../assets/plumber.png";
import imranhomepic from "../../assets/imranhomepic.png";
import attaurrehamanhomepic from "../../assets/attaurrehamanhomepic.jpg";
import danishkaremhomepic from "../../assets/danishkaremhomepic.jpg";
import { FiArrowUpRight } from "react-icons/fi";

import "swiper/css";
import { Button } from "@material-tailwind/react";

import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { toast } from "react-toastify";

const Home = () => {
  const notify = () => {
    toast(
      <div className="bg-red-500 border-2 ">
        <Button>Accept</Button>
      </div>,
      {
        position: "bottom-right",
        className: "foo-bar",
      }
    );
  };
  return (
    <div className=" w-full  h-[100vh] mx-auto max-w-[1750px] ">
      {/* header */}

      <ComplexNavbar />

      <div className="h-full  md:flex    items-center justify-center  mt-32">
        <div className="text-primarycolor flex flex-col  justify-start items-center mb-10 md:mb-28">
          <div className="grid md:grid-cols-2 md:px-10 px-3 md:gap-4 w-full  h-full ">
            <div className="flex flex-col justify-center ">
              <h2 className="md:text-5xl text-3xl font-bold  text-hoverblack arimo">
                #Home improvements you can trust
              </h2>
              <p className="py-6 text-hoverblack arimo text-justify ">
                Quick Fix is a one stop shop for any small or large jobs around
                your home or business. We work with local reputable tradespeople
                to deliver a quality service, and what’s more our work is
                guaranteed.
              </p>

              <div>
                <a href="#services"  className="px-10 rounded-xl capitalize bg-buttoncolor text-[16px] py-3 text-hoverblack border-b-4 border-hoverblack  hover:bg-[#B9FF66] arimo hover:text-hoverblack font-bold">
                  Get Start
                </a>
              </div>
            </div>

            <div className=" hidden md:block">
              <Swiper
                spaceBetween={30}
                navigation={true}
                modules={[Autoplay, Pagination]}
                className="mySwiper w-40 md:h-full md:w-full shadow-xl rounded-3xl "
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

      <div className="px-3 md:px-10">
        <div className="md:h-[15rem] bg-cardbg rounded-3xl  md:flex   items-center justify-around text-hoverblack md:p-10 p-4">
          <div className="flex  flex-col gap-3 max-w-xl">
            <h1 className="md:text-4xl text-2xl text-hoverblack  inline font-bold arimo">
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
        <div className="pt-12 md:pt-28 pb-10 md:px-12 px-3" id="services">
          <div className=" grid md:grid-cols-4 gap-6 ">
            <h2  className="text-hoverblack text-center  bg-buttoncolor arimo inline md:text-4xl text-2xl font-semibold px-2 rounded-xl">
              Our Services
            </h2>
            <p className="col-span-3 text-[16px] font-normal arimo max-w-xl">
              Connecting customers and technicians for quick, safe, and
              affordable bookings
            </p>
          </div>
        </div>
        {/* services cards */}
        <div className="grid md:grid-cols-3 md:gap-14 gap-8 ">
          <Link to={"/single/services/Carpentar/6684593a399eb54ede427f76"} className="bg-cardbg h-[16rem] relative    rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl p-8">
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
          </Link>
          {/* electration */}
          <Link to={"/single/services/Electrician/6686308e5afe9758dd7f5a82"} className="bg-hoverblack h-[16rem] relative    rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl p-8">
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
          </Link>
          {/* Plumber Services */}
          <Link to={"/single/services/Plumber/668625ca5afe9758dd7f5861"} className="bg-cardbg h-[16rem] relative    rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl p-8">
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
          </Link>
        </div>

        <div className="md:pt-28 pt-10  md:px-12 px-3 pb-10">
          <div className=" grid md:grid-cols-4 gap-6 ">
            <h2 className="text-hoverblack text-center  bg-buttoncolor arimo inline md:text-4xl text-xl px-2 font-semibold  rounded-xl">
              Join QuickFix
            </h2>
            <p className="col-span-3 text-[16px] font-normal arimo max-w-xl">
              Join quick fix and get the best services in town at your doorstep .
            </p>
          </div>
        </div>
        {/* cards */}
        <div className="md:px-10 bg-hoverblack md:p-12 p-4 rounded-3xl">
          <JoinUsCard />
        </div>

        {/* our team */}

        <div className="md:pt-28 pt-10 pb-10 px-3 md:px-12">
          <div className=" grid md:grid-cols-4 gap-6 ">
            <h2 className="text-hoverblack text-center  bg-buttoncolor arimo inline text-xl px-2 md:text-4xl font-semibold  rounded-xl">
              Our Team
            </h2>
            <p className="col-span-3 text-[16px] font-normal arimo max-w-xl">
              Meet the skilled and experienced team behind our successful
              digital marketing strategies
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* imran khan */}
          <div className="h-[16rem] p-4 rounded-3xl border border-hoverblack border-b-[6px] border-b-hoverblack">
            <div className="flex gap-3 items-center justify-center">
              <img
                src={imranhomepic}
                className="h-20 w-20  rounded-3xl"
                alt=""
              />
              <div className="flex flex-col ">
                {" "}
                <h1 className="arimo text-[16px] font-extrabold">Imran khan</h1>
                <p className="arimo  font-normal text-[16px]">
                  Founder & Web Developer{" "}
                </p>
              </div>
            </div>
            <hr className="border my-5 border-hoverblack" />
            <p className="arimo text-justify text-hoverblack text-[16px] font-normal">
              Leading the way in digital marketing, Darshan Prajapati, founder
              of Unicus Creatives blends{" "}
            </p>
            <p className="arimo text-hoverblack text-[16px] font-normal">
              {" "}
              artistry with analytics.
            </p>
          </div>
          {/* danish */}

          <div className="h-[16rem] p-4 rounded-3xl border border-hoverblack border-b-[6px] border-b-hoverblack">
            <div className="flex gap-3 items-center justify-center">
              <img
                src={danishkaremhomepic}
                className="h-20 w-20  rounded-3xl"
                alt=""
              />
              <div className="flex flex-col ">
                {" "}
                <h1 className="arimo text-[16px] font-extrabold">
                  Danish kareem
                </h1>
                <p className="arimo  font-normal text-[16px]">CEO </p>
              </div>
            </div>
            <hr className="border my-5 border-hoverblack" />
            <p className="arimo text-justify text-hoverblack text-[16px] font-normal">
              Leading the way in digital marketing, Darshan Prajapati, founder
              of Unicus Creatives blends{" "}
            </p>
            <p className="arimo text-hoverblack text-[16px] font-normal">
              {" "}
              artistry with analytics.
            </p>
          </div>
          {/* atta ur rehman */}
          {/* imran khan */}
          <div className="h-[16rem] p-4 rounded-3xl border border-hoverblack border-b-[6px] border-b-hoverblack">
            <div className="flex gap-3 items-center justify-center">
              <img
                src={attaurrehamanhomepic}
                className="h-20 w-20  rounded-3xl"
                alt=""
              />
              <div className="flex flex-col ">
                {" "}
                <h1 className="arimo text-[16px] font-extrabold">
                  Atta ur rehman
                </h1>
                <p className="arimo  font-normal text-[16px]">Co-Founder </p>
              </div>
            </div>
            <hr className="border my-5 border-hoverblack" />
            <p className="arimo text-justify text-hoverblack text-[16px] font-normal">
              Leading the way in digital marketing, Darshan Prajapati, founder
              of Unicus Creatives blends{" "}
            </p>
            <p className="arimo text-hoverblack text-[16px] font-normal">
              {" "}
              artistry with analytics.
            </p>
          </div>
        </div>

        {/* about us */}

        <div className="md:pt-28  pt-10 pb-10 md:px-12 px-3">
          <div className=" grid md:grid-cols-4 gap-6 ">
            <h2 className="text-hoverblack text-center  bg-buttoncolor arimo inline px-2 md:text-4xl text-xl font-semibold  rounded-xl">
              About us
            </h2>
            <p className="col-span-3 text-[16px] font-normal arimo max-w-xl">
              We're the driving force behind your online success, crafting
              strategies that captivate audiences and elevate brands.
            </p>
          </div>
        </div>
        <div className="md:h-[30rem] rounded-3xl bg-hoverblack md:p-16 p-3 flex  flex-col gap-5">
          <p className="text-primarycolor arimo  ">
            Unicus Creative Media is a leading digital media and marketing
            agency based in Ahmedabad, India. Our agency was founded by Darshan
            Prajapati, who has imense experience in the digital marketing
            industry, and co-founded by Bhavy Chaudhary and Ronak Chaudhary, who
            bring a wealth of experience in social media and content creation.
          </p>
          <p className="text-primarycolor arimo ">
            Our agency specializes in providing a wide range of services
            including social media management, digital marketing, brand collabs,
            content strategy, video editing, advertising campaigns, and social
            media optimization. Our team of experts work with brands to create
            and implement unique and engaging social media campaigns that help
            increase brand awareness and drive conversions.
          </p>
          <p className="text-primarycolor arimo  ">
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
        {/* area we cover */}
        {/* Areas we cover  */}

        <div className="md:pt-28  pt-10 pb-10 md:px-12 px-3">
          <div className=" grid md:grid-cols-4 gap-6 ">
            <h2 className="text-hoverblack text-center  bg-buttoncolor arimo inline md:text-4xl text-xl px-2 font-semibold  rounded-xl">
              Contact us
            </h2>
            <p className="col-span-3 text-[16px] font-normal arimo max-w-xl">
              Quick Fix is based in Haripur , Abbottabad & Mansehra and we cover
              the whole of the those cities.
            </p>
          </div>
        </div>
        <div className="">
          <div className="grid md:grid-cols-3  bg-cardbg rounded-3xl items-center justify-center">
            <div className="md:col-span-2 md:p-20 p-3 flex flex-col gap-4 w-full ">
              {/* name */}
              <div className="flex flex-col gap-4 w-full ">
                <Label htmlFor="Name" className="arimo text-[16px] font-normal">
                  Name
                </Label>
                <Input
                  type="text"
                  id="Name"
                  placeholder="Please enter your full name"
                  className="arimo bg-primarycolor focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl "
                />
              </div>
              {/* email */}
              <div className="flex flex-col gap-4">
                <Label
                  htmlFor="Email"
                  className="arimo text-[16px] font-normal"
                >
                  Email
                </Label>
                <Input
                  type="text"
                  id="Email"
                  placeholder="Please enter a valid email"
                  className="arimo bg-primarycolor focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl"
                />
              </div>
              {/* message */}
              <div className="flex flex-col gap-4">
                <Label
                  htmlFor="message"
                  className="arimo text-[16px] font-normal"
                >
                  Message
                </Label>
                <Textarea
                  id="message"
                  placeholder="Display your  message briefly"
                  className="h-20 arimo bg-primarycolor focus:border-black focus:bg-buttoncolor p-6 rounded-xl"
                />
                <Button className="arimo text-[16px] hover:bg-buttoncolor hover:text-hoverblack">
                  Send Message
                </Button>
              </div>
            </div>
            <div className="p-10 md:p-4">
              <img src={homepagestars} alt="" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
