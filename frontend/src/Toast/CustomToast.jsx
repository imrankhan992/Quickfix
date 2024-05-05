import { Button, Rating, Typography } from "@material-tailwind/react";
import { toast } from "react-hot-toast";

export const CustomToast = (newOrder) => {
  return toast.custom((t) => (
    <div
    className={`${
      t.visible ? "animate-enter" : "animate-leave"
    } max-w-md w-full bg-cardbg shadow-2xl rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  >
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
            alt=""
          />
        </div>
        <div className="ml-3 flex-1">
          <Typography className=" font-semibold text-xl text-hoverblack">Emilia Gates</Typography>
          
        </div>
      </div>
      {/* ratings */}
      <div className="flex items-center gap-2 font-bold text-hoverblack">
        3.7
        <Rating value={1} readonly />
        <Typography
          color="blue-gray"
          className="font-medium text-hoverblack"
        >
      
       (134 projects) 
        </Typography>
      </div>
      <div className="flex items-center justify-between gap-2">
      <div>
        <Typography
          color="blue-gray"
          className="font-bold text-3xl text-hoverblack"
        >
          PKR378
        </Typography>
      </div>
      <div>
          <Button className='bg-buttoncolor text-hoverblack arimo  text-[16px] font-bold'>ACCEPT</Button>
      </div>

    </div>
    </div>
    <div className="flex border-l border-gray-200 ">
      <Button
        onClick={() => toast.dismiss(t.id)} // Dismiss the toast with t.id
        className="w-full arimo border border-transparent rounded-none rounded-r-xl bg-errorcolor p-4 flex items-center justify-center text-sm font-medium text-primarycolor hover:text-primarycolor focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
       DECLINE
      </Button>
    </div>
    
  </div>
  ));
};
