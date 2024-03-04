import React from "react";
import "./sidebar.css";
import {
  Card,
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
} from "@material-tailwind/react";

import { RiPresentationFill } from "react-icons/ri";
import { Link } from "react-router-dom";
export function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-[calc(100vh)]  rounded-none w-full max-w-[20rem] overflow-y-auto  bg-thirdcolor text-primarycolor scrollbar-hide ">
      <div className="mb-2 flex items-center gap-4 p-4 text-primarycolor">
        <img
          src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
          alt="brand"
          className="h-8 w-8"
        />
        <Typography variant="h5" color="text-primarycolor">
          QuickFix
        </Typography>
      </div>

      <List>
        <Link to={""}>
        <ListItem className="text-primarycolor hover:bg-buttoncolor hover:bg-opacity-100 hover:text-primarycolor   hover:border-2 hover:border-buttonborder p-[0.6rem]" >
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
