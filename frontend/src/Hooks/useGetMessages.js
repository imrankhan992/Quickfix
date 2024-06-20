import React, { useEffect, useState } from 'react'
import { useSocketContext } from '@/context/SocketContext';
import axiosInstance from '@/ulities/axios';
import { useParams } from 'react-router-dom';

const useGetMessages = () => {
    const {id} = useParams()
    const {messages,setMessages} = useSocketContext();
    const [loading, setLoading] = useState(false)
    const getAllMessages = async () => {
      try {
        setLoading(true)
        const { data } = await axiosInstance.get(`api/v1/messages/get-all-messages/${id}`);
        if(data?.success){
          setMessages(data.messages)
        }
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false)
      }
    }
useEffect(() => {
    getAllMessages()
}, [])

    return {loading,messages}
}

export default useGetMessages