import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import axiosInstance from "@/ulities/axios";
import SetuPSpinner from "../Spinner/SetUpSpinner";

export default function setUprofilePrivate() {
    const [ok, setok] = useState(false);
    const [message, setmessage] = useState("");
   
  
  
      
  
   useEffect(() => {
    const authCheck = async () => {
        try {
          const { data } = await axiosInstance.get(`/api/v1/admin/protect-admin`);
         
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
     authCheck()
   }, [])
   
  
    console.log(message);
    return ok ? <Outlet /> : <SetuPSpinner message={message} path="" />;
  }