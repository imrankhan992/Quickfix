import { errorToast } from '@/Toast/Toast';
import { useSocketContext } from '@/context/SocketContext';
import axiosInstance from '@/ulities/axios';
import React, { useEffect, useState } from 'react';

const useOrdersNotification = () => {
  const { newOrder, setNewOrder } = useSocketContext();
  const [loading, setLoading] = useState(false)
  const getOrders = async () => {

    try {
      setLoading(true)
      const { data } = await axiosInstance.get("/api/v1/order/get-orders");
      if (data?.success) {
        setNewOrder(data?.orders)
      }
    } catch (error) {
      errorToast(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getOrders()
  }, []);

  return {loading,getOrders};
};

export default useOrdersNotification;