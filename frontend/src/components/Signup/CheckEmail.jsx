import React from "react";

import mail from "../../assets/sendmail.gif";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const userEmail = localStorage.getItem("userEmail");

const CheckEmail = () => {
  const { user, success, loading } = useSelector((state) => state.user);

  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px]">
      <div className="flex flex-col  justify-center items-center w-full h-[100%]">
        {/* <MdMarkEmailUnread className="text-5xl text-greencolor" /> */}
        <img src={mail} className="w-32" />
        <div className="md:w-[100%] w-full  text-center flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-semibold pb-6 text-primarycolor">
            Verify your email to continue
          </h1>
          <p className="text-[1.1rem] text-primarycolor">
            We just sent an email to the address:
            <span className="text-greencolor"> {user?.email || userEmail}</span>
          </p>
          <p className="text-[1.1rem] text-primarycolor ">
            Please check your email and select the link provided to verify your
            address.
          </p>
        </div>

        <div className="flex gap-3 py-6 md:flex-row flex-col">
          {/* <Link className="border border-primarycolor  rounded-full "> <Button className="hover:bg-hovercolor w-full hover:text-hoverblack rounded-full px-10 ">Send again</Button></Link> */}
          <Link to={"https://mail.google.com/mail"}>
            <Button className="bg-buttoncolor text-white border   rounded-full px-10 border-primarycolor">
              Go to Gmail Inbox
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
