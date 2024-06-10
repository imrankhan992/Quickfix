import React, { useState } from "react";
import { useParams } from "react-router-dom";
import sendMessages from "@/Hooks/sendMessage";
const SendMessageInput = () => {
  const { sendMessage, loading } = sendMessages();
  const { id } = useParams();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (message === "") return;
    sendMessage(message, id);
    setMessage("");
  };
  return (
    <form
      className="border-2 bottom-0 sticky w-full  border-none hover:ring-offset-0"
      onSubmit={handleSubmit}
    >
      <div className="flex relative">
        <label className="input w-full flex items-center gap-2 text-hoverblack border-hoverblack focus:border-none focus:outline-none focus:ring-offset-4 ">
          <input
            value={message}
            type="text"
            placeholder="Search"
            className="w-full "
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
        </label>
        {!loading && (
          <button
            type="submit"
            className=" p-2 rounded-full absolute right-2 top-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 text-hoverblack"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        )}
        {loading && (
          <div className="absolute right-2 top-2">
            <p className="text-hoverblack flex items-center justify-center">
              {" "}
              please wait...
            </p>
          </div>
        )}
      </div>
    </form>
  );
};

export default SendMessageInput;
