import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import axiosInstance from "@/ulities/axios";

export default function ServiceProviderPrivate() {
  const [ok, setok] = useState(false);
  const [message, setmessage] = useState("");

  useEffect(() => {
    const authCheck = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/v1/protected-serviceprovider`
        );

        if (data?.success === true) {
          setok(true);
        } else {
          setok(false);
        }
      } catch (error) {}
    };
    authCheck();
  }, []);

  return ok ? <Outlet /> : <Spinner message={message} path="" />;
}
