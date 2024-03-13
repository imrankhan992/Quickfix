import React from "react";
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
} from "@material-tailwind/react";

import { MdDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

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
        <Link onClick={() => handleOpen(1)} to={"/admin/dashboard/my profile"}>
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
        {/* users */}
        <Link onClick={() => handleOpen(2)} to={"/admin/dashboard/customers"}>
        <ListItem className={`text-primarycolor focus:bg-buttoncolor focus:text-primarycolor focus:bg-opacity-100 hover:bg-buttoncolor hover:text-primarycolor hover:border-buttonborder hover:border ${
              open === 2
                ? "bg-buttoncolor text-primarycolor border-buttonborder border"
                : ""
            }`}>
          <ListItemPrefix>
            <MdDashboard className="h-5 w-5" />
          </ListItemPrefix>
          Service Provider
        </ListItem>
        </Link>
        
      </List>
    </Card>
  );
}
