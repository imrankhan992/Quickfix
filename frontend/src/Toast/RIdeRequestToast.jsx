import React from "react";
import { Button, Rating, Typography } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
const RIdeRequestToast = (newOrder) => {
 
  return toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-cardbg shadow-2xl rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <Typography className=" font-semibold text-xl text-hoverblack">
              New Order Request
            </Typography>
          </div>
        </div>
        {/* ratings */}
        <div className="flex items-center gap-2 font-bold text-hoverblack">
          <Typography color="blue-gray" className="font-medium text-hoverblack">
            {newOrder?.serviceId?.title}
          </Typography>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div>
            <Typography
              color="blue-gray"
              className="font-bold text-3xl text-hoverblack"
            >
              PKR{newOrder?.price}
            </Typography>
          </div>
          <div>
            <Button className="bg-buttoncolor text-hoverblack arimo  text-[16px] font-bold">
              Check out
            </Button>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200 ">
        <Button className="w-full arimo border border-transparent bg-cardbg  rounded-none rounded-r-xl  p-4 flex items-center justify-center text-sm font-medium text-hoverblack hover:text-hoverblack focus:outline-none focus:ring-2 focus:ring-indigo-500">
          QuickFix
        </Button>
      </div>
    </div>
  ));
};

export default RIdeRequestToast;
