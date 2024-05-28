


import React from "react";
import { Button, Rating, Typography } from "@material-tailwind/react";
import { toast } from "react-hot-toast";
const OfferNotification = (newOffer) => {
 console.log(newOffer);
  return toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-cardbg shadow-2xl rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        {/* <div className="flex items-start">
          <div className="ml-3 flex-1 mb-2">
            <Typography className=" font-semibold text-xl  text-hoverblack">
              New Offer
            </Typography>
          </div>
        </div> */}
        {/* price and pic */}
        <div className="flex items-center mb-2  gap-2 font-bold text-hoverblack">
          <img
            src={newOffer?.serviceProvider?.avatar?.url}
            alt=""
            className="w-14 h-14"
          />

          <div className="flex justify-between items-center w-full">
            <div className="">
              <Typography
                color="blue-gray"
                className="font-medium text-hoverblack"
              >
               {newOffer?.serviceProvider?.firstname + " " + newOffer?.serviceProvider?.lastname}
              </Typography>
              {/* ratings */}
              <div className="flex gap-2">
                <Rating
                  color="blue-gray"
                  value="4"
                  className="text-sm"
                  readOnly
                />{" "}
                <p>4.8</p>
                (38)
              </div>
            </div>
            <div  className="flex items-end flex-col">
            <Typography
              color="blue-gray"
              className="font-bold text-3xl text-hoverblack"
            >
              PKR{newOffer?.price}
            </Typography>
            <Typography
              color="blue-gray"
              className="font-normal text-[16px] text-hoverblack"
            >
            {newOffer?.time}
            </Typography>
            <Typography
              color="blue-gray"
              className="font-normal text-[16px] text-hoverblack"
            >
            {newOffer?.distance}
            </Typography>
           
            </div>
            
          </div>
        </div>
        <div className="flex items-center justify-around gap-3">
          <Button className="bg-mutedcolor rounded-full text-errorcolor arimo w-full   text-[16px] font-bold">
            Decline
          </Button>

          <Button className="bg-buttoncolor w-full rounded-full text-primarycolor arimo  text-[16px] font-bold">
            Check out
          </Button>
        </div>
      </div> 
    </div>
  ));
};

export default OfferNotification;
