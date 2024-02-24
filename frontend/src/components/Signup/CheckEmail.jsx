import React from "react";

import mail from "../../assets/sendmail.gif";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
const CheckEmail = () => {
  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px]">
      <div className="flex flex-col  justify-center items-center w-full h-[100%]">
        {/* <MdMarkEmailUnread className="text-5xl text-greencolor" /> */}
        <img src={mail} className="w-32" />
        <div className="md:w-[40%]  text-center flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-semibold pb-6">
            Verify your email to continue
          </h1>
          <p className="text-[1.1rem] text-primarycolor">
            We just sent an email to the address:<span className="text-greencolor"> fsdfklajl@gmail.com</span>
          </p>
          <p className="text-[1.1rem] text-primarycolor ">
            Please check your email and select the link provided to verify your
            address.
          </p>
        </div>

        <div className="flex gap-3 py-6">
          <Button className="hover:bg-hovercolor  hover:text-hoverblack rounded-full px-10 ">Send again</Button>
        <Link to={"/congrats"}><Button className="bg-buttoncolor text-white border   rounded-full px-10 border-primarycolor">Go to Gmail Inbox</Button></Link>  
        </div>
      </div>
    </div>
  );
};

export default CheckEmail;
