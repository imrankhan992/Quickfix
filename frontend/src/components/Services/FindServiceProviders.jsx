import React from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Avatar, Badge } from "@material-tailwind/react";
import BadgeOutline from "./BadgeOutline";
import Find from "./Find";

const FindServiceProviders = () => {
  return (
    <div className="grid grid-cols-8 ">
      <div className="bg-cardbg min-h-screen flex flex-col col-span-2 gap-3 px-4 ">
      <h3 className="pt-4 arimo text-[18px] font-bold">Carpainter</h3>
      <h3 className=" arimo text-[16px] ">Location: Abbottabad</h3>
        <div className="flex items-center gap-2 justify-between bg-primarycolor px-4 py-1 rounded-[6px] shadow-md">
            
          <div className="flex gap-3 ">
            <Badge overlap="circular"  color="green" >
              <Avatar
                src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                alt="Photo by Drew Beamer"
                fill
                className="object-cover rounded-full w-14 h-14 border-2 border-[#29B40B]"
              />
            </Badge>
            <div>
              <p className="arimo ">Imran Khan</p>
              <p className="arimo text-sm">Active 2 hour ago</p>
              <p className="arimo text-sm">Ratings 5.4</p>
            </div>
          </div>

          <div><BadgeOutline status={"Online"} color="text-green-600"/></div>
        </div>

        <div className="flex items-center gap-2 justify-between bg-primarycolor px-4 py-1 rounded-[6px] shadow-md">
            
          <div className="flex gap-3 ">
            <Badge overlap="circular"  color="green" >
              <Avatar
                src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                alt="Photo by Drew Beamer"
                fill
                className="object-cover rounded-full w-14 h-14 border-2 border-[#29B40B]"
              />
            </Badge>
            <div>
              <p className="arimo ">Imran Khan</p>
              <p className="arimo text-sm">Active 5 hour ago</p>
              <p className="arimo text-sm">Ratings 5.4</p>
            </div>
          </div>

          <div><BadgeOutline status={"Online"} color="text-green-600"/></div>
        </div>

        <div className="flex items-center gap-2 justify-between bg-primarycolor px-4 py-1 rounded-[6px] shadow-md">
            
          <div className="flex gap-3 ">
            <Badge overlap="circular" color="red" >
              <Avatar
                src="https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
                alt="Photo by Drew Beamer"
                fill
                className="object-cover rounded-full w-14 h-14 border-2 border-red-600"
              />
            </Badge>
            <div>
              <p className="arimo ">Imran Khan</p>
              <p className="arimo text-sm">Active 1 hour ago</p>
              <p className="arimo text-sm">Ratings 5.4</p>
            </div>
          </div>

          <div><BadgeOutline status={"Offline"} color="text-red-600"/></div>
        </div>

        

        
      </div>
      <div className="col-span-6">
        <Find/>
      </div>
    </div>
  );
};

export default FindServiceProviders;
