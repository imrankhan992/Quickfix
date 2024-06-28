import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import Rating from "react-rating-stars-component";
import { Button } from "@material-tailwind/react";
import { errorToast } from "@/Toast/Toast";
import useGiveReview from "@/Hooks/useGiveReview";
import { AiOutlineFileSync } from "react-icons/ai";
import { SuccessToast } from "@/Toast/Toastify";
export function RatingsAlert({ orders,index }) {
  const [rating, setRatings] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [orderId, setOrderId] = useState(orders?.order?._id);
  const [serviceProviderId, setServiceProviderId] = useState(orders?.serviceProvider?._id);
  const {loading,giveReview} = useGiveReview()
  console.log(orders, "this is orders");
  const options = {
    value: 0,
    readOnly: false,
    precision: 0.5,
    edit: true,
    size: window.innerWidth < 600 ? 20 : 35,
    isHalf: true,
  };
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);
  const handleSubmit =async (e) => {
    if(rating === 0){
        errorToast("Please rate the service");
        return;
    }
    if(feedback === ""){
        errorToast("Please provide feedback");
        return;
    }
    e.preventDefault();
    const result= await giveReview(rating,feedback,orderId,serviceProviderId)
   
      setOpen(false);
   
    
  };
  const handleChange = (e) => {
    if (e?.target?.name === "feedback") {
      setFeedback(e.target.value);
    } else {
      setRatings(e);
    }
   
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="bg-primarycolor min-h-96">
        <AlertDialogHeader>
            <span className="arimo text-sm w-7 h-7 bg-gray-200 font-bold shadow-sm flex items-center justify-center rounded-full">  {index+1}</span>
          <AlertDialogTitle className="py-4 font-bold text-hoverblack text-center">
            Kindly share your feedback
          </AlertDialogTitle>

          <AlertDialogDescription className=" flex flex-col gap-3 items-center">
            <img
              src="https://avatar.iran.liara.run/public"
              width={70}
              height={70}
              alt=""
            />
            <p className="font-bold text-sm arimo text-hoverblack">
              How would you rate your experience with Homely?
            </p>
            <form
             
              className="w-full flex flex-col items-center justify-center gap-3"
            >
              <Rating {...options} onChange={handleChange} />
              <textarea
                aria-required
                name="feedback"
                onChange={handleChange}
                className="w-full h-32 bg-[#e2e3e4] rounded-lg p-2 placeholder:text-black focus-within:bg-buttoncolor text-black focus:border-none"
                placeholder="Please share your experience here... "
              ></textarea>
            </form>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {
            !loading && (<Button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#1d8d1d] capitalize arimo text-sm rounded-full text-primarycolor  hover:bg-[#1d8d1d]"
            >
              Continue
            </Button>)
          }
          {
            loading && (
              <Button
              type="submit"
             disabled
              className="bg-[#1d8d1d] capitalize arimo text-sm rounded-full text-primarycolor  hover:bg-[#1d8d1d]"
            >
              please wait...
            </Button>
            )
          }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
