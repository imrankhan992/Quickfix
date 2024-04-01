import React, { useEffect, useState } from "react";
import { ComplexNavbar } from "../Navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { errorToast } from "@/Toast/Toast";
import axiosInstance from "@/ulities/axios";
import ReactStars from "react-rating-stars-component";

const SingleServices = () => {
  const { services, id } = useParams();

  const [products, setproducts] = useState([]);
  const getsingleserviceByCategory = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/admin/get-all-products/by-category/${id}`
      );
      if (data?.success) {
        setproducts(data?.products);
      }
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };
  useEffect(() => {
    getsingleserviceByCategory();
  }, []);

  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px]">
      {/* header */}
      <div className=" border-b border-bordercolor">
        <ComplexNavbar />
      </div>
      <div className="px-8 py-10 w-full h-full">
        <div className="w-full bg-[#0F52BA] h-[35%] rounded-lg grid grid-cols-2 py-8  px-8">
          {" "}
          <h3 className="text-primarycolor text-4xl col-span-2 ">{services}</h3>
          <p className="text-primarycolor text-xl pt-3">
            {services === "Electrician Services" &&
              "Dismantling your Electrical worries - Complete Electrical Solutions  for Residentials & Commercials"}
                {services === "Plumber Services" &&
              "From Plumbing Installs, Repairs, and Upgrades – We Fix it All"}
                {services === "Carpenter Services" &&
              "Wood Fixtures, Construct, Build, Install and More..."}
          </p>
        </div>
        {/* service */}
        <div className="py-10 ">
          <h3 className="text-primarycolor text-xl py-6">{services}</h3>
          <div className="grid grid-cols-3 gap-3">
            {products?.map((product, index) => {
              return (
                <Link to={`/service/detail/single/service/${product?._id}`}
                  key={index}
                  className="flex gap-2 border p-4 rounded-lg bg-thirdcolor"
                >
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
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleServices;
