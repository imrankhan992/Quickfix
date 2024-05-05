import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { showtoast } from "@/Toast/Toast";
import notification from "./../assets/sounds/notification.mp3";
import RIdeRequestToast from "@/Toast/RIdeRequestToast";
const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [newOrder, setNewOrder] = useState();
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
        setOnlineUsers(online);
      });

      return () => {
        socket?.close();
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
      value={{ newOrder, setNewOrder, socket, onlineUsers, setOnlineUsers }}
    >
      {children}
    </SocketContext.Provider>
  );
};
