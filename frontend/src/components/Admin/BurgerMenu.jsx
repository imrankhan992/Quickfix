import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";

import { RiPresentationFill } from "react-icons/ri";
import { FaBarsStaggered } from "react-icons/fa6";
import { MdDashboard, MdReport } from "react-icons/md";
import { TbCategoryPlus } from "react-icons/tb";
import { GrUserWorker } from "react-icons/gr";
import { GiCardboardBoxClosed } from "react-icons/gi";
import { Link } from 'react-router-dom';

export function BurgerMenu() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
 
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
 
  return (
    <div className="md:hidden block  z-50 px-4 fixed">
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <FaBarsStaggered className="h-8 w-8 stroke-2 text-hoverblack" />
        ) : (
          <FaBarsStaggered className="h-8 w-8 stroke-2 text-hoverblack" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4 bg-sidebarbg"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="white">
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
          Add Service
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
          All Services
        </ListItem>
        </Link>
        {/* get all reports */}
        <Link to={"/admin/dashboard/reports"}>
        <ListItem className={`text-primarycolor focus:bg-buttoncolor focus:text-primarycolor focus:bg-opacity-100 hover:bg-buttoncolor hover:text-primarycolor hover:border-buttonborder hover:border ${
              open === 6
                ? "bg-buttoncolor text-primarycolor border-buttonborder border"
                : ""
            }`}>
          <ListItemPrefix>
          <MdReport className="h-5 w-5" />
          </ListItemPrefix>
         Get all Reports
        </ListItem>
        </Link>
      </List>
         
        </Card>
      </Drawer>
    </div>
  );
}