import useOffer from "@/Hooks/useOffer";
import { Button, Rating, Typography } from "@material-tailwind/react";
import React from "react";

const ConsumerNotify = ({ newOffer }) => {
  const { updateOffer, loading } = useOffer();
  console.log(newOffer, "newOffer from ConsumerNotify");

  return (
    <div className="flex-1  p-4 ">
      <div className="flex items-start">
        <div className="ml-3 flex-1 mb-2">
          <Typography className=" font-semibold text-xl  text-hoverblack">
            New Offer
          </Typography>
        </div>
      </div>
      {/* price and pic */}
      <div className="flex items-center mb-2  gap-2 font-bold text-hoverblack ">
        <img
          src={newOffer?.serviceId?.picture?.url}
          alt=""
          className="w-14 h-14"
        />

        <div className="flex justify-between items-center w-full">
          <div className="max-w-sm">
            <Typography
              color="blue-gray"
              className="font-medium text-hoverblack"
            >
              {newOffer?.serviceId?.title}
            </Typography>
          </div>
          <Typography
            color="blue-gray"
            className="font-bold text-3xl text-hoverblack"
          >
            PKR{newOffer?.price}
          </Typography>
        </div>
      </div>
      <div className="flex items-center justify-around gap-3">
        <Button className="bg-mutedcolor rounded-full text-errorcolor arimo w-full   text-[16px] font-bold">
          Ignore
        </Button>

        <a href="/serviceprovider/dashboard/request/order" className="w-full">
          <Button className="bg-buttoncolor w-full rounded-full text-primarycolor arimo  text-[16px] font-bold">
            CheckOut
          </Button>
        </a>
      </div>
    </div>
  );
};

export default ConsumerNotify;
