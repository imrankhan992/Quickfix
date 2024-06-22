import React, { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import axiosInstance from "@/ulities/axios";

export default function RegistrationPrivate({ route }) {
  const [ok, setok] = useState(false);
  const [message, setmessage] = useState("");
  const { token } = useParams();


    const authCheck = async () => {
      try {
        const { data } = await axiosInstance.get(`${route}/${token}`);
       
        if (data.success === true) {
          setok(true);
        } else {
          setok(false);
        }
      } catch (error) {
        
        if (error.response.status === 400 || error.response.status === 500 ) {
          setmessage(error.response.data.message);
        }
      }
    };

    window.onload = () => {
      authCheck();
    };
 // Empty dependency array ensures the effect runs only once after the initial render

 
  return ok ? <Outlet /> : <Spinner message={message} path="" />;
}


