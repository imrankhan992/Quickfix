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

  const { user } = useSelector((state) => state.user);
console.log(user);
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
      socket.on("message",(data)=>{
        console.log(data);
      })
      return () => socket?.close();
    } else {
      socket?.close();
      setSocket(null);
    }
  };
  useEffect(() => {
    initlizeSocket();
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers, setOnlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
