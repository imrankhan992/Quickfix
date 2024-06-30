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

import { RiPresentationFill, RiProfileLine, RiStackFill } from "react-icons/ri";
import { FaBarsStaggered } from "react-icons/fa6";
import { Link } from "react-router-dom";
import {
  MdCleaningServices,
  MdDashboard,
  MdOutlineRequestQuote,
} from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import { FcCurrencyExchange } from "react-icons/fc";

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
    <div className="md:hidden block absolute">
      <IconButton
        variant="text"
        size="lg"
        className="fixed top-5 left-4"
        onClick={openDrawer}
      >
        {isDrawerOpen ? (
          <FaBarsStaggered className="h-8 w-8 stroke-2 p-1" />
        ) : (
          <FaBarsStaggered className="h-8 w-8 stroke-2 p-1" />
        )}
      </IconButton>
      <Drawer
        open={isDrawerOpen}
        onClose={closeDrawer}
        className="bg-sidebarbg"
      >
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            {/* <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            /> */}
            <Typography variant="h5" color="white">
              QuickFix
            </Typography>
          </div>

          <List>
            {/* dashboard */}
            <Link to={"/serviceprovider/dashboard/my profile"}>
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
            <Link to={"/serviceprovider/dashboard/services"}>
              <ListItem
                className={`text-primarycolor rounded-full focus:bg-buttoncolor focus:text-hoverblack  focus:bg-opacity-100 hover:bg-buttoncolor hover:text-hoverblack hover:border-buttonborder hover:border ${
                  open === 2
                    ? "bg-buttoncolor text-hoverblack border-buttonborder border"
                    : ""
                }`}
              >
                <ListItemPrefix>
                  <MdCleaningServices className="h-5 w-5" />
                </ListItemPrefix>
                Services
              </ListItem>
            </Link>
            {/* users */}
            <Link to={"/serviceprovider/dashboard/orders"}>
              <ListItem
                className={`text-primarycolor rounded-full focus:bg-buttoncolor focus:text-hoverblack  focus:bg-opacity-100 hover:bg-buttoncolor hover:text-hoverblack hover:border-buttonborder hover:border ${
                  open === 3
                    ? "bg-buttoncolor text-hoverblack border-buttonborder border"
                    : ""
                }`}
              >
                <ListItemPrefix>
                  <RiStackFill className="h-5 w-5" />
                </ListItemPrefix>
                My orders
              </ListItem>
            </Link>
            {/* request order */}
            <Link to={"/serviceprovider/dashboard/request/order"}>
              <ListItem
                className={`text-primarycolor rounded-full focus:bg-buttoncolor focus:text-hoverblack  focus:bg-opacity-100 hover:bg-buttoncolor hover:text-hoverblack hover:border-buttonborder hover:border ${
                  open === 6
                    ? "bg-buttoncolor text-hoverblack border-buttonborder border"
                    : ""
                }`}
              >
                <ListItemPrefix>
                  <MdOutlineRequestQuote className="h-5 w-5" />
                </ListItemPrefix>
                Request Order
              </ListItem>
            </Link>
            {/* recharge */}
            <Link to={"/serviceprovider/dashboard/recharge-account"}>
              <ListItem
                className={`text-primarycolor rounded-full focus:bg-buttoncolor focus:text-hoverblack  focus:bg-opacity-100 hover:bg-buttoncolor hover:text-hoverblack hover:border-buttonborder hover:border ${
                  open === 7
                    ? "bg-buttoncolor text-hoverblack border-buttonborder border"
                    : ""
                }`}
              >
                <ListItemPrefix>
                  <FcCurrencyExchange className="h-5 w-5" />
                </ListItemPrefix>
                Recharge Account
              </ListItem>
            </Link>
            {/* previous order */}
            <Link to={"/serviceprovider/dashboard/previous-orders"}>
              <ListItem
                className={`text-primarycolor rounded-full focus:bg-buttoncolor focus:text-hoverblack  focus:bg-opacity-100 hover:bg-buttoncolor hover:text-hoverblack hover:border-buttonborder hover:border ${
                  open === 4
                    ? "bg-buttoncolor text-hoverblack border-buttonborder border"
                    : ""
                }`}
              >
                <ListItemPrefix>
                  <BsClockHistory className="h-5 w-5" />
                </ListItemPrefix>
                Previous Orders
              </ListItem>
            </Link>

            {/* get all product */}
            <Link to={"/serviceprovider/dashboard/yours/profile"}>
              <ListItem
                className={`text-primarycolor rounded-full focus:bg-buttoncolor focus:text-hoverblack  focus:bg-opacity-100 hover:bg-buttoncolor hover:text-hoverblack hover:border-buttonborder hover:border ${
                  open === 5
                    ? "bg-buttoncolor text-hoverblack border-buttonborder border"
                    : ""
                }`}
              >
                <ListItemPrefix>
                  <RiProfileLine className="h-5 w-5" />
                </ListItemPrefix>
                Profile
              </ListItem>
            </Link>
          </List>
        </Card>
      </Drawer>
    </div>
  );
}
