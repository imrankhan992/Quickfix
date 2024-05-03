import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { showtoast } from "@/Toast/Toast";

const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newOrder, setNewOrder] = useState(null);
  const { user } = useSelector((state) => state.user);

  const initlizeSocket = () => {
    if (user) {
      const socket = io("http://localhost:4000", {
        query: {
          userId: user?._id,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (online) => {
        console.log(online);
        setOnlineUsers(online);
      });
      socket?.on("order", (neworder) => {
        // newMessage.shouldShake = true;
        // const sound = new Audio(notification);
        // sound.play();
        setNewOrder(neworder);
        // showtoast(neworder?.address)

        // setMessages([...messages, newMessage])
      });

      return () => {
        socket?.close();
        socket?.off("order");
      };
    } else {
      socket?.close();
      setSocket(null);
    }
  };

  useEffect(() => {
    initlizeSocket();
  }, [user]);

  return (
    <SocketContext.Provider
      value={{ newOrder, socket, onlineUsers, setOnlineUsers }}
    >
      {children}
    </SocketContext.Provider>
  );
};
