import axiosInstance from "@/ulities/axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";

import Rating from "react-rating-stars-component";
import Loading from "@/Pages/Loading";
import AccountHealth from "@/components/User/ServiceProvider/AccountHealth";

const UserProfileAdmin = () => {
  const [serviceProvider, setServiceProvider] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const getServiceProvider = async () => {
    setLoading(true);
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/single-service-Provider/${id}`
      );
      if (data.success) {
        setServiceProvider(data.user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getServiceProvider();
  }, []);

  return (
    <div className="container mx-auto p-5">
      {!loading && (
        <>
          {/* User Profile Card */}
          <div className="flex flex-col  bg-white shadow-lg rounded-lg p-6">
            <h1 className="font-bold text-2xl">Account id:  {serviceProvider?._id}</h1>
           <div className="flex items-center justify-between">
           <div className="flex items-center justify-start gap-3  w-full">
              <img
                className="w-32 h-32 rounded-full border-4 border-indigo-500"
                src={serviceProvider?.avatar?.url}
                alt="User Avatar"
              />
              <div>
                <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                  {serviceProvider?.firstname} {serviceProvider?.lastname}
                </h2>
                <div className="mt-4 flex flex-col items-center">
                  <div className="flex items-center mt-2">
                    <Rating
                      value={serviceProvider?.ratings}
                      readOnly={true}
                      precision={0.5}
                      edit={false}
                      size={window.innerWidth < 600 ? 20 : 35}
                      isHalf={true}
                    />
                    <span className="ml-2 text-gray-700">
                      ({serviceProvider?.ratings})
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <AccountHealth user={serviceProvider} />
           </div>
            <div className="mt-4 flex flex-col items-start">
              <h3 className="text-lg font-semibold">Years of Experience</h3>
              <p className="text-gray-700 mt-2">
                {serviceProvider?.experience}
              </p>
            </div>

            <div className="mt-4 text-start max-w-[60%]">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-gray-700 mt-2">
                {serviceProvider?.description}
              </p>
            </div>
            <div className="mt-4 text-start max-w-[60%]">
              <h3 className="text-lg font-semibold">Address</h3>
              <p className="text-gray-700 mt-2">{serviceProvider?.address}</p>
            </div>
            <div className="mt-4 text-start max-w-[60%]">
              <h3 className="text-lg font-semibold">City</h3>
              <p className="text-gray-700 mt-2">{serviceProvider?.city}</p>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold">Reviews</h3>
            <div className="space-y-4 mt-4">
              {/* Example Review */}
              {serviceProvider?.reviews?.map(({ name, rating, feedback }) => (
                <div className="bg-white shadow-md rounded-lg p-4">
                  <div className="flex items-center">
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://via.placeholder.com/50"
                      alt="Reviewer Avatar"
                    />
                    <div className="ml-4">
                      <h4 className="font-semibold">{name}</h4>
                      <p className="text-gray-500">2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <Rating
                      value={rating}
                      readOnly={true}
                      precision={0.5}
                      edit={false}
                      size={window.innerWidth < 600 ? 20 : 35}
                      isHalf={true}
                    />
                  </div>
                  <p className="text-gray-700 mt-2">{feedback}</p>
                </div>
              ))}
              {/* Add more reviews as needed */}
            </div>
          </div>
        </>
      )}

      {loading && <Loading />}
    </div>
  );
};

export default UserProfileAdmin;
