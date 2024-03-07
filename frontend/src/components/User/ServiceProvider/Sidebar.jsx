import React from "react";
import "./sidebar.css";
import logo from "../../../assets/quickfix logo.png"
import {
  Card,
  
  List,
  ListItem,
  ListItemPrefix,
 
} from "@material-tailwind/react";

import { RiPresentationFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { loadUserData } from "@/components/Actions/Registration";
import axiosInstance from "@/ulities/axios";
import { showtoast } from "@/Toast/Toast";
export function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
const dispatch = useDispatch();
const navigate = useNavigate()
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const LogOut = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/admin/logout");
     
      if (data?.success) {
        dispatch(loadUserData())
        showtoast(data?.message);
        navigate("/login");
      }
    } catch (error) {}
  };

  return (
    <Card className="h-[calc(100vh)]  rounded-none w-full max-w-[20rem] overflow-y-auto  bg-thirdcolor text-primarycolor scrollbar-hide ">
      <div className="mb-2 flex items-center justify-center text-primarycolor">
        
       
       
        <img src={logo} className="w-28 h-28 " alt="" />
         
        
      </div>

      <List>
        <Link to={""}>
        <ListItem onClick={()=>{LogOut()}} className="text-primarycolor hover:bg-buttoncolor hover:bg-opacity-100 hover:text-primarycolor   hover:border-2 hover:border-buttonborder p-[0.6rem]" >
          <ListItemPrefix>
            <RiPresentationFill className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
        </Link>
      </List>
    </Card>
  );
}
