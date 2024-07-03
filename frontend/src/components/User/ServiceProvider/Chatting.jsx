import React, { useEffect, useRef, useState } from "react";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";
import { useSelector } from "react-redux";
import Header from "./Header";
import ReactStars from "react-rating-stars-component";
import axiosInstance from "@/ulities/axios";

import { useSocketContext } from "@/context/SocketContext";
import useGetMessages from "@/Hooks/useGetMessages";

import { getRandomEmoji } from "@/ulities/emojies";
import { useParams } from "react-router-dom";
import { Chip } from "@material-tailwind/react";
import SendMessageInput from "../serviceConsumer/SendMessageInput";
import MessageSkeleton from "../serviceConsumer/MessageSkeleton";
import Messages from "../serviceConsumer/Messages";

const Chatting = () => {
  const { user } = useSelector((state) => state.user);
  const { loading, messages } = useGetMessages();
  const { onlineUsers } = useSocketContext();
  const lastMessageRef = useRef();
  const { id } = useParams();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className=" w-full h-full mx-auto max-w-[1750px] bg-cardbg">
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={3} />
        <main className="text-primarycolor w-full">
          <Header user={user} />

          <div className="px-8 relative py-6 mt-16 flex flex-col md:w-[70%]  mx-auto border rounded-xl  bg-primarycolor overflow-auto justify-between h-screen ">
            <div className=" flex flex-col justify-between  ">
              <div className="flex gap-2 sticky top-0  z-20">
                <Chip
                  variant="ghost"
                  color={onlineUsers?.includes(id) ? "green" : "red"}
                  size="sm"
                  value={onlineUsers?.includes(id) ? "Online" : "Offline"}
                  icon={
                    <span
                      className={`mx-auto mt-1 block h-2 w-2 font-bold rounded-full ${
                        onlineUsers?.includes(id)
                          ? "bg-green-900"
                          : "bg-red-900"
                      } content-['']`}
                    />
                  }
                />
              </div>
              {!loading &&
                messages?.length > 0 &&
                messages?.map((message, index) => {
                  return (
                    <div className="" ref={lastMessageRef}>
                      <Messages message={message} user={user} />
                    </div>
                  );
                })}
            </div>

            {loading &&
              [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
            {!loading && messages.length === 0 && (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <p className="text-center text-mutedcolor text-xl font-bold">
                  Welcome! {user?.firstname + " " + user?.lastname}{" "}
                  {getRandomEmoji()}
                </p>
                <p className="text-center text-hoverblack text-xl font-bold">
                  Send a message to start a conversation
                </p>
              </div>
            )}
            <SendMessageInput />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chatting;
