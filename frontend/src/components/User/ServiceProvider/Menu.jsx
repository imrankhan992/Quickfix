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


export function Menu({user}) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const logout = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/logout");
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
        <Button className="p-0 bg-bodycolor hover:bg-bodycolor rounded-full flex    gap-2">
          <AvatarPicture user={user} />
          <div className="flex justify-start flex-col p-2">
            <p>{user?.firstname + " " + user?.lastname}</p>
            <p className="text-sm text-mutedcolor">{user?.role}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={"/user/dashboard/my profile"}>
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuSeparator />

        <Link to="/user/dashboard/services">
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Services</span>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />
        <DropdownMenuItem
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
