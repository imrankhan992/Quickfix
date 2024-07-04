import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const SocketContext = createContext();
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  
  const [newOrder, setNewOrder] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [requestOrderId, setRequestOrderId] = useState();
  const [orderExpiresTime, setOrderExpiresTime] = useState();
  const [expiresOrderId, setExpiresOrderId] = useState()
  // https://noahai.ai 
  const initlizeSocket = () => {
    if (user) {
      const socket = io("https://quickfix-8pw7.onrender.com", {
        query: {
          userId: user?._id,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (online) => {
        setOnlineUsers(online);
      });
      socket.on("connect", () => {
        console.log("Connected to the server");
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
      value={{
        requestOrderId,
        setRequestOrderId,
        newOrder,
        setNewOrder,
        socket,
        onlineUsers,
        setOnlineUsers,
        messages,
        setMessages,
        selectedConversation,
        setSelectedConversation,
        orderExpiresTime,
        setOrderExpiresTime,
        expiresOrderId, setExpiresOrderId
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
