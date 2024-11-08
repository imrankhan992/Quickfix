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

export function Sidebar({open}) {

  

  return (
    <Card className="h-full   rounded-none bg-thirdcolor ">
      <div className="mb-2 p-4 flex items-center justify-center">
        <Typography variant="h5" className="text-primarycolor">
          QuickFix
        </Typography>
      </div>
      <List>
        {/* dashboard */}
        <Link  to={"/admin/dashboard/my profile"}>
          <ListItem
            className={`text-primarycolor focus:bg-buttoncolor focus:text-primarycolor focus:bg-opacity-100 hover:bg-buttoncolor hover:text-primarycolor hover:border-buttonborder hover:border ${
              open === 1
                ? "bg-buttoncolor text-primarycolor border-buttonborder border"
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
        <Link  to={"/admin/dashboard/add/services"}>
        <ListItem className={`text-primarycolor focus:bg-buttoncolor focus:text-primarycolor focus:bg-opacity-100 hover:bg-buttoncolor hover:text-primarycolor hover:border-buttonborder hover:border ${
              open === 2
                ? "bg-buttoncolor text-primarycolor border-buttonborder border"
                : ""
            }`}>
          <ListItemPrefix>
            <TbCategoryPlus className="h-5 w-5" />
          </ListItemPrefix>
        Add Category
        </ListItem>
        </Link>
        {/* users */}
        <Link to={"/admin/dashboard/customers"}>
        <ListItem className={`text-primarycolor focus:bg-buttoncolor focus:text-primarycolor focus:bg-opacity-100 hover:bg-buttoncolor hover:text-primarycolor hover:border-buttonborder hover:border ${
              open === 3
                ? "bg-buttoncolor text-primarycolor border-buttonborder border"
                : ""
            }`}>
          <ListItemPrefix>
            <GrUserWorker className="h-5 w-5" />
          </ListItemPrefix>
          Service Providers
        </ListItem>
        </Link>
          {/* create new service */}
          <Link to={"/admin/dashboard/create-product"}>
        <ListItem className={`text-primarycolor focus:bg-buttoncolor focus:text-primarycolor focus:bg-opacity-100 hover:bg-buttoncolor hover:text-primarycolor hover:border-buttonborder hover:border ${
              open === 4
                ? "bg-buttoncolor text-primarycolor border-buttonborder border"
                : ""
            }`}>
          <ListItemPrefix>
            <GiCardboardBoxClosed className="h-5 w-5" />
          </ListItemPrefix>
          Add Product
        </ListItem>
        </Link>

        {/* get all product */}
        <Link to={"/admin/dashboard/all-products"}>
        <ListItem className={`text-primarycolor focus:bg-buttoncolor focus:text-primarycolor focus:bg-opacity-100 hover:bg-buttoncolor hover:text-primarycolor hover:border-buttonborder hover:border ${
              open === 5
                ? "bg-buttoncolor text-primarycolor border-buttonborder border"
                : ""
            }`}>
          <ListItemPrefix>
            <GiCardboardBoxClosed className="h-5 w-5" />
          </ListItemPrefix>
          All Products
        </ListItem>
        </Link>
      </List>
    </Card>
  );
}
