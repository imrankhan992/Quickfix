import { showtoast } from "@/Toast/Toast";
import { useSocketContext } from "@/context/SocketContext";
import React, { useEffect } from "react";
import notification from "../assets/sounds/notification.mp3";
const useListenOrder = () => {
  const { newOrder } = useSocketContext();
  useEffect(() => {
    const showOrderToast = () => {
      const sound = new Audio(notification);
      sound.play();
      showtoast(newOrder?.address);
    };
    if (newOrder !== null) {
      showOrderToast();
    }
  }, [newOrder]);
};

export default useListenOrder;
