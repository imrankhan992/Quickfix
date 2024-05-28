import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  
} from "@material-tailwind/react";

import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import { TbCategoryPlus } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { MdCleaningServices } from "react-icons/md";
import { GiClick } from "react-icons/gi";
import { BsClockHistory } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

export function Sidebar({open}) {

  

  return (
    <Card className="h-full   rounded-none bg-sidebarbg ">
      <div className="mb-2 p-4 flex items-center justify-center">
        <Typography variant="h5" className="text-primarycolor">
          QuickFix
        </Typography>
      </div>
      <List>
        {/* dashboard */}
        <Link  to={"/user/dashboard/my profile"}>
          <ListItem
            className={`text-primarycolor rounded-full focus:bg-buttoncolor focus:text-hoverblack  focus:bg-opacity-100 hover:bg-buttoncolor hover:text-hoverblack hover:border-buttonborder hover:border ${
              open === 1
                ? "bg-buttoncolor text-hoverblack border-buttonborder border"
                : ""
            }`}
          >
            <ListItemPrefix>
              <MdDashboard className="h-5 w-5" />
            </ListItemPrefix>
            Dashboard
          </ListItem>
        </Link>

        {/* services */}
        <Link  to={"/user/dashboard/services"}>
        <ListItem className={`text-primarycolor rounded-full focus:bg-buttoncolor focus:text-hoverblack  focus:bg-opacity-100 hover:bg-buttoncolor hover:text-hoverblack hover:border-buttonborder hover:border ${
              open === 2
                ? "bg-buttoncolor text-hoverblack border-buttonborder border"
                : ""
            }`}>
          <ListItemPrefix>

            <MdCleaningServices className="h-5 w-5" />
          </ListItemPrefix>
        Services
        </ListItem>
        </Link>
        {/* orders */}
        <Link to={"/user/dashboard/orders"}>
        <ListItem  className={`text-primarycolor rounded-full focus:bg-buttoncolor focus:text-hoverblack  focus:bg-opacity-100 hover:bg-buttoncolor hover:text-hoverblack hover:border-buttonborder hover:border ${
              open === 3
                ? "bg-buttoncolor text-hoverblack border-buttonborder border"
                : ""
            }`}>
          <ListItemPrefix>

            <GiClick className="h-5 w-5" />
          </ListItemPrefix>
          My orders
        </ListItem>
        </Link>
        {/* accepted orders */}
        <Link to={"/user/dashboard/accepted-orders"}>
        <ListItem  className={`text-primarycolor rounded-full focus:bg-buttoncolor focus:text-hoverblack  focus:bg-opacity-100 hover:bg-buttoncolor hover:text-hoverblack hover:border-buttonborder hover:border ${
              open === 6
                ? "bg-buttoncolor text-hoverblack border-buttonborder border"
                : ""
            }`}>
          <ListItemPrefix>

            <GiClick className="h-5 w-5" />
          </ListItemPrefix>
          Accepted Offers
        </ListItem>
        </Link>
          {/* previous order */}
          <Link to={"/user/dashboard/previous-orders"}>
        <ListItem  className={`text-primarycolor rounded-full focus:bg-buttoncolor focus:text-hoverblack  focus:bg-opacity-100 hover:bg-buttoncolor hover:text-hoverblack hover:border-buttonborder hover:border ${
              open === 4
                ? "bg-buttoncolor text-hoverblack border-buttonborder border"
                : ""
            }`}>
          <ListItemPrefix>
            <BsClockHistory className="h-5 w-5" />
          </ListItemPrefix>
          Previous Orders
        </ListItem>
        </Link>

        {/* get all product */}
        <Link to={"/user/dashboard/settings"}>
        <ListItem className={`text-primarycolor rounded-full focus:bg-buttoncolor focus:text-hoverblack  focus:bg-opacity-100 hover:bg-buttoncolor hover:text-hoverblack hover:border-buttonborder hover:border ${
              open === 5
                ? "bg-buttoncolor text-hoverblack border-buttonborder border"
                : ""
            }`}>
          <ListItemPrefix>

            <IoSettingsOutline className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        </Link>
      </List>
    </Card>
  );
}
