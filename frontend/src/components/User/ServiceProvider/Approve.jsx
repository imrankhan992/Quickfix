import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import ReactStars from "react-rating-stars-component";
import { PiMoney } from "react-icons/pi";
import { VscLayersActive } from "react-icons/vsc";
import { MdOutlineSentimentSatisfied } from "react-icons/md";
import { FaStar } from "react-icons/fa";

const Approve = ({ products }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <main className="text-primarycolor w-full  bg-cardbg">
        <div className="px-8 grid grid-cols-2 py-4 ">
          <h1 className="text-2xl  text-[#1F1E30] font-bold">
            Welcome back {user?.firstname + " " + user?.lastname}
          </h1>
          <Header user={user} />
        </div>
        <div className="p-6 flex gap-4">
          <div>
            <div className="grid md:grid-cols-3  gap-2">
              {/* total revene dev */}
              <div className="bg-primarycolor border h-40 rounded-3xl shadow-md">
                <div className="flex flex-col p-4  items-center justify-center  w-full h-full">
                  <div className="flex items-center justify-center gap-2">
                    <div className="p-3 bg-[#FAE2D5] rounded-full">
                      {" "}
                      <PiMoney className="text-[#1F1E30] text-4xl " />
                    </div>
                    <h2 className="text-xl text-[#1F1E30] font-semibold ">
                      Account Balance
                    </h2>
                  </div>
                  <h1 className="text-5xl text-mutedcolor font-bold">
                    RS <span className="text-[#1F1E30] font-bold ">100</span>
                  </h1>
                </div>
              </div>
              {/* Active Orders */}
              <div className="bg-primarycolor border h-40 rounded-3xl shadow-md">
                <div className="flex flex-col p-4  items-center justify-center  w-full h-full">
                  <div className="flex items-center justify-center gap-2">
                    <div className="p-3 bg-[#F1FCC6] rounded-full">
                      {" "}
                      <VscLayersActive className="text-[#1F1E30] text-4xl " />
                    </div>
                    <h2 className="text-xl text-[#1F1E30] font-semibold ">
                      Active Orders
                    </h2>
                  </div>
                  <h1 className="text-5xl text-mutedcolor font-bold">
                    <span className="text-[#1F1E30] font-bold ">0</span>
                  </h1>
                </div>
              </div>

              {/* Customer Satisfactions */}
              <div className="bg-primarycolor border h-40 rounded-3xl shadow-md">
                <div className="flex flex-col p-4 justify-between  w-full h-full">
                  <div className="flex items-center justify-center gap-2">
                    <div className="p-3 bg-[#DDDDF5] rounded-full">
                      {" "}
                      <MdOutlineSentimentSatisfied className="text-[#1F1E30] text-4xl " />
                    </div>
                    <h2 className="text-xl text-[#1F1E30] font-semibold ">
                      Customer Satisfaction
                    </h2>
                  </div>
                  <div className="flex justify-evenly  gap-2  ">
                    <p className="text-[#1F1E30] font-semibold">Rate</p>{" "}
                    <p className="text-[#1F1E30] font-semibold">Type</p>{" "}
                  </div>
                  <div className="flex gap-2 justify-evenly">
                    <div className="flex gap-2 justify-between">
                      <FaStar className="text-xl text-yellow-900" />{" "}
                      <p className="text-[#1F1E30] font-medium">4.9</p>
                    </div>{" "}
                    <p className="text-[#1F1E30] font-medium">Excellent</p>
                  </div>
                </div>
              </div>
            </div>

            {/* recent orders */}
            <div className="py-10">
              <h1 className="text-3xl text-hoverblack font-bold">
                Recent orders:
              </h1>
              <p className="text-red-500 text-xl text-center p-6">
                Orders history not found.
              </p>
            </div>
            {/* customer feedback*/}
            <div className="py-10">
              <h1 className="text-3xl text-hoverblack font-bold">
                Customer Feedback:
              </h1>

              <div className="flex items-center justify-center py-8">
                <p className="text-red-500 text-xl text-center p-6">
                  Not found
                </p>
              </div>
            </div>
          </div>
         
      
        </div>
      </main>
    </>
  );
};

export default Approve;
