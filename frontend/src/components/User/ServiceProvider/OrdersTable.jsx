import { useSocketContext } from "@/context/SocketContext";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import SendOffer from "./SendOffer";
import { useSelector } from "react-redux";
import axiosInstance from "@/ulities/axios";
import { errorToast } from "@/Toast/Toast";

export function OrdersTable({ activeTab }) {
  const { user } = useSelector((state) => state.user);
  const { newOrder, setNewOrder } = useSocketContext();
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/v1/order/get-orders", { CityName: user?.city });
      if (data?.success) {
        setNewOrder(data?.orders);
      }
    } catch (error) {
      errorToast(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, [user?._id]);

  const formateDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  const filterOrders = (orders) => {
    if (activeTab === "All Orders") {
      return orders;
    }
    if (activeTab === "Active Orders") {
      return orders.filter((order) => order?.orderExpireAt > new Date().toISOString());
    }
    if (activeTab === "Expired Orders") {
      return orders.filter((order) => order?.orderExpireAt < new Date().toISOString());
    }
    return orders;
  };

  const filteredOrders = filterOrders(newOrder);

  useEffect(() => {
    filterOrders(newOrder);
  }, [activeTab, newOrder]);

  return filteredOrders?.map((order) => {
    const twoPercent = order?.price * 0.2;
    console.log(twoPercent,"this is two percent")

    return (
      user?.walletBalance >= twoPercent && (
        <div key={order._id} className="w-full">
          <div className="border-x-2 shadow-md w-full select-none flex-col bg-primarycolor mb-4">
            <div className="md:flex items-center justify-start w-full md:gap-16 py-5 px-8 bg-[#FAFAFA] border-y-2 text-hoverblack">
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
                <p className="font-bold">Expire At</p>
                <span className="text-mutedcolor">{formateDate(order?.orderExpireAt)}</span>
              </div>
            </div>
            <div className="flex md:flex-row flex-col items-center w-full justify-self-auto md:gap-28 py-5 px-6">
              <div>
                <img src={order?.serviceId?.picture?.url} className="w-20 h-20" alt="" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex gap-10">
                  <p>{order?.serviceId?.title}</p>
                  <span
                    className={`${
                      order?.orderExpireAt < new Date().toISOString() ? "bg-errorcolor" : "bg-greencolor"
                    } py-2 px-5 text-primarycolor rounded-full arimo`}
                  >
                    {order?.orderExpireAt > new Date().toISOString() ? "Active" : "Expired"}
                  </span>
                </div>
                <div>
                  <p>{order?.serviceId?.description}</p>
                </div>
              </div>
              <div className="flex gap-10">
                <div className="flex items-center justify-center flex-col">
                  <p className="font-bold text-xl arimo">Quantity</p>
                  <p className="font-bold text-xl arimo">{order?.quantity}</p>
                </div>
                <div className="flex flex-col gap-5">
                  <p>
                    <b className="arimo text-[22px]">RS{order?.price}</b>
                  </p>
                  {order?.totalOffers?.find((offer) => offer?.serviceProvider === user?._id) ? (
                    <Button className="bg-buttoncolor arimo text-[16px] arimo text-hoverblack" disabled>
                      Offer Sent
                    </Button>
                  ) : (
                    <SendOffer order={order} />
                  )}
                </div>
              </div>
            </div>
            <div className="md:flex items-center justify-start w-full gap-16 py-5 px-8 bg-[#FAFAFA] border-y-2 text-hoverblack">
              <div className="flex gap-4">
                <p className="font-bold">Appointment Date:</p>
                <span className="text-mutedcolor">2/4/2024</span>
              </div>
            </div>
          </div>
        </div>
      )
    );
  });
}
