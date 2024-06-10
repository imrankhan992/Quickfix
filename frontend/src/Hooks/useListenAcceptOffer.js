import { useEffect, useRef, useState } from "react";
import notification from "../assets/sounds/notification.mp3";
import RIdeRequestToast from "@/Toast/RIdeRequestToast";
import { useSocketContext } from "@/context/SocketContext";
import OfferNotification from "@/Toast/OfferNotification";
import { showtoast } from "@/Toast/Toast";

const useListenOfferAccept = () => {
  const { socket  } = useSocketContext();
  const audioContextRef = useRef(
    new (window.AudioContext || window.webkitAudioContext)()
  );
  const [play, setPlay] = useState(false);

  useEffect(() => {
    

    socket?.on("offerAccepted", (order) => {
      order.shouldNotify = true;
      const sound = new Audio(notification);
      sound.play();
      showtoast("Congratulation! your offer has been accepted");
      
    });
    return () => {
      socket?.off("offerAccepted");
    };
   
  }, [socket]);
};

export default useListenOfferAccept;
