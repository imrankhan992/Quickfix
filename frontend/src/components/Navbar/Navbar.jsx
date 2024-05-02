import React, { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import tools from "../../assets/tools.png";
import {
  FaServicestack,
  FaMapMarkedAlt,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { GrContactInfo } from "react-icons/gr";
import { MdArrowDropDown, MdPermContactCalendar } from "react-icons/md";
import { HiBars3BottomRight } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadUserData } from "../Actions/Registration";
import axiosInstance from "@/ulities/axios";
import { errorToast } from "@/Toast/Toast";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: MdArrowDropDown,
  },
];

function ProfileMenu({ user }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center hover:bg-none rounded-full py-0.5 pr-2 pl-0.5 "
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="profile"
            className="border border-hoverblack bg-thirdcolor p-0.5"
            src={`${user?.avatar?.url}`}
          />
          <MdArrowDropDown
            // strokeWidth={2.5}
            className={`h-[18px] w-[18px] transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                // strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal "
                color={isLastItem ? "red" : "inherit"}
              >
                <Link to={`/${user?.role}/dashboard/${label}`}> {label}</Link>
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

// nav list menu
const navListMenuItems = [
  {
    title: "@material-tailwind/html",
    description:
      "Learn how to use @material-tailwind/html, packed with rich components and widgets.",
  },
  {
    title: "@material-tailwind/react",
    description:
      "Learn how to use @material-tailwind/react, packed with rich components for React.",
  },
  {
    title: "Material Tailwind PRO",
    description:
      "A complete set of UI Elements for building faster websites in less time.",
  },
];

function NavListMenu({ allcategories, setid }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderItems = allcategories?.map(({ category, description, _id }) => (
    <Link
      to={"/single/services/" + category + "/" + _id}
      key={_id}
      onClick={() => getsingleserviceByCategory}
    >
      <MenuItem
        onClick={() => {
          setid(_id);
        }}
        className=" text-hoverblack bg-bodycolor"
      >
        <Typography variant="h6" className="mb-1 text-hoverblack">
          {category}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          .
        </Typography>
      </MenuItem>
    </Link>
  ));

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler className="">
          <Link to="#" className="text-[16px] text-hoverblack ">
            <MenuItem className="hidden items-center gap-2 font-medium bg-bodycolor lg:flex lg:rounded-full   hover:bg-texthovercolor">
              <p className="text-hoverblack text-[16px] font-semibold">
                {" "}
                Services
              </p>{" "}
              <MdArrowDropDown
                // strokeWidth={2}
                className={`text-hoverblack h-[18px]  w-[18px] transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Link>
        </MenuHandler>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid bg-thirdcolor">
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            {/* <MdArrowDropDown strokeWidth={1} className="h-28 w-28" /> */}
            <img src={tools} alt="" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 font-medium  lg:hidden text-hoverblack">
        <MdArrowDropDown className="h-[18px] w-[18px] text-hoverblack" /> Pages{" "}
      </MenuItem>
      <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
        {renderItems}
      </ul>
    </React.Fragment>
  );
}

// nav list component
const navListItems = [
  {
    label: "Home",
    icon: IoMdHome,
  },
];

const navListItems2 = [
  {
    label: "About us",
    icon: GrContactInfo,
  },
  {
    label: "Areas we cover",
    icon: FaMapMarkedAlt,
  },
  {
    label: "Contact us",
    icon: MdPermContactCalendar,
  },
];

function NavList({ allcategories, setid }) {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center ">
      {navListItems.map(({ label, icon }, key) => (
        <Link key={label} href="/" className="  text-[16px] ">
          <MenuItem className="flex items-center gap-2 lg:rounded-full   bg-bodycolor">
            <span className="text-hoverblack font-semibold "> {label}</span>
          </MenuItem>
        </Link>
      ))}
      <NavListMenu allcategories={allcategories} setid={setid} />
      {navListItems2.map(({ label, icon }, key) => (
        <Link key={label} to="/aboutus" className="text-[16px] ">
          <MenuItem className="flex items-center gap-2 lg:rounded-full bg-bodycolor  hover:bg-texthovercolor">
            <span className="text-hoverblack text-[16px]  font-semibold ">
              {" "}
              {label}
            </span>
          </MenuItem>
        </Link>
      ))}
    </ul>
  );
}

export function ComplexNavbar({ setid }) {
  const [allcategories, setallcategories] = useState();
  // get all categories
  const getallcategories = async (req, res) => {
    try {
      const { data } = await axiosInstance.get(
        "/api/v1/admin/get-all-categories"
      );
      if (data?.success) {
        setallcategories(data?.categories);
      }
    } catch (error) {
      errorToast(error?.response?.data?.message);
      console.log(error);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserData());
    getallcategories();
  }, []);
 
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className="border-none  p-4 shadow-none    rounded-none text-hoverblack ">
      <div className="relative mx-auto flex items-center justify-between text-hoverblack">
        <Link
          to="/"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-semibold text-2xl"
        >
          QuickFix
        </Link>
        <div className="hidden lg:block">
          <NavList allcategories={allcategories} setid={setid} />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          {!isNavOpen && (
            <HiBars3BottomRight className="h-6 w-6 text-hoverblack" />
          )}
          {isNavOpen && <RxCross1 className="h-6 w-6 text-hoverblack" />}
        </IconButton>

        {!isAuthenticated && (
          <div className="bottom-end flex gap-2">
            <Link to={"/login"}>
              <Button
                size="sm"
                variant="text"
                className="text-hoverblack hover:text-texthovercolor  border-hoverblack rounded-xl"
              >
                <span className="font-semibold text-[16px] ">Log In</span>
              </Button>
            </Link>
            <Link to={"/signup"}>
              <Button
                size="sm"
                variant="text"
                className="text-hoverblack hover:text-texthovercolor  border border-hoverblack rounded-xl "
              >
                <span className="font-semibold text-[16px]">Sign up</span>
              </Button>
            </Link>
          </div>
        )}
        {isAuthenticated && <ProfileMenu user={user} />}
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}
