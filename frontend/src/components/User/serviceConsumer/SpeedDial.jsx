import {
  IconButton,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Typography,
} from "@material-tailwind/react";
import { IoCall } from "react-icons/io5";

import { MdOutlineMessage } from "react-icons/md";
import { Link } from "react-router-dom";

export function MessageSpeedDial({id}) {
  const labelProps = {
    variant: "small",
    color: "blue-gray",
    className:
      "absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal text-hoverblack arimo font-bold",
  };

  return (
   
      <div className=" fixed bottom-12   right-12 z-50 ">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton size="lg"  className="rounded-full">
              <MdOutlineMessage className="h-5 w-5 transition-transform group-hover:rotate-45" />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent className="">
            <Link to={`/user/dashboard/chatting/${id}`}>
            <SpeedDialAction className="relative bg-buttoncolor">
              <MdOutlineMessage className="h-5 w-5" />
              <Typography {...labelProps}>Message</Typography>
            </SpeedDialAction>
            </Link>
           <Link to={"#"}>
           <SpeedDialAction className="relative bg-buttoncolor" >
              <IoCall  className="h-5 w-5" />
              <Typography {...labelProps}>Call</Typography>
            </SpeedDialAction>
           </Link>
            
          </SpeedDialContent>
        </SpeedDial>
      </div>
 
  );
}
