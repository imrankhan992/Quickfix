import React, { useEffect } from "react";
import dateFormate from "@/Hooks/dateFormate";
import { useSelector } from "react-redux";

const Messages = ({ message }) => {
    const { user } = useSelector((state) => state.user);
    const {formateDate} = dateFormate()
    const fromMe =  message?.senderId=== user._id
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePicture = fromMe ? user.avatar.url : user?.profilePic;
    const bubbleBg = fromMe ? "bg-blue-500":""
    const username = fromMe ? user.firstname : "Second person"
   
    const shakeClass = message.shouldShake ? "shake":"";
  
    
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
