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
  const [totalActiveOrdersLength, setTotalActiveOrdersLength] = useState(0);
  const [cancelOrderLength, setCancelOrderLength] = useState(0);
  const getActiveOrderLength = async () => {
    try {
      setLengthLoading(true);
      const { data } = await axiosInstance.get(
        `/api/v1/order/get-all-active-orders-client`
      );
      if (data?.success) {
        setOrderLength(data.totalOrdersLength);
        setTotalActiveOrdersLength(data.totalOrdersLengthBySpecificClient);
        setCancelOrderLength(data.cancelOrderLength);
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
          // Check if both client and service provider order statuses are completed
          const isOrderCompleted =
            order?.clientSideOrderStatus === "completed" &&
            order?.serviceProviderOrderStatus === "completed";

          // Check if a review exists for this order
          const reviewExists = order?.serviceProvider?.reviews?.some(
            (item) => item.order.toString() === order?.order?._id.toString()
          );

          // Show RatingsAlert component if order is completed and review doesn't exist
          return isOrderCompleted && !reviewExists ? (
            <RatingsAlert orders={order} index={index} />
          ) : null;
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
                 
                  <span className="text-[#1F1E30] font-bold ">
                    {totalActiveOrdersLength}
                  </span>
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
                    Cancel Orders
                  </h2>
                </div>

                <div className="flex gap-2 justify-center items-center">
                  <h1 className="text-5xl text-mutedcolor font-bold">
                    <span className="text-[#1F1E30] font-bold ">
                      {cancelOrderLength}
                    </span>
                  </h1>
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
