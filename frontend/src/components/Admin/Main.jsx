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

const Main = () => {
  const [users, setusers] = useState(0)
  const [spuser, setspuser] = useState(0)
  const countingFunc = async()=>{
    const {data} = await axiosInstance.get("/api/v1/admin/counting");
    if (data?.success) {
      setusers(data?.usersCount)
      setspuser(data?.spUsersCount)
    }
  }
  useEffect(() => {
    countingFunc()
  }, [])
  
  return (
    <>
      <main className="lg:w-[100%] w-full  h-full bg-cardbg">
        <Header />
        <div className="w-full  min-h-screen p-4 flex flex-col gap-4">
          {/* heading */}

          <h3 className="text-hoverblack font-bold text-2xl">Dashboard</h3>
          {/* three divs */}
          <div className="text-primarycolor grid md:grid-cols-4 gap-4 ">
            <div className="border-2 h-52 rounded-md p-4 bg-primarycolor  ">
              <div className="flex flex-col gap-3 justify-center relative">
                <IoCartOutline className="absolute w-16 h-16 right-0 text-mutedcolor" />
                <h2 className="text-[18px] uppercase font-semibold text-hoverblack">
                  Total Orders
                </h2>
                <h2 className="text-3xl font-medium text-hoverblack">14253</h2>
                <p className="text-[15px] text-mutedcolor font-normal">
                  <span className="text-greencolor">8.5%</span> New Sessions
                  Today
                </p>
              </div>
              {/* graph */}
              
            </div>
            {/* second box */}
            <div className="border-2 h-52 rounded-md p-4 bg-primarycolor  ">
              <div className="flex flex-col gap-3 justify-center relative">
                <FaUserFriends className="absolute w-16 h-16 right-0 text-[#B2EBD9]" />
                <h2 className="text-[18px] uppercase font-semibold text-hoverblack">
                NEW CUSTOMERS</h2>
                <h2 className="text-3xl font-medium text-hoverblack">{users}</h2>
                <p className="text-[15px] text-mutedcolor font-normal">
                  <span className="text-red-800">3.5%</span> New Sessions
                  Today
                </p>
              </div>
              {/* graph */}
              
            </div>
            {/* service provider count */}
            
            <div className="border-2 h-52 rounded-md p-4 bg-primarycolor  ">
              <div className="flex flex-col gap-3 justify-center relative">
                <GrUserWorker  className="absolute w-16 h-16 right-0 text-[#FF72C6]" />
                <h2 className="text-[18px] uppercase font-semibold text-hoverblack">
                Service Providers</h2>
                <h2 className="text-3xl font-medium text-hoverblack">{spuser}</h2>
                <p className="text-[15px] text-mutedcolor font-normal">
                  <span className="text-red-800">3.5%</span> New Sessions
                  Today
                </p>
              </div>
              {/* graph */}
              
            </div>
             {/* reveniew */}
            
             <div className="border-2 h-52 rounded-md p-4 bg-primarycolor  ">
              <div className="flex flex-col gap-3 justify-center relative">
                <FaRupeeSign  className="absolute w-16 h-16 right-0 text-[#257784]" />
                <h2 className="text-[18px] uppercase font-semibold text-hoverblack">
                TOTAL REVENUE</h2>
                <h2 className="text-3xl font-medium text-hoverblack">85000</h2>
                <p className="text-[15px] text-mutedcolor font-normal">
                  <span className="text-greencolor">7.5%</span> New Sessions
                  Today
                </p>
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
