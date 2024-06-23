import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Button } from "@material-tailwind/react";
import AddressGoogleMap from "./AddressGoogleMap";
import { useState } from "react";

import axiosInstance from "@/ulities/axios";
import { errorToast, showtoast } from "@/Toast/Toast";
import { Input } from "../../ui/input";

const SendOffer = ({ order }) => {
  const [showMap, setShowMap] = useState(false);
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(order?.price);
  const [time, setTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setShowMap(true);
  };
  const handleValueChange = (e) => {
    setPrice(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataValues = {
      price: price,
      orderId: order._id,
      distance: distance,
      time: time,
      // get current date and time  to check if the offer is expired
      currentDate: new Date(Date.now()).toISOString(),
 
    };

    try {
      setLoading(true);
      const { data } = await axiosInstance.post(
        "api/v1/order/send-offer",
        dataValues
      );
      if (data?.success) {
        showtoast("Offer sent successfully");
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        errorToast(error?.response?.data?.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            onClick={handleClick}
            disabled={order?.orderExpireAt < new Date().toISOString()}  
            className="bg-buttoncolor arimo text-[16px] arimo text-hoverblack "
          >
            Send Offer
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[80vw] h-[80vh] bg-cardbg flex p-0">
          <div className="w-full">
            {showMap && (
              <AddressGoogleMap
                order={order}
                setDistance={setDistance}
                setTime={setTime}
              />
            )}
          </div>
          <div className="h-full  w-[50%] flex flex-col gap-3 py-8 px-4">
            <div className="bg-primarycolor p-2 rounded-md border ">
              <p className="flex justify-between items-center ">
                <b className="arimo text-[26px] text-mutedcolor">
                  Total Time:{" "}
                </b>{" "}
                <span className="text-[26px] ">{time}</span>
              </p>
              <p className="flex justify-between items-center ">
                <b className="arimo text-[26px] text-mutedcolor">
                  Total Distance:{" "}
                </b>{" "}
                <span className="text-[26px] ">{distance}</span>
              </p>
            </div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <p className="arimo text-[26px] font-bold">Offer Price:</p>

              <Input
                id="Offer"
                defaultValue={order?.price}
                name="city"
                className={`arimo bg-primarycolor text-[16px] border border-hoverblack text-hoverblack  focus:border-black focus:bg-buttoncolor p-6 h-14 rounded-xl `}
                placeholder="Your Offer"
                type="number"
                required
                value={price}
                onChange={handleValueChange}
              />
              {
                !loading &&(<Button
                  className="bg-buttoncolor arimo text-[16px] arimo text-hoverblack "
                  type="submit"
                >
                  Submit
                </Button>)
              }
              {
                loading &&(<Button
                  className="bg-buttoncolor arimo text-[16px] arimo text-hoverblack "
                  disabled
                >
                  Submitting...
                </Button>)
              }
              <p>
                After submit your offer please wait... if client accept your
                offer then you will received an email
              </p>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SendOffer;
