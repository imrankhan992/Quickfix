import React, { useEffect, useState } from 'react'
import { BurgerMenu } from './BurgerMenu'
import Aside from './Aside'
import Main from './Main'
import { loadUserData } from '@/components/Actions/Registration'
import { useDispatch, useSelector } from 'react-redux'
import axiosInstance from '@/ulities/axios'

const Dashboard = () => {
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
 
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // useEffect(() => {
  //   dispatch(loadUserData())
  //  }, []);
  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px] ">
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={1} />
        <Main user={user} products={products} />
      </div>
    </div>
  )
}

export default Dashboard