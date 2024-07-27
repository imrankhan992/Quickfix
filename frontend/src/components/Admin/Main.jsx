import React, { useEffect, useState } from "react";
import Header from "./Header";

import { IoCartOutline } from "react-icons/io5";
import { SparkChart } from "./Charts/SparkChart";
import { AreaChartHero } from "./Charts/AreaChart";
import { FaUserFriends } from "react-icons/fa";
import { GrUserWorker } from "react-icons/gr";
import { FaRupeeSign } from "react-icons/fa6";
import { ServiceProviderTable } from "./ServiceProviderTable";
import axiosInstance from "@/ulities/axios";
import Loading from "@/Pages/Loading";

const Main = () => {
  const [users, setusers] = useState(0)
  const [spuser, setspuser] = useState(0)
  const [totalOrdersLength, setTotalOrdersLength] = useState(0)
  const countingFunc = async()=>{
    const {data} = await axiosInstance.get("/api/v1/admin/counting");
    if (data?.success) {
      setusers(data?.usersCount)
      setspuser(data?.spUsersCount)
    }
  }
  const getLengthOfOrders = async()=>{
   try {
    const {data} = await axiosInstance.get("/api/v1/total-orders-length");
    if (data?.success) {
      setTotalOrdersLength(data?.ordersLength)
    }
   } catch (error) {
    
   }
  }
  useEffect(() => {
    countingFunc()
    getLengthOfOrders()
  }, [])
  
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        setLoading(true)
        const response = await axiosInstance.get('/api/v1/total-revenue');
        setTotalRevenue(response.data.totalRevenue);
      } catch (error) {
        console.error('Error fetching total revenue:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenue();
  }, []);

  return (
    <>
      <main className="lg:w-[100%] w-full  h-full bg-cardbg">
        <Header />
        <div className="w-full  min-h-screen p-4 flex flex-col gap-4">
          {/* heading */}

          <h3 className="text-hoverblack font-bold text-2xl">Dashboard</h3>
          {/* three divs */}
          <div className="text-primarycolor grid md:grid-cols-4 gap-4 ">
            <div className="border-2 h-52 rounded-xl p-4 bg-primarycolor  ">
              <div className="flex flex-col gap-3 justify-center items-center ">
                <IoCartOutline className=" w-16 h-16 right-3 bottom-20 text-mutedcolor" />
                <h2 className="text-[18px] uppercase font-semibold text-hoverblack">
                  Total Orders
                </h2>
                <h2 className="text-6xl font-bold text-hoverblack arimo">{totalOrdersLength}</h2>
                
              </div>
              {/* graph */}
              
            </div>
            {/* second box */}
            <div className="border-2 h-52 rounded-xl p-4 bg-primarycolor  ">
              <div className="flex flex-col gap-3 justify-center items-center">
                <FaUserFriends className=" w-16 h-16 right-0 text-[#B2EBD9]" />
                <h2 className="text-[18px] uppercase font-semibold text-hoverblack">
                NEW CUSTOMERS</h2>
                <h2 className="text-6xl font-bold text-hoverblack arimo">{users}</h2>
                
              </div>
              {/* graph */}
              
            </div>
            {/* service provider count */}
            
            <div className="border-2 h-52 rounded-xl p-4 bg-primarycolor  ">
              <div className="flex flex-col gap-3 justify-center items-center">
                <GrUserWorker  className=" w-16 h-16 right-0 text-[#FF72C6]" />
                <h2 className="text-[18px] uppercase font-semibold text-hoverblack">
                Service Providers</h2>
                <h2 className="text-6xl font-bold text-hoverblack arimo">{spuser}</h2>
                
              </div>
              {/* graph */}
              
            </div>
             {/* reveniew */}
            
             <div className="border-2 h-52 rounded-xl p-4 bg-primarycolor  ">
              <div className="flex flex-col gap-3 justify-center items-center">
                <FaRupeeSign  className=" w-16 h-16 right-0 text-[#257784]" />
                <h2 className="text-[18px] uppercase font-semibold text-hoverblack">
                TOTAL REVENUE</h2>
                {
                  !loading && <h2 className="text-6xl font-bold text-hoverblack arimo">{totalRevenue}</h2>
                }
                {
                  loading && <Loading/>
                }
                
              </div>
              {/* graph */}
              
            </div>
          </div>
          {/* recent service providers */}
          <div >
          <ServiceProviderTable/> 
          </div>
        </div>
      </main>
    </>
  );
};

export default Main;
