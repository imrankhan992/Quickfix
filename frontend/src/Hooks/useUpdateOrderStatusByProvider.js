import  { useState } from 'react'
import axiosInstance from './../ulities/axios';
import { errorToast } from '@/Toast/Toast';
import { SuccessToast } from '@/Toast/Toastify';

const useUpdateOrderStatusByProvider = () => {
  const [UpdateLoading, setUpdateLoading] = useState(false)
  const updateStatus = async ({ serviceProviderOrderStatus, orderId }) => {
    try {
      setUpdateLoading(true)
      const { data } = await axiosInstance.put(`api/v1/order/update-order-status/provider/${orderId}`, { serviceProviderOrderStatus });
      if (data.success) {
        SuccessToast(data.message);
      }
    } catch (error) {
      errorToast(error?.response?.data?.message);
    } finally {
      setUpdateLoading(false)
    }
  }
  return { updateStatus, UpdateLoading }
}

export default useUpdateOrderStatusByProvider