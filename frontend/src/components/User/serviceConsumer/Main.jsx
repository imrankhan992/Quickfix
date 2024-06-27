import React, { useState } from "react";
import Header from "./Header";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import { PiMoney } from "react-icons/pi";
import { VscLayersActive } from "react-icons/vsc";
import { MdOutlineSentimentSatisfied } from "react-icons/md";
import { IoIosAlert } from "react-icons/io";
import useGetAllAcceptedOrdersByClient from "@/Hooks/useGetAllAcceptedOrdersByClient";
import Loading from "@/Pages/Loading";

const Main = ({ user, products }) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const { loading, acceptedOrders } = useGetAllAcceptedOrdersByClient();
  console.log(acceptedOrders, "this is accepted orders");
  return (
    <main className="text-primarycolor w-full h-full">
      <Header user={user} />

      <div className="p-6">
        {loading && <Loading />}

        {acceptedOrders?.length > 0 && !loading && (
          <>
            {acceptedOrders?.map((order) => {
              return order?.clientSideOrderStatus === "pending" &&
                order?.serviceProviderOrderStatus === "completed" ? (
                <div className=" bg-[#FFF6D1] shadow-md mb-2 flex gap-3 items-start p-4 rounded-lg border-l-4 border-[#F58802]">
                  <IoIosAlert color="#F58802" size={25} className="text" />
                  <div>
                    <h1 className="arimo font-bold text-hoverblack">
                      Alert:
                    </h1>
                    <p className="text-hoverblack max-w-xl text-sm">
                      {" "}
                      your Project   is{" "}
                      <strong>completed </strong> by the service provider Side
                      but from your side is still pending . <span className="text-">Project id ( <strong>{order?._id}</strong>)</span>
                    </p>
                  </div>
                </div>
              ) : (
                ""
              );
            })}
          </>
        )}
        <h1 className="text-3xl pb-4 text-hoverblack pt-2 font-bold armo">
          Hello! {user?.firstname + " " + user?.lastname}
        </h1>
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
                    Total Orders
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
              <p className="text-red-500 text-xl text-center p-6">Not found</p>
            </div>
          </div>
        </div>

        {/* recent orders */}
        <div className="py-10">
          <h1 className="text-3xl">Recent orders:</h1>
          <p className="text-red-500 text-xl text-center p-6">
            You have placed no orders.
          </p>
        </div>
        {/* top 10 services */}
        <div className="py-10">
          <h1 className="text-3xl">Latest Service:</h1>

          <div className="grid md:grid-cols-3 gap-3  w-full h-full py-8 ">
            {products?.map((product) => {
              return (
                <>
                  <div className="flex gap-2 border p-4 rounded-lg bg-thirdcolor">
                    <div className="text-primarycolor">
                      <img
                        src={product?.picture?.url}
                        className="w-32 h-32 rounded-lg object-contain"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-primarycolor">{product?.title}</h1>
                      <p className=" text-mutedcolor">{product?.description}</p>
                      <p className="text-primarycolor">Rs:{product?.price}</p>
                      <div className="flex justify-between gap-3">
                        <div className="flex items-center justify-center">
                          <p className="text-primarycolor">
                            <ReactStars
                              count={5}
                              size={20}
                              activeColor="#ffd700"
                              edit={false}
                              value={0}
                              half={true}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Main;
