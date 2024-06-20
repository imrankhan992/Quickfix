import { errorToast } from '@/Toast/Toast';
import { useSocketContext } from '@/context/SocketContext';
import axiosInstance from '@/ulities/axios';
import React, { useState } from 'react'

const sendMessage = () => {
    const [loading, setLoading] = useState(false)
    const {messages, setMessages} = useSocketContext()
    console.log(messages);
 const sendMessage = async (message, id) => {
    console.log(id)
    try {
        setLoading(true);
      const { data } = await axiosInstance.post(`api/v1/messages/send/${id}`, {
        message,
        serviceProvider: id,
      });
      if (data.success) {
        setMessages([...messages, data.newMessage]);
      }
    } catch (error) {
     errorToast(error?.response?.data?.message || error.message)
    }finally{
        setLoading(false);
    }
 }
 return {sendMessage, loading}
}

export default sendMessage