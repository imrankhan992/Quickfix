import React, { useEffect, useState } from "react";
import Aside from "./Aside";
import { BurgerMenu } from "./BurgerMenu";
import Main from "./Main";
import { useDispatch, useSelector } from "react-redux";
import { loadUserData } from "@/components/Actions/Registration";
import axiosInstance from "@/ulities/axios";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);
  
  const [products, setproducts] = useState([]);
  
  const [loading, setloading] = useState(false)
   //   get all products
   const getallProducts = async (req, res) => {
     try {
       setloading(true);
       const { data } = await axiosInstance.get("/api/v1/admin/get-all-products");
       if (data?.success) {
         setproducts(data?.products);
         setloading(false);
       }
     } catch (error) {
       setloading(false);
       errorToast(error.response.data.message);
     }
   };
   useEffect(() => {
 
     getallProducts();
     
   }, []);
  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px] ">
      <div className="flex relative">
        <BurgerMenu />
        <Aside user={user} open={1}/>
        <Main user={user} products={products}/>
      </div>
    </div>
  );
};

export default Dashboard;
