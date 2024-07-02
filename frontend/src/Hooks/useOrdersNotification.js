import { errorToast } from '@/Toast/Toast';
import { useSocketContext } from '@/context/SocketContext';
import axiosInstance from '@/ulities/axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useOrdersNotification = () => {
  const { user } = useSelector(state => state.user)
  console.log(user);
  const { newOrder, setNewOrder } = useSocketContext();
  const [loading, setLoading] = useState(false)
  const getOrders = async () => {

    try {
      setLoading(true)
      const { data } = await axiosInstance.post("/api/v1/order/get-orders", { CityName: user?.city });
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

  return { loading, getOrders };
};

export default useOrdersNotification;