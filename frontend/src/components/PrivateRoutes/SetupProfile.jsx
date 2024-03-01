import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import axiosInstance from "@/ulities/axios";
import SetuPSpinner from "../Spinner/SetUpSpinner";

export default function setUprofilePrivate() {
  const [ok, setok] = useState(false);
  const [message, setmessage] = useState("");
  const [emailverified, setemailverified] = useState(false);
  const [profileset, setprofileset] = useState(false)

  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/v1/profile-setup/protect`
        );
        const res = await axiosInstance.get(
          `/api/v1/profile-setup/email-verified`
        );
        const resdata = await axiosInstance.get(
          `/api/v1/profile-setup/protect-data`
        );

        if (res.data?.ok) {
          setemailverified(true);
        }
        if (resdata.data?.ok) {
          setprofileset(true);
        }
        if (data.ok === true) {
          setok(true);
        }
      } catch (error) {
        //   if (error.response.status === 400 || error.response.status === 500 ) {
        //     setmessage(error.response.data.message);
        //   }
      }
    };
    authCheck();
  }, []);

  

  return ok && emailverified && profileset ? (
    <Outlet />
  ) : (
    <SetuPSpinner message={message} path="" />
  );
}
