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

export function Sidebar() {
  const [open, setOpen] = React.useState(1);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-full w-full  rounded-none bg-thirdcolor ">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        {/* dashboard */}
        <Link onClick={() => handleOpen(1)}>
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
        <ListItem>
          <ListItemPrefix>
            <MdDashboard className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <MdDashboard className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <MdDashboard className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}
