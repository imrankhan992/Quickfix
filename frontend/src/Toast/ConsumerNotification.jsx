import React from "react";
import { Button, Rating, Typography } from "@material-tailwind/react";
import "./style.css"
import { toast } from "react-toastify";
import Notify from "./../ulities/Notify";
import ConsumerNotify from "@/ulities/ConsumerNotify";

const ConsumerNotification = (newOffer) => {
   toast(<ConsumerNotify newOffer={newOffer} />, {
    position: "top-center",
    className: "foo-bar custom-toast",
    style: { width: '900px' }
  });
};

export default ConsumerNotification;
