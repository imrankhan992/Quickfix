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
import { Button, Chip } from "@material-tailwind/react";
import dateFormate from "@/Hooks/dateFormate";
import { MessageSpeedDial } from "./SpeedDial";
import { useSocketContext } from "@/context/SocketContext";
import OrderStatusUpdate from "./OrderStatusUpdate";
import { useFormik } from 'formik';
import { UpdateOrderStatusSchemaByClient } from "@/Schemas";
import useUpdateOrderStatusByClient from "@/Hooks/useUpdateOrderStatusByClient";
import data from "./StatusUpdateData";

const SingleAcceptedOrder = () => {
  const { selectedConversation, setSelectedConversation } = useSocketContext();
  const { formateDate } = dateFormate();
  const { user } = useSelector((state) => state.user);
  const [offers, setOffers] = useState();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState()
const {updateStatus,UpdateLoading} = useUpdateOrderStatusByClient()
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
    setSelectedConversation(offers?.serviceProvider)
  }
  useEffect(() => {
    getAcceptedOffersById();
    
  }, [id]);
 
// formik 
const {
  values,
  handleBlur,
  handleChange,
  handleSubmit,
  setFieldValue,
  errors,
  touched,
} = useFormik({
  initialValues: {
    clientSideOrderStatus:"",
    orderId:""
  },
  validationSchema: UpdateOrderStatusSchemaByClient,
  onSubmit: async (values, { setSubmitting }) => {
   await updateStatus(values)
  },
});
// set initial value of formik
  useEffect(() => {
    setFieldValue("clientSideOrderStatus",status);
    setFieldValue("orderId",offers?._id)
  }, [status,offers?._id])
 
  return (
    <div className=" w-full h-full mx-auto max-w-[1750px] bg-cardbg relative">
      <MessageSpeedDial id={offers?.serviceProvider?._id} />
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={6} />
        <main className="text-primarycolor w-full ">
          <Header user={user} />

          <div className="md:px-8 py-6  ">
            <div className="flex flex-col  justify-start  mb-7">
              <h5 className="md:text-3xl text-lg text-hoverblack font-bold">
                {" "}
                Order Id: {id}
              </h5>
              <Chip
                className={`inline-block arimo px-2 arimo bg-buttoncolor text-hoverblack font-bold  ${offers?.serviceProviderOrderStatus==="processing"?"bg-green-500":""}`}
                value={`${offers?.finalOrderStatus==="Incomplete"?offers?.serviceProviderOrderStatus:offers?.finalOrderStatus}`}
                
                
              />
            </div>

            <div className=" mx-auto bg-white rounded-lg shadow-lg p-4 md:p-8 mt-12 text-hoverblack select-none ">
              <div className="flex md:flex-row flex-col gap-3 justify-between items-center border-b pb-4 mb-4 relative">
                
                <h1 className="text-2xl font-bold">Order Details</h1>
                <div className="flex flex-col gap-2">
                  <h2 className="font-bold text-hoverblack">Update Order Status</h2>
               <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
               <OrderStatusUpdate status={status} setStatus={setStatus} handleBlur={handleBlur} data={data} />
               {
                errors?.clientSideOrderStatus  && (<p className="arimo text-errorcolor text-sm">{errors?.clientSideOrderStatus}</p>)
               }
              {
                UpdateLoading ? <Button  color="blue" disabled>Loading...</Button> : <Button color="blue" type="submit">Update</Button>
              }
               </form>
                </div>
                <div className="text-green-600 font-bold">Accepted</div>
              </div>
              <div className="bg-gray-100 rounded-lg p-6 mb-6">
                <h2 className="text-lg font-semibold mb-2 underline">
                  Service Provider Details
                </h2>
                <div className="">
                  <img
                    src={offers?.serviceProvider?.avatar?.url}
                    alt="Service Provider"
                    className="w-24 h-24 mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-lg font-semibold">
                    {offers?.serviceProvider?.firstname}
                    {offers?.serviceProvider?.lastname}
                  </h3>
                  <p>{offers?.serviceProvider?.email}</p>
                  <p>{offers?.serviceProvider?.phoneNumber}</p>
                  <p>{offers?.serviceProvider?.address}</p>
                  <p>{offers?.serviceProvider?.experience} of Experience</p>
                  <div className="flex items-center justify-center mt-2">
                    <ReactStars
                      count={5}
                      size={30}
                      activeColor="#ffd700"
                      edit={false}
                      value={3.9}
                      half={true}
                    />
                    <span className="text-xl font-bold">4.8</span>
                  </div>
                </div>
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
          </div>
        </main>
      </div>
    </div>
  );
};

export default SingleAcceptedOrder;
