import axiosInstance from "@/ulities/axios";
import React, { useRef } from "react";
import { IdleTimerProvider } from "react-idle-timer";

const IdleTimerContainer = ({ children }) => {
  const IdleTimerRef = useRef(null);
  const onIdle = async () => {
    // activeStatus, lastActive

    try {
      const { data } = await axiosInstance.put("/api/v1/account/active", {
        activeStatus: "Offline",
        lastActive: new Date().toISOString(), // Set the last active timestamp
      });
    } catch (error) {
      console.error("Error updating service provider status:", error);
    }
  };
  //   onactive

  const onActive = async () => {
    try {
      const { data } = await axiosInstance.put("/api/v1/account/active", {
        activeStatus: "Online",
      });
      console.log(data);
    } catch (error) {
      console.error("Error updating service provider status:", error);
    }
  };
  return (
    <div>
      <IdleTimerProvider
        ref={IdleTimerRef}
        onActive={onActive}
        timeout={60 * 1000}
        onIdle={onIdle}
      >
        {children}
      </IdleTimerProvider>
    </div>
  );
};

export default IdleTimerContainer;
