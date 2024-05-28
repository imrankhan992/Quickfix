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

const SingleAcceptedOrder = () => {
    const {formateDate} = dateFormate()
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
  useEffect(() => {
    getAcceptedOffersById();
  }, [id]);
  console.log(offers);

  return (
    <div className=" w-full h-screen mx-auto max-w-[1750px] bg-cardbg">
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={6} />
        <main className="text-primarycolor w-full">
          <Header user={user} />

          <div className="px-8 py-6">
            <div className="flex flex-col  justify-start  mb-7">
             <h5 className="text-3xl text-hoverblack font-bold"> Order Id: {id}</h5>
             <Chip color="green" value="Pending" className="inline-block arimo" />
            </div>
            <div className=" mx-auto bg-white rounded-lg shadow-lg p-8 mt-12 text-hoverblack">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h1 className="text-2xl font-bold">Order Details</h1>
                <div className="text-green-600 font-bold">Accepted</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-2">
                  Service Provider Details
                </h2>
                <div className="">
                  <img
                    src={offers?.serviceProvider?.avatar?.url}
                    alt="Service Provider"
                    className="w-24 h-24 mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-lg font-semibold">{offers?.serviceProvider?.firstname}{offers?.serviceProvider?.lastname}</h3>
                  <p>{offers?.serviceProvider?.email}</p>
                  <p>{offers?.serviceProvider?.phoneNumber}</p>
                  <p>
                  {offers?.serviceProvider?.address}
                  </p>
                  <p>{offers?.serviceProvider?.experience}</p>
                  <div className="flex items-center justify-center mt-2">
                    <ReactStars readOnly className="text-xl"/>
                    <span className="text-sm">4.8</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-2">Service Details</h2>
                <p>
                  <strong>Title:</strong> {offers?.order?.serviceId?.title}
                </p>
                <p>
                  <strong>Description:</strong> {offers?.order?.serviceId?.description}
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
                <h2 className="text-lg font-semibold mb-2">Order Details</h2>
                <p className="text-hoverblack">
                  <strong>City:</strong> {offers?.order?.CityName}
                </p>
                <p>
                  <strong>Address:</strong> {offers?.order?.address}
                </p>
                <p>
                  <strong>Appointment Date and Time:</strong> {formateDate(offers?.order?.dateandtime)}
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
                  src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAUI_hqf3GJQ7c80e0rK9aki1fT6kDVuiU&q=Abbottabad, Pakistan"
                  allowFullScreen
                  title="map"
                ></iframe>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SingleAcceptedOrder;
