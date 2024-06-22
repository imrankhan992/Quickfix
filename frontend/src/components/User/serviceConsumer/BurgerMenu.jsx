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
// import {
//   RiPresentationFill,
//   RiPresentationFill,
//   RiPresentationFill,
//   RiPresentationFill,
//   RiPresentationFill,
//   RiPresentationFill,
// } from "@heroicons/react/24/solid";
// import {
//   RiPresentationFill,
//   RiPresentationFill,
//   RiPresentationFill,
//   RiPresentationFill,
//   RiPresentationFill,
//   RiPresentationFill,
// } from "@heroicons/react/24/outline";
import { RiPresentationFill } from "react-icons/ri";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdCleaningServices, MdDashboard } from "react-icons/md";
import { GiClick } from "react-icons/gi";
import { BsClockHistory } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";

export function BurgerMenu({open}) {
 
  const [openAlert, setOpenAlert] = React.useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
 
  
 
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
 
  return (
    <div className="md:hidden block absolute  z-50 px-4">
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <FaBarsStaggered className="h-8 w-8 stroke-2 text-hoverblack " />
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
           
            <Typography variant="h5" color="white">
             QuickFix
            </Typography>
          </div>
          <div className="p-2">
            <Input
              icon={<RiPresentationFill className="h-5 w-5" />}
              label="Search"
            />
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
          <Alert
            open={openAlert}
            className="mt-auto bg-buttoncolor"
            onClose={() => setOpenAlert(false)}
          >
            <RiPresentationFill className="mb-4 h-12 w-12" />
            <Typography variant="h6" className="mb-1">
              Upgrade to PRO
            </Typography>
            <Typography variant="small" className="font-normal opacity-80">
              Upgrade to Material Tailwind PRO and get even more components,
              plugins, advanced features and premium.
            </Typography>
            <div className="mt-4 flex gap-3">
              <Typography
                as="a"
                href="#"
                variant="small"
                className="font-medium opacity-80"
                onClick={() => setOpenAlert(false)}
              >
                Dismiss
              </Typography>
              <Typography
                as="a"
                href="#"
                variant="small"
                className="font-medium"
              >
                Upgrade Now
              </Typography>
            </div>
          </Alert>
        </Card>
      </Drawer>
    </div>
  );
}