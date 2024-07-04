import { errorToast, showtoast } from "@/Toast/Toast";
import { useSocketContext } from "@/context/SocketContext";
import axiosInstance from "@/ulities/axios";
import React, { useState } from "react";

const useSendOrder = () => {

    const [loading, setLoading] = useState(false);
    const [mapTracking, setMapTracking] = useState(false)
    const { socket, setRequestOrderId,setOrderExpiresTime, setExpiresOrderId } = useSocketContext();
    const sendOrder = async (values) => {
        setLoading(true)
        try {
            const { data } = await axiosInstance.post(
                "/api/v1/order/send",
                values,
                { headers: { "Content-Type": "application/json" } }
            );
            // console.log(data?.newOrder, "this is new order")
            setOrderExpiresTime(data?.newOrder?.orderExpireAt)
            setExpiresOrderId(data?.newOrder?._id)
            if (data?.success) {
                setRequestOrderId(data?.newOrder?._id);
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
    return { sendOrder, loading, setMapTracking, mapTracking };
};

export default useSendOrder;
