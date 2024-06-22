import { errorToast, showtoast } from '@/Toast/Toast';
import { useSocketContext } from '@/context/SocketContext';
import axiosInstance from '@/ulities/axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const useDeleteOrder = () => {
    const { requestOrderId } = useSocketContext();
const [sendOrderLoading, setSendOrderLoading] = useState(false)
const navigate = useNavigate()
    const deleteOrder = async () => {
        try {
            setSendOrderLoading(true)
            const { data } = await axiosInstance.delete(
                `/api/v1/order/delete-order/${requestOrderId}`,
                { headers: { "Content-Type": "application/json" } }
            );
            if (data?.success) {
                navigate(-1)
                showtoast(data?.message);
            }
        } catch (error) {
            errorToast(error?.response?.data?.message);
        }finally{
            setSendOrderLoading(false)
        }
    };
    return { deleteOrder,sendOrderLoading };

 
}

export default useDeleteOrder