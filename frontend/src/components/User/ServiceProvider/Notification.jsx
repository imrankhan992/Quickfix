import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { IoNotificationsCircleOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSocketContext } from "@/context/SocketContext";
import notification from "../../../assets/notification.gif";
import useOrdersNotification from "@/Hooks/useOrdersNotification";
export function Notification() {
  const { newOrder } = useSocketContext();
  const {getOrders}=useOrdersNotification();
  getOrders
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="hover:animate-pulse">
          <IoNotificationsCircleOutline className="bg-cardbg text-3xl  text-hoverblack  " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 p-0 m-0 overflow-scroll h-[500px] scroll-smooth bg-cardbg ">
        {newOrder?.length > 0 &&
          newOrder?.map((order) => {
            return (
              <>
                <div className="border-b px-4 hover:bg-[#ECF8FE]  hover:transition-transform flex items-center justify-center  gap-3 py-2 bg-cardbg  cursor-pointer">
                <div>
                <div className="flex items-center gap-3 justify-between  border-cardborder">
                    <img
                      src={order?.clientId?.avatar?.url}
                      alt=""
                      className="w-12"
                    />
                    <p>{order?.serviceId?.title}</p>
                   
                  </div>
                  <p className="text-sm text-mutedcolor">{order?.address}</p>
                  <div className="flex justify-between items-center "><p className="text-mutedcolor">2 hours ago</p> <p className="font-bold">RS{order?.price}</p></div>
                </div>
                {/* second dev */}
                <div>
                <BsThreeDotsVertical className="text-3xl cursor-pointer" />
                </div>
                </div>
              </>
            );
          })}
        {/* when no order found */}
        {newOrder?.length === 0 && (
          <div className="flex items-center relative p-10">
            <img
              src={notification}
              alt=""
              className="w-56 h-56 absolute  top-0"
            />
            <p className="text-xl font-bold z-50">No order Found</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
