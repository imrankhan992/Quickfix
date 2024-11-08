import { LifeBuoy, LogOut, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AvatarPicture } from "./Avatar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { errorToast, showtoast } from "@/Toast/Toast";
import axiosInstance from "@/ulities/axios";
import { loadUserData } from "@/components/Actions/Registration";


export function Menu() {
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const logout = async () => {
    try {
      const { data } = await axiosInstance.get(`/api/v1/logout/${user?._id}`);

      if (data?.success) {
        showtoast(data?.message);
        
        dispatch(loadUserData());
        navigate("/login");
      }
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };
 

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <Button className="p-0 bg-cardbg hover:bg-cardbg rounded-full flex    gap-2">
          <AvatarPicture user={user} />
          <div className="flex justify-start flex-col p-2">
            <p className="text-hoverblack arimo font-bold">{user?.firstname + " " + user?.lastname}</p>
            <p className="text-sm text-mutedcolor">{user?.role}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-cardbg cursor-pointer">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup >
          <Link to={"/user/dashboard/my profile"}>
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuSeparator />

        <Link to="/user/dashboard/services">
          <DropdownMenuItem className="cursor-pointer">
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Services</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <DropdownMenuItem
        className="cursor-pointer"
          onClick={() => {
            logout();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
