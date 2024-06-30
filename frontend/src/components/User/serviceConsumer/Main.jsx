import React, { useEffect, useState } from "react";
import Header from "./Header";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import { PiMoney } from "react-icons/pi";
import { VscLayersActive } from "react-icons/vsc";
import { MdOutlineSentimentSatisfied } from "react-icons/md";
import { IoIosAlert } from "react-icons/io";
import useGetAllAcceptedOrdersByClient from "@/Hooks/useGetAllAcceptedOrdersByClient";
import Loading from "@/Pages/Loading";
import Alert from "@/components/AlertForUpdateOrders/Alert";
import { RatingsAlert } from "@/components/AlertForUpdateOrders/RatingsAlert";
import axiosInstance from "@/ulities/axios";

const Main = ({ user, products }) => {
  const [lengthLoading, setLengthLoading] = useState(false);
  const [orderLength, setOrderLength] = useState(0);
  const [totalActiveOrdersLength, setTotalActiveOrdersLength] = useState(0)
  const getActiveOrderLength = async () => {
    try {
      setLengthLoading(true);
      const { data } = await axiosInstance.get(
        `/api/v1/order/get-all-active-orders-client`
      );
      if (data?.success) {
        setOrderLength(data.totalOrdersLength);
        setTotalActiveOrdersLength(data.totalOrdersLengthBySpecificClient)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLengthLoading(false);
    }
  };

  useEffect(() => {
    if (user?._id) {
      getActiveOrderLength();
    }
  }, [user?._id]);

  const { loading, acceptedOrders } = useGetAllAcceptedOrdersByClient();

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
                <Alert order={order} user={user} />
              ) : (
                ""
              );
            })}
          </>
        )}
        {/* check if clientSideOrderStatus and serviceProviderOrderStatus === completed then give review */}
        {acceptedOrders?.map((order, index) => {
          return order?.clientSideOrderStatus === "completed" &&
            order?.serviceProviderOrderStatus === "completed" ? (
            <>
              {order?.serviceProvider?.reviews?.find(
                (item) => item.user.toString() === user?._id.toString()
              ) ? (
                ""
              ) : (
                <RatingsAlert orders={order} index={index} />
              )}
            </>
          ) : (
            ""
          );
        })}
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
                  RS <span className="text-[#1F1E30] font-bold ">{totalActiveOrdersLength}</span>
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
                  <span className="text-[#1F1E30] font-bold ">
                    {orderLength}
                  </span>
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
                    <p className="text-[#1F1E30] font-medium">
                      {user?.ratings}
                    </p>
                  </div>{" "}
                  <p className="text-[#1F1E30] font-medium">
                    {user?.ratings > 4 ? "Excellent" : "Fair"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          
         
        </div>

        
        
      </div>
    </main>
  );
};

export default Main;
