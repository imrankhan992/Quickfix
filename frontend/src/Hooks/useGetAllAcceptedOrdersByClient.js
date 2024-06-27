import { errorToast } from '@/Toast/Toast'
import axiosInstance from '@/ulities/axios'
import React, { useEffect, useState } from 'react'

const useGetAllAcceptedOrdersByClient = () => {
    const [loading, setLoading] = useState(false)
    const [acceptedOrders, setAcceptedOrders] = useState([])
    const getAllAcceptedOrder = async () => {
      try {
        setLoading(true)
        const { data } = await axiosInstance.get(`api/v1/order/get-all-accepted-order-by-client`);
        if (data.success) {
          setAcceptedOrders(data?.orders)
        }
      } catch (error) {
        errorToast(error?.response?.data?.message);
      } finally {
        setLoading(false)
      }
    }
    useEffect(() => {
      getAllAcceptedOrder()
    }, [])
    
    return {  loading,acceptedOrders }
}

export default useGetAllAcceptedOrdersByClient