import { useEffect, useRef, useState } from "react";
import notification from "../assets/sounds/notification.mp3";
import RIdeRequestToast from "@/Toast/RIdeRequestToast";
import { useSocketContext } from "@/context/SocketContext";
import OfferNotification from "@/Toast/OfferNotification";
import ConsumerNotification from "@/Toast/ConsumerNotification";

const useListenOrder = () => {
  const { socket, setNewOrder } = useSocketContext();


  useEffect(() => {


    socket?.on("order", (newOrder) => {
      console.log(newOrder,"order listen by service provider")
      newOrder.shouldNotify = true;
      const sound = new Audio(notification);
      sound.play();
      ConsumerNotification(newOrder);
      setNewOrder((prevOrders) => [...prevOrders, newOrder]);
    });


    return () => {
      socket?.off("order");
    };
  }, [socket, setNewOrder]);
};

export default useListenOrder;
