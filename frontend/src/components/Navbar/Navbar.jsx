import React from "react";
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
import { FaServicestack,FaMapMarkedAlt,FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { GrContactInfo } from "react-icons/gr";
import { MdArrowDropDown,MdPermContactCalendar } from "react-icons/md";
import { HiBars3BottomRight } from "react-icons/hi2";
import { RxCross1 } from "react-icons/rx";



import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: MdArrowDropDown,
  },
  {
    label: "Edit Profile",
    icon: MdArrowDropDown,
  },
  {
    label: "Inbox",
    icon: MdArrowDropDown,
  },
  {
    label: "Help",
    icon: MdArrowDropDown,
  },
  {
    label: "Sign Out",
    icon: MdArrowDropDown,
  },
];
 
function ProfileMenu({user}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={`${user?.avatar?.url}?${user?.avatar?.url}:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"`}
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
                {label}
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
 
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
 
  const renderItems = navListMenuItems.map(({ title, description }) => (
    <a href="#" key={title}>
      <MenuItem>
        <Typography variant="h6" color="blue-gray" className="mb-1">
          {title}
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          {description}
        </Typography>
      </MenuItem>
    </a>
  ));
 
  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as="a" href="#" variant="small" className="font-normal text-primarycolor">
            <MenuItem className="hidden items-center gap-2 font-medium text-primarycolor lg:flex lg:rounded-full">
              <FaServicestack className="h-[18px] w-[18px] text-primarycolor" />{" "}
              Services{" "}
              <MdArrowDropDown
                // strokeWidth={2}
                className={`text-primarycolor h-[18px] w-[18px] transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
          <Card
            color="blue"
            shadow={false}
            variant="gradient"
            className="col-span-3 grid h-full w-full place-items-center rounded-md"
          >
            <MdArrowDropDown strokeWidth={1} className="h-28 w-28" />
          </Card>
          <ul className="col-span-4 flex w-full flex-col gap-1">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <MenuItem className="flex items-center gap-2 font-medium  lg:hidden text-primarycolor">
        <MdArrowDropDown className="h-[18px] w-[18px] text-primarycolor" />{" "}
        Pages{" "}
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
 
function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
     
      {navListItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="white"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px] text-primarycolor" })}{" "}
            <span className="text-primarycolor"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
       <NavListMenu />
       {navListItems2.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="white"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            {React.createElement(icon, { className: "h-[18px] w-[18px] text-primarycolor" })}{" "}
            <span className="text-primarycolor"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}
 
export function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 const {user,isAuthenticated} = useSelector((state)=>state.user)
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 bg-bodycolor text-primarycolor">
      <div className="relative mx-auto flex items-center justify-between text-primarycolor">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          QuickFix
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
         {!isNavOpen&&( <HiBars3BottomRight className="h-6 w-6 text-primarycolor" />)}
         {isNavOpen&&( <RxCross1 className="h-6 w-6 text-primarycolor" />)}
        </IconButton>
 
        {
            !isAuthenticated && (<div placement="bottom-end">
                <Link to={"/login"}>
                    
            <Button size="sm" variant="text" className="text-primarycolor">
            <span>Log In</span>
          </Button>
          </Link>
          <Link to={"/signup"}>
         
          <Button size="sm" variant="text" className="text-primarycolor">
            <span>Sign up</span>
          </Button>
          </Link>
            </div> )
        }
        {
            isAuthenticated && (
                <ProfileMenu user={user} />
            )
        }
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}