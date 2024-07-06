import { useEffect, useRef, useState } from "react";
import notification from "../assets/sounds/notification.mp3";
import RIdeRequestToast from "@/Toast/RIdeRequestToast";
import { useSocketContext } from "@/context/SocketContext";
import OfferNotification from "@/Toast/OfferNotification";

const useListenOffer = () => {
  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("sendOffer", (newOffer) => {
      
      newOffer.shouldNotify = true;
      const sound = new Audio(notification);
      sound.play();
      OfferNotification(newOffer);
    });
    return () => {
      socket?.off("sendOffer");
    };
  }, [socket]);
};

export default useListenOffer;
