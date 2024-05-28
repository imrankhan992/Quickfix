import React, { useState, useEffect } from "react";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./Notification.css";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSocketContext } from "@/context/SocketContext";
import notification from "../../../assets/notification.gif";
import useOrdersNotification from "@/Hooks/useOrdersNotification";

export function Notification() {
  const { newOrder } = useSocketContext();
  const { getOrders } = useOrdersNotification();
  const [viewedNotifications, setViewedNotifications] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const handleNotificationClick = (orderId) => {
    if (!viewedNotifications.includes(orderId)) {
      setViewedNotifications([...viewedNotifications, orderId]);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="hover:animate-pulse">
          <div className="notification">
            <div className="bell-container">
              <div className="bell"></div>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 p-0 m-0 overflow-scroll h-[500px] scroll-smooth bg-cardbg ">
        {newOrder?.length > 0 &&
          newOrder.map((order) => {
            const isViewed = viewedNotifications.includes(order._id);
            return (
              <div
                key={order._id}
                onClick={() => handleNotificationClick(order._id)}
                className={`border-b px-4 flex items-center justify-center gap-3 py-2 cursor-pointer ${
                  isViewed ? "bg-cardbg" : "bg-red-500"
                } hover:bg-[#ECF8FE] hover:transition-transform`}
              >
                <div>
                  <div className="flex items-center gap-3 justify-between border-cardborder">
                    <img
                      src={order?.clientId?.avatar?.url}
                      alt=""
                      className="w-12"
                    />
                    <p>{order?.serviceId?.title}</p>
                  </div>
                  <p className="text-sm text-mutedcolor">{order?.address}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-mutedcolor">2 hours ago</p>
                    <p className="font-bold">RS{order?.price}</p>
                  </div>
                </div>
                <div>
                  <BsThreeDotsVertical className="text-3xl cursor-pointer" />
                </div>
              </div>
            );
          })}
        {newOrder?.length === 0 && (
          <div className="flex items-center relative p-10">
            <img
              src={notification}
              alt=""
              className="w-56 h-56 absolute top-0"
            />
            <p className="text-xl font-bold z-50">No order Found</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
