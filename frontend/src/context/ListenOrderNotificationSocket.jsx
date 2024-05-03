import { createContext, useContext, useEffect, useState } from "react";

import { useSelector } from "react-redux";

import notification from ".././assets/sounds/notification.mp3";
import { useSocketContext } from "./SocketContext";
const SocketContext = createContext();
export const useNotificationSocketContext = () => {
  return useContext(SocketContext);
};

export const NotificaitonSocketContextProvider = ({ children }) => {
  const { socket } = useSocketContext();
  const [newOrder, setNewOrder] = useState(null);
  const { user } = useSelector((state) => state.user);

  const listenOrder = () => {
    socket?.on("order", (neworder) => {
      // newMessage.shouldShake = true;
      console.log(neworder)
    //   const sound = new Audio(notification);
    //   sound.play();
      setNewOrder(neworder);
      

      // setMessages([...messages, newMessage])
    });
  };

  useEffect(() => {
  
      listenOrder();
    
    return () => socket?.off("order");
  }, []);

  return (
    <SocketContext.Provider value={{ newOrder }}>
      {children}
    </SocketContext.Provider>
  );
};
