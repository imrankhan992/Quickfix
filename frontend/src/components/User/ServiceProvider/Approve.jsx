import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import ReactStars from "react-rating-stars-component";
import { PiMoney } from "react-icons/pi";
import { VscLayersActive } from "react-icons/vsc";
import { MdOutlineSentimentSatisfied } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import useGetAllAcceptedOrdersByProvider from "@/Hooks/useGetAllAcceptedOrdersByProvider";
import Loading from "@/Pages/Loading";
import Alert from "@/components/AlertForUpdateOrders/Alert";
import axiosInstance from "@/ulities/axios";
import Rating from "react-rating-stars-component";
const Approve = () => {
  const [balance, setBalance] = useState(0);
  const [orderLength, setOrderLength] = useState(0);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [LengthLoading, setLengthLoading] = useState(false);
  const fetchWalletBalance = async () => {
    try {
      setBalanceLoading(true);
      const { data } = await axiosInstance.get(`/api/v1/wallet/${user?._id}`);
      if (data?.success) {
        setBalance(data.balance);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setBalanceLoading(false);
    }
  };

  // get all active orders

  const getActiveOrderLength = async () => {
    try {
      setLengthLoading(true);
      const { data } = await axiosInstance.get(
        `/api/v1/order/get-all-active-orders`
      );
      if (data?.success) {
        setOrderLength(data?.totalOrdersLength);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLengthLoading(false);
    }
  };
  const { loading, acceptedOrders } = useGetAllAcceptedOrdersByProvider();

  const { user } = useSelector((state) => state.user);
  const { reviews } = user;
  console.log(reviews, "this is the reviews");

  useEffect(() => {
    if (user?._id) {
      fetchWalletBalance();
      getActiveOrderLength();
    }
  }, [user?._id]);

  return (
    <>
      <main className="text-primarycolor w-full  bg-cardbg">
        <div className="md:px-8 flex justify-between py-4 ">
          <h1 className="md:text-2xl  hidden md:block text-[#1F1E30] font-bold">
            Welcome back {user?.firstname + " " + user?.lastname}
          </h1>
          <Header user={user} />
        </div>
        {loading && <Loading />}

        {acceptedOrders?.length > 0 && !loading && (
          <>
            {acceptedOrders?.map((order) => {
              return (order?.clientSideOrderStatus === "completed" &&
                order?.serviceProviderOrderStatus === "pending") ||
                order?.serviceProviderOrderStatus === "processing" ? (
                <Alert order={order} user={user} />
              ) : (
                ""
              );
            })}
          </>
        )}
        <div className="md:p-6 py-4 flex gap-4 items-center justify-center">
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
                  {!balanceLoading && (
                    <h1 className="text-5xl text-mutedcolor font-bold">
                      RS{" "}
                      <span className="text-[#1F1E30] font-bold ">
                        {balance}
                      </span>
                    </h1>
                  )}

                  {balanceLoading && <Loading />}
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
                      {user?.ratings > 4.5
                        ? "Excellent"
                        : user?.ratings > 4
                        ? "Very Good"
                        : user?.ratings > 3.5
                        ? "Good"
                        : user?.ratings > 3
                        ? "Fair"
                        : user?.ratings > 2.5
                        ? "Average"
                        : "Poor"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* customer feedback*/}
            <div className="py-10 text-center md:text-start">
              <h1 className="text-3xl text-hoverblack font-bold ">
                Customer Feedback:
              </h1>

              <div className="flex items-center  py-8 flex-wrap gap-4  justify-center">
                {reviews?.map((review) => {
                  return (
                    <div className="w-full md:max-w-md p-6 bg-cardbg shadow-md rounded-md">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <img
                            className="text-lg font-bold text-hoverblack"
                            src={`https://avatar.iran.liara.run/username?username=${review?.name}]`}
                          ></img>
                        </div>
                        <div className="ml-4">
                          <div className="flex items-center  gap-4">
                          <h3 className="text-lg font-semibold text-hoverblack">
                            {review?.name}

                          </h3>
                          {/* date */}
                            <h2 className="text-sm font-semibold text-gray-600">{review?.date}</h2>
                          </div>
                          <p className="text-sm text-gray-500">
                            Order ID: {review?.order}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        <Rating
                          value={review?.rating}
                          readOnly={true}
                          precision={0.5}
                          edit={false}
                          size={window.innerWidth < 600 ? 20 : 35}
                          isHalf={true}
                        />
                        <span className="ml-2 text-hoverblack font-bold">
                          {review?.rating}
                        </span>
                      </div>
                      <p className="text-hoverblack">{review?.feedback}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Approve;
