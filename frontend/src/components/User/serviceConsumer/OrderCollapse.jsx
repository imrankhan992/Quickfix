import * as React from "react";
import { LuChevronsUpDown } from "react-icons/lu";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Rating, Typography } from "@material-tailwind/react";
import useOffer from "@/Hooks/useOffer";
import { useSocketContext } from "@/context/SocketContext";

export function OrderCollapse({ order, user }) {
  const {socket} = useSocketContext();
  const { updateOffer, loading } = useOffer();
  // formate date
  const formateDate = (date) => {
    //  I WANT TO GET live counter that how many time remaining in order expire
    const newDate = new Date(date);
    return newDate.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };
 
  const [isOpen, setIsOpen] = React.useState(false);
 
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2 mb-4 mt-6"
    >
      <div className="w-full  ">
        <div className="border-x-2 w-full  shadow-md  select-none  flex-col bg-primarycolor  ">
          <div className="flex items-center justify-start w-full gap-16 py-5 px-8 bg-[#FAFAFA] border-y-2 text-hoverblack">
            <div>
              <p className="font-bold">Order placed</p>
              <span className="text-mutedcolor">2/4/2024</span>
            </div>
            <div>
              <p className="font-bold">Order Expiry Date</p>
              <span className="text-mutedcolor">24/5/2024</span>
            </div>
            <div>
              <p className="font-bold">Address</p>
              <span className="text-mutedcolor">{order?.address}</span>
            </div>
            <div className="font-bold flex flex-col justify-center items-center">
              <p className="font-bold ">Expire At</p>
              {/* convert this       orderExpireAt         in readable date and time */}

              <span className="text-mutedcolor">
                {formateDate(order?.orderExpireAt)}
              </span>
            </div>
          </div>
          {/* second part */}
          <div className="flex  items-center w-full   justify-self-auto gap-28 py-5 px-6">
            <div>
              <img
                src={order?.serviceId?.picture?.url}
                className="w-20 h-20"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex gap-8">
                <p className="text-hoverblack">{order?.serviceId?.title}</p>
                <span
                  className={`${
                    order?.orderExpireAt < new Date().toISOString()
                      ? "bg-errorcolor"
                      : "bg-greencolor"
                  } py-1 px-3 text-primarycolor rounded-full arimo flex items-center justify-center`}
                >
                  {order?.orderExpireAt > new Date().toISOString()
                    ? "Active"
                    : "Expired"}
                </span>
              </div>
              {/*description  */}
              <div className="flex items-center">
                <p className="text-hoverblack">
                  {order?.serviceId?.description}
                </p>
              </div>
            </div>
            {/* third part */}
            <div className="flex gap-10 items-center">
              <div className="flex items-center justify-center flex-col text-hoverblack">
                <p className="font-bold text-xl arimo">Quantity</p>
                <p className="font-bold text-xl arimo">{order?.quantity}</p>
              </div>

              <div className="flex flex-col gap-5">
                <p className="text-hoverblack">
                  <b className="arimo text-[22px]">RS{order?.price}</b>
                </p>
                {/* check total offer */}
                <p className="text-greencolor font-bold text-[16px] flex items-center">
                  Total Offers: {order?.totalOffers?.length}
                </p>

                {/* <SendOffer order={order} /> */}
              </div>
              <CollapsibleTrigger asChild className="  ">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex gap-2 border bg-cardbg text-hoverblack hover:text-hoverblack"
                >
                  Show Offers
                  <LuChevronsUpDown className="h-4 w-4 text-hoverblack" />
                  <span className="sr-only">hello</span>
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
          {/* footer */}
          <div className="flex items-center justify-start w-full gap-16 py-5 px-8 bg-[#FAFAFA] border-y-2 text-hoverblack">
            <div className="flex gap-4">
              <p className="font-bold">Appointment Date:</p>
              {formateDate(order?.dateandtime)}
            </div>
          </div>
        </div>
      </div>

      <CollapsibleContent className="space-y-2 ">
        <div className="rounded-md border px-4 py-3 font-mono text-sm bg-primarycolor">
          {/* check if total length of offer is not zero */}
          {order?.totalOffers?.length > 0 ? (
            order?.totalOffers?.map((offer, t) => (
              <div key={offer._id} className="flex gap-4">
                <div
                  className={`${
                    t.visible ? "animate-enter" : "animate-leave"
                  } max-w-md w-full bg-cardbg shadow-2xl rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                >
                  <div className="flex-1 w-0 p-4">
                    <div className="flex items-center mb-2  gap-2 font-bold text-hoverblack">
                      <img
                        src={offer?.serviceProvider?.avatar?.url}
                        alt=""
                        className="w-14 h-14"
                      />

                      <div className="flex justify-between items-center w-full">
                        <div className="">
                          <Typography
                            color="blue-gray"
                            className="font-medium text-hoverblack"
                          >
                            {offer?.serviceProvider?.firstname +
                              " " +
                              offer?.serviceProvider?.lastname}
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
                        <div className="flex items-end flex-col">
                          <Typography
                            color="blue-gray"
                            className="font-bold text-3xl text-hoverblack"
                          >
                            PKR{offer?.price}
                          </Typography>
                          <Typography
                            color="blue-gray"
                            className="font-normal text-[16px] text-hoverblack"
                          >
                            {offer?.time}
                          </Typography>
                          <Typography
                            color="blue-gray"
                            className="font-normal text-[16px] text-hoverblack"
                          >
                            {offer?.distance}
                          </Typography>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-around gap-3">
                      <Button className="bg-mutedcolor rounded-full text-errorcolor arimo w-full   text-[16px] font-bold">
                        Decline
                      </Button>

                      {!loading && (
                        <Button
                          onClick={() => {
                            updateOffer(
                              order?._id,
                              offer?.serviceProvider?._id
                            );
                          }}
                          className="bg-buttoncolor w-full rounded-full text-primarycolor arimo  text-[16px] hover:text-primarycolor hover:bg-buttoncolor font-bold"
                        >
                          Accept
                        </Button>
                      )}
                      {loading && (
                        <Button
                          disabled
                          className="bg-buttoncolor w-full rounded-full text-primarycolor arimo  text-[16px] hover:text-primarycolor hover:bg-buttoncolor font-bold"
                        >
                          Please wait...
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-hoverblack arimo font-bold text-2xl text-center">
              No Offers Found for this project
            </p>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
