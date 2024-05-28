import { useSocketContext } from "@/context/SocketContext";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import SendOffer from "./SendOffer";
import { useSelector } from "react-redux";

export function OrdersTable({ activeTab }) {
  const { user } = useSelector((state) => state.user);
  const { newOrder } = useSocketContext();

  const formateDate = (date) => {
    //  I WANT TO GET live counter that how many time remaining in order expire
    const newDate = new Date(date);
    return newDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  // filter by active and expired orders and completed orders
  const filterOrders = (orders) => {
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
  const filteredOrders = filterOrders(newOrder);
  useEffect(() => {
    // if chang in active tab then filter the orders
    filterOrders(newOrder);
  }, [activeTab, newOrder]);

  return filteredOrders?.map((order) => {
    return (
      <>
        <div className="border-x-2  shadow-md w-full select-none  flex-col bg-primarycolor   mb-4">
          <div className="flex items-center justify-start w-full gap-16 py-5 px-8 bg-[#FAFAFA] border-y-2">
            <div>
              <p className="font-bold">Order placed</p>
              <span className="text-mutedcolor">2/4/2024</span>
            </div>
            <div>
              <p className="font-bold">Order Expiry Date</p>
              <span className="text-mutedcolor">24/5/2024</span>
            </div>
            <div>
              <p className="font-bold">Address</p>
              <span className="text-mutedcolor">{order?.address}</span>
            </div>
            <div className="font-bold flex flex-col justify-center items-center">
              <p className="font-bold ">Expire At</p>
              {/* convert this       orderExpireAt         in readable date and time */}

              <span className="text-mutedcolor">
                {formateDate(order?.orderExpireAt)}
              </span>
            </div>
          </div>
          {/* second part */}
          <div className="flex  items-center w-full   justify-self-auto gap-28 py-5 px-6">
            <div>
              <img
                src={order?.clientId?.avatar?.url}
                className="w-20 h-20"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-10">
                <p>{order?.serviceId?.title}</p>
                <span
                  className={`${
                    order?.orderExpireAt < new Date().toISOString()
                      ? "bg-errorcolor"
                      : "bg-greencolor"
                  } py-2 px-5 text-primarycolor rounded-full arimo`}
                >
                  {order?.orderExpireAt > new Date().toISOString()
                    ? "Active"
                    : "Expired"}
                </span>
              </div>
              {/*description  */}
              <div>
                <p>{order?.serviceId?.description}</p>
              </div>
            </div>
            {/* third part */}
            <div className="flex gap-10">
              <div className="flex items-center justify-center flex-col">
                <p className="font-bold text-xl arimo">Quantity</p>
                <p className="font-bold text-xl arimo">{order?.quantity}</p>
              </div>

              <div className="flex flex-col gap-5">
                <p>
                  <b className="arimo text-[22px]">RS{order?.price}</b>
                </p>
                {/* check if already send offer then disable button */}
                {order?.totalOffers?.find(
                  (offer) => offer?.serviceProvider === user?._id
                ) ? (
                  <Button
                    className="bg-buttoncolor arimo text-[16px] arimo text-hoverblack"
                    disabled
                  >
                    Offer Sent
                  </Button>
                ) : (
                  <SendOffer order={order} />
                )}

                {/* <SendOffer order={order} /> */}
              </div>
            </div>
          </div>
          {/* footer */}
          <div className="flex items-center justify-start w-full gap-16 py-5 px-8 bg-[#FAFAFA] border-y-2">
            <div className="flex gap-4">
              <p className="font-bold">Appointment Date:</p>
              <span className="text-mutedcolor">2/4/2024</span>
            </div>
          </div>
        </div>
      </>
    );
  });
}
