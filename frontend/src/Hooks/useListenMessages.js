import React, { useEffect } from 'react'


import notification from "../assets/sounds/notification.mp3"
import { useSocketContext } from '@/context/SocketContext';
import toast from 'react-hot-toast';
const useListenMessages = () => {
    const {socket ,messages, setMessages } = useSocketContext();
   
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            const sound = new Audio(notification);
            sound.play();
            setMessages([...messages, newMessage]);
            toast.success("You have a new message")

        })
        return () => {
            socket?.off("newMessage")
        }
    }, [socket, messages, setMessages])

}

export default useListenMessages