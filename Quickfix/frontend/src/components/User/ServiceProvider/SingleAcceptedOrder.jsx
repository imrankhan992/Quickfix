import React, { useEffect, useState } from "react";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";
import { useSelector } from "react-redux";
import Header from "./Header";
import ReactStars from "react-rating-stars-component";
import axiosInstance from "@/ulities/axios";
import { Filter } from "./Filter";
import { errorToast } from "@/Toast/Toast";

import { useParams } from "react-router-dom";
import { Chip } from "@material-tailwind/react";
import dateFormate from "@/Hooks/dateFormate";
import { MessageSpeedDial } from "./MessageSpeedDial";
import Loading from "@/Pages/Loading";
import { useSocketContext } from "@/context/SocketContext";


const SingleAcceptedOrder = () => {
  const { selectedConversation, setSelectedConversation }  = useSocketContext()
  const { formateDate } = dateFormate();
  const { user } = useSelector((state) => state.user);
  const [offers, setOffers] = useState();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const getAcceptedOffersById = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `api/v1/order/get-accepted_offers/client/${id}`
      );
      if (data.success) {
        setOffers(data.order);
      }
    } catch (error) {
      errorToast(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  if(offers){
    setSelectedConversation(offers?.order?.clientId)
  }
  useEffect(() => {
    getAcceptedOffersById();
  
  }, [id]);
console.log(offers,"this is offers")
  return (
    <div className=" w-full h-full mx-auto max-w-[1750px] bg-cardbg relative">
      <MessageSpeedDial id={offers?.clientId} />
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={3} />
        <main className="text-primarycolor w-full ">
          <Header user={user} />

         {!loading&& <div className="px-8 py-6  ">
            <div className="flex flex-col  justify-start  mb-7">
              <h5 className="text-3xl text-hoverblack font-bold">
                {" "}
                Order Id: {id}
              </h5>
              <Chip
                color="green"
                value="Pending"
                className="inline-block arimo"
              />
            </div>

            <div className=" mx-auto bg-white rounded-lg shadow-lg p-8 mt-12 text-hoverblack select-none ">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h1 className="text-2xl font-bold">Order Details</h1>
                <div className="text-green-600 font-bold">Accepted</div>
              </div>
             
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-2 underline">
                  Service Details
                </h2>
                <p>
                  <strong>Title:</strong> {offers?.order?.serviceId?.title}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {offers?.order?.serviceId?.description}
                </p>
                <img
                  src={offers?.order?.serviceId?.picture?.url}
                  alt="Service Image"
                  className="w-24 h-24 mx-auto rounded-lg mb-4"
                />
                <p>
                  <strong>Price:</strong> RS{offers?.price}
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-2 underline">
                  Order Details
                </h2>
                <p className="text-hoverblack">
                  <strong>City:</strong> {offers?.order?.CityName}
                </p>
                <p>
                  <strong>Address:</strong> {offers?.order?.address}
                </p>
                <p>
                  <strong>Appointment Date and Time:</strong>{" "}
                  {formateDate(offers?.order?.dateandtime)}
                </p>

                <p>
                  <strong>Price:</strong>RS{offers?.price}
                </p>
                <p>
                  <strong>Quantity:</strong> {offers?.order?.quantity}
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg p-6">
                <iframe
                  className="w-full h-64 rounded-lg"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAUI_hqf3GJQ7c80e0rK9aki1fT6kDVuiU&q=${offers?.order?.CityName}, Pakistan`}
                  allowFullScreen
                  title="map"
                ></iframe>
              </div>
            </div>
          </div>}
          {loading && (
            <Loading/>
          )}
        </main>
      </div>
    </div>
  );
};

export default SingleAcceptedOrder;
