import React, { useEffect, useState } from "react";
import dateFormate from "@/Hooks/dateFormate";
import { useSelector } from "react-redux";
import { useSocketContext } from "@/context/SocketContext";
import { useNavigate } from "react-router-dom";
import useListenMessages from "@/Hooks/useListenMessages";

const Messages = ({ message }) => {
  useListenMessages()
  const {selectedConversation} = useSocketContext()
  const navigate = useNavigate()
    const { user } = useSelector((state) => state.user);
    const {formateDate} = dateFormate()
    const fromMe =  message?.senderId=== user?._id
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePicture = fromMe ? user?.avatar?.url : selectedConversation?.avatar?.url;
    const bubbleBg = fromMe ? "bg-blue-500":""
    const username = fromMe ? user?.firstname : selectedConversation?.firstname+ " " + selectedConversation?.lastname

    const shakeClass = message.shouldShake ? "shake":"";
    console.log(selectedConversation,"this is selected conversation")
   useEffect(() => {
     if(selectedConversation===null && user?.role==="user"){
     return navigate(`/${user?.role}/dashboard/accepted-orders`)
     }
     if(selectedConversation===null && user?.role==="serviceprovider"){
     return navigate(`/${user?.role}/dashboard/orders`)
     }
   }, [])
   
  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={profilePicture}
            />
          </div>
        </div>
        <div className="chat-header flex gap-5 text-hoverblack">
          {username}
         
        </div>
        <div className={`chat-bubble ${bubbleBg} ${shakeClass}`}>{message?.message}</div>
        <div className="chat-footer opacity-50 text-hoverblack"> <time className="text-xs opacity-50 text-hoverblack">{formateDate(message.createdAt)}</time></div>
        
      </div>
     
    </>
  );
};

export default Messages;
