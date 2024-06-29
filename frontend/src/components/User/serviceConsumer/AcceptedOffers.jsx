import React, { useEffect, useState } from "react";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";
import {  useSelector } from "react-redux";
import Header from "./Header";
import ReactStars from "react-rating-stars-component";
import axiosInstance from "@/ulities/axios";
import { Filter } from "./Filter";
import { errorToast } from "@/Toast/Toast";
import { AcceptOfferCard } from "./AcceptOfferCard";
import { Badge } from "@material-tailwind/react";

const AcceptedOffers = () => {
    const { user } = useSelector((state) => state.user);
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(false)
    console.log(offers)
    const getAcceptedOffers = async () => {
        try {
            setLoading(true)
            const { data } = await axiosInstance.get("api/v1/order/get-accepted_offers/client");
          if (data.success) {
            setOffers(data.orders);
          }
        } catch (error) {
            errorToast(error?.response?.data?.message);
        }finally{
            setLoading(false)
        }
    
    }

    useEffect(() => {
        getAcceptedOffers();
    }
    , []);
    
return (
    <div className=" w-full h-full mx-auto max-w-[1750px] bg-cardbg">
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={6} />
        <main className="text-primarycolor w-full">
          
            <Header user={user} />
        
          
          <div className="px-8 py-6">
            <div className="flex items-center justify-start text-3xl text-hoverblack font-bold mb-7">
              Your Accepted Offers
            </div>
           <div className="flex flex-wrap gap-8">
           {offers?.map((order) => (
                <Badge content={`${order?.clientSideOrderStatus}`}  className={`text-[12px] px-2 arimo bg-buttoncolor text-hoverblack font-bold select-none ${order?.serviceProviderOrderStatus==="processing"?"bg-green-500":""}`}>
                <AcceptOfferCard order={order}/>
                </Badge>
              ))}
           </div>
              
           
          </div>
          
        </main>
      </div>
    </div>
  );
};

export default AcceptedOffers;
