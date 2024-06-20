import React, { useEffect, useState } from "react";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";
import { loadUserData } from "@/components/Actions/Registration";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import ReactStars from "react-rating-stars-component";
import axiosInstance from "@/ulities/axios";
import { Filter } from "./Filter";
import { errorToast } from "@/Toast/Toast";
import { useSocketContext } from "@/context/SocketContext";
import { OrderCollapse } from "./OrderCollapse";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
const Orders = () => {
  const [activeTab, setActiveTab] = React.useState("Active Orders");
  const { user } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
const getClientPostedOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/api/v1/order/get-client-orders");
      if (data?.success) {
        setOrders(data?.orders);
      }
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }finally{
      setLoading(false);
    }
  }
  const data = [
   
    {
      label: "Active Orders",
      value: "Active Orders",
     
    },
    {
      label: "Expired Orders",
      value: "Expired Orders",
     
    },
    {
      label: "Completed Orders",
      value: "Completed Orders",
    
    },
  ];
// filter by active and expired orders and completed orders
const filterOrders = () => {
  if (activeTab === "All Orders") {
    return orders;
  }
  if (activeTab === "Active Orders") {
    return orders.filter(
      (order) => order?.orderExpireAt > new Date().toISOString()
    );
  }
  if (activeTab === "Expired Orders") {
    return orders.filter(
      (order) => order?.orderExpireAt < new Date().toISOString()
    );
  }
  if (activeTab === "Completed Orders") {
    // return orders.filter((order) => order?.totalOffers?.find(
    //   (offer) => offer?.serviceProvider === user?._id
    // ));
  }
};
// how i use this function
const filteredOrders = filterOrders();
  useEffect(() => {
    getClientPostedOrders();
  }, []);

  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px] bg-cardbg">
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={3} />
        <main className="text-primarycolor w-full">
          <div>
            <Header user={user} />
          </div>

          <div className="px-8 py-6">
            <div className="flex items-center justify-start text-3xl text-hoverblack font-bold mb-10">
              Your Orders
            </div>
            <div className="w-full ">
            <Tabs value={activeTab} className="w-full">
                <TabsHeader
                  className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                  indicatorProps={{
                    className:
                      "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                  }}
                >
                  {data.map(({ label, value }) => (
                    <Tab
                      key={value}
                      value={value}
                      onClick={() => setActiveTab(value)}
                      className={activeTab === value ? "text-gray-900" : ""}
                    >
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
                {/* <TabsBody>
                  {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                      {desc}
                    </TabPanel>
                  ))}
                </TabsBody> */}
              </Tabs>
            {filteredOrders?.map((order) => {
              return (
               
                <OrderCollapse order={order} user={user}/>
              );
            })}
          </div>
            </div>
        </main>
      </div>
    </div>
  );
};

export default Orders;
