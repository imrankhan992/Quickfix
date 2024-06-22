import React, { useEffect, useState } from "react";
import { ComplexNavbar } from "../Navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { errorToast } from "@/Toast/Toast";
import axiosInstance from "@/ulities/axios";
import ReactStars from "react-rating-stars-component";
import { Button } from "@material-tailwind/react";
import { useSocketContext } from "@/context/SocketContext";

const SingleServices = () => {
  const { services, id } = useParams();
  const { setOrderExpiresTime,orderExpiresTime } = useSocketContext();
  console.log(orderExpiresTime, "this is setOrderExpiresTime");
  setOrderExpiresTime("");
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
  }, [services,id]);

  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px]">
      {/* header */}
    
        <ComplexNavbar />
     
      <div className="px-8 py-10 w-full h-full mt-16  ">
        <div className="w-full bg-buttoncolor md:h-[35%] rounded-xl grid md:grid-cols-2 py-8  px-8">
          {" "}
          <h3 className="text-hoverblack md:text-4xl text-2xl md:col-span-2 arimo font-bold">{services}</h3>
          <p className="text-hoverblack md:text-xl text-sm pt-3 arimo ">
            {services === "Electrician Services" &&
              "Dismantling your Electrical worries - Complete Electrical Solutions  for Residentials & Commercials"}
                {services === "Plumber Services" &&
              "From Plumbing Installs, Repairs, and Upgrades – We Fix it All"}
                {services === "Carpenter" &&
              "Wood Fixtures, Construct, Build, Install and More..."}
          </p>
        </div>
        {/* service */}
        <div className="py-10 ">
          <h3 className="text-hoverblack arimo text-[18px] font-bold  py-6">{services}</h3>
          <div className="grid md:grid-cols-3 gap-3  ">
            {products?.map((product, index) => {
              return (
                <div 
                  key={index}
                  className="flex gap-2 border p-4 rounded-xl border-hoverblack bg-cardbg shadow-xl"
                >
                  <div className="text-hoverblack ">
                    <img
                      src={product?.picture?.url}
                      className="w-32 h-32 rounded-lg object-contain"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h1 className="text-hoverblack arimo">{product?.title}</h1>
                    <p className=" text-mutedcolor arimo">{product?.description}</p>
                    <p className="text-hoverblack arimo">Rs:{product?.price}</p>
                    <div className="flex justify-between items-center gap-3">
                      <div className="flex items-center justify-center">
                        <p className="text-hoverblack arimo">
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
                      {/* select */}
                      <Link className="arimo capitalize rounded-xl text-primarycolor bg-hoverblack text-[12px] px-4 py-2" to={`/service/find/serviceproviders/nearby/${product?._id}`}>Select</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleServices;
