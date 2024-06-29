import React, { useEffect, useState } from "react";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";
import { useSelector } from "react-redux";
import Header from "./Header";
import ReactStars from "react-rating-stars-component";
import axiosInstance from "@/ulities/axios";
import { Filter } from "./Filter";
import { errorToast } from "@/Toast/Toast";

import { Badge } from "@material-tailwind/react";
import { AcceptOfferCard } from "./AcceptedOfferCard";

const AcceptedOffers = () => {
  const { user } = useSelector((state) => state.user);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAcceptedOffers = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        "api/v1/order/get-accepted_offers/service_provider"
      );
      if (data.success) {
        setOffers(data.orders);
      }
    } catch (error) {
      errorToast(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAcceptedOffers();
  }, []);

  return (
    <div className=" w-full h-screen mx-auto max-w-[1750px] bg-cardbg">
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={3} />
        <main className="text-primarycolor w-full">
          <Header user={user} />

          <div className="px-8 py-6">
            <div className="flex items-center justify-start text-3xl text-hoverblack font-bold mb-7">
              Your Accepted Offers
            </div>
            {!loading &&
              offers?.length > 0 &&
              offers?.map((order) => (
                <Badge
                content={`${order?.serviceProviderOrderStatus}`}
                  className="text-[15px] armo bg-buttoncolor text-hoverblack font-bold select-none"
                >
                  <AcceptOfferCard order={order} />
                </Badge>
              ))}
            {!loading && offers?.length === 0 && (
              <div className="text-center text-mutedcolor text-xl font-bold">
                No Accepted Offers
              </div>
            )}
            {loading && (
              <div className="text-center text-mutedcolor text-xl font-bold">
                Loading...
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AcceptedOffers;
