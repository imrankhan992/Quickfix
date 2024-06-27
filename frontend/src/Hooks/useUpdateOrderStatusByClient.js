import React, { useState } from 'react'
import axiosInstance from './../ulities/axios';
import { errorToast } from '@/Toast/Toast';
import { SuccessToast } from '@/Toast/Toastify';

const useUpdateOrderStatusByClient = () => {
  const [UpdateLoading, setUpdateLoading] = useState(false)
  const updateStatus = async ({ clientSideOrderStatus, orderId }) => {
    try {
      setUpdateLoading(true)
      const { data } = await axiosInstance.put(`api/v1/order/update-order-status/client/${orderId}`, { clientSideOrderStatus });
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

export default useUpdateOrderStatusByClient