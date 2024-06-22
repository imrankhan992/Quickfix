import React, { useEffect, useState } from "react";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";
import { loadUserData } from "@/components/Actions/Registration";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import ReactStars from "react-rating-stars-component";
import axiosInstance from "@/ulities/axios";
import { Filter } from "./Filter";
import { errorToast } from "@/Toast/Toast";

const Services = () => {
  const [category, setcategory] = useState("All");
  const [products, setproducts] = useState([]);
  const [newfilterproducts, setnewfilterproducts] = useState([]);
  // Function to filter products based on the selected category
  const filterProductsByCategory = () => {
   
    if (category === "All") {
      return products;
    } else {

      return products.filter((product) => {  return product.category.category === category});
    }
  };
  const filteredProducts = filterProductsByCategory();
  console.log(filteredProducts?.length === 0);

  const [loading, setloading] = useState(false);
  //   get all products
  const getallProducts = async (req, res) => {
    try {
      setloading(true);
      const { data } = await axiosInstance.get(
        "/api/v1/admin/get-all-products"
      );
      if (data?.success) {
        setproducts(data?.products);
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      errorToast(error.response.data.message);
    }
  };

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [allcategories, setallcategories] = useState();
  // get all categories
  const getallcategories = async (req, res) => {
    try {
      const { data } = await axiosInstance.get(
        "/api/v1/admin/get-all-categories"
      );
      if (data?.success) {
        setallcategories(data?.categories);
      }
    } catch (error) {
      errorToast(error.response.data.message);
    }
  };
  useEffect(() => {
    getallProducts();
    // dispatch(loadUserData());
    
    getallcategories();
    
  }, []);
  //   console.log(newfilterproducts);
  //   console.log(products);
  return (
    <div className=" w-full h-full mx-auto max-w-[1750px] bg-cardbg">
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={2} />
        <main className="text-hoverblack w-full">
          
            <Header user={user} />
         
          {/* all services */}
          <div className="px-8 py-6">
            <div className="flex items-center justify-start">
              <Filter allcategories={allcategories} setcategory={setcategory} />
            </div>
          </div>
          <div className="px-8 ">
            <div className="flex items-center justify-start text-3xl font-bold" >
              All Services
            </div>
          </div>
          <div className=" grid md:grid-cols-3 gap-3  w-full px-8 pb-16 py-6">
            {filteredProducts &&
              filteredProducts?.map((product, index) => {
                return (
                  <div
                    key={index}
                    className="flex gap-2 border p-4 rounded-lg bg-primarycolor text-hoverblack"
                  >
                    <div className="text-hoverblack">
                      <img
                        src={product?.picture?.url}
                        className="w-32 h-32 rounded-lg object-contain"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h1 className="text-hoverblack">{product?.title}</h1>
                      <p className=" text-mutedcolor">{product?.description}</p>
                      <p className="text-hoverblack">Rs:{product?.price}</p>
                      <div className="flex justify-between gap-3">
                        <div className="flex items-center justify-center">
                          <p className="text-hoverblack">
                            <ReactStars
                              count={4}
                              size={20}
                              activeColor="#ffd700"
                              edit={false}
                              value={0}
                              half={true}
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            {/* if product not found */}
            {filteredProducts?.length === 0 && (
              <div className="flex items-center justify-center col-span-3">
                <p className="text-hoverblack">Oops: Products not found</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Services;
