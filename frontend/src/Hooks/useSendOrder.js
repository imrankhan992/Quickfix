import { errorToast, showtoast } from "@/Toast/Toast";
import { useSocketContext } from "@/context/SocketContext";
import axiosInstance from "@/ulities/axios";
import React, { useState } from "react";

const useSendOrder = () => {
    const [loading, setLoading] = useState(false);
    const [mapTracking, setMapTracking] = useState(false)
    const { socket } = useSocketContext();
    const sendOrder = async (values) => {
        setLoading(true)
        try {
            const { data } = await axiosInstance.post(
                "http://localhost:4000/api/v1/order/send",
                values,
                { headers: { "Content-Type": "application/json" } }
            );
            if (data?.success) {
                setMapTracking(true)
                setLoading(false)
                showtoast("please wait for the response");
                socket?.emit("order", data?.newOrder);
            }
        } catch (error) {
            setMapTracking(false)
            errorToast(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };
    return { sendOrder, loading,setMapTracking,mapTracking };
};

export default useSendOrder;
