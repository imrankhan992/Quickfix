import { useEffect } from "react";
import notification from "../assets/sounds/notification.mp3";
import RIdeRequestToast from "@/Toast/RIdeRequestToast";
import { useSocketContext } from "@/context/SocketContext";
import { showtoast } from "@/Toast/Toast";

const useListenOrder = () => {
  const { socket, newOrder, setNewOrder } = useSocketContext();

  useEffect(() => {

    socket?.on("order", (neworder) => {
      console.log(neworder, "this is socket.on emit");
      neworder.shouldNotify = true;
      const sound = new Audio(notification);
      sound.play();
      RIdeRequestToast(neworder);
      setNewOrder(neworder);
    });


    return () => {
      // Clean up the event listener
      socket?.off("order");
    };
  }, [socket]);

  return null; // You can return null or anything you want here
};

export default useListenOrder;
