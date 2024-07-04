import { FaUserClock } from "react-icons/fa";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import logo from "../../assets/quickfix logo.png";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";
import Header from "./Header";
import { MdEdit } from "react-icons/md";
import { AlertDialog } from "./AlertDialog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { spDataAction } from "../Actions/SpAction";
import Loader from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import { errorToast } from "@/Toast/Toast";
import axiosInstance from "@/ulities/axios";
import  { ProductsCard } from "./Card";

const TABLE_HEAD = ["Member", "Status", "Date", "View", "Quick Action"];

const AllProducts = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  const { SPuser, SPloading, SPsuccess, SPerror } = useSelector(
    (state) => state.spData
  );
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
    dispatch(spDataAction());
  }, [dispatch]);

  return (
    <>
      <BurgerMenu />
      <div className="flex ">
        <Aside open={5} />

        <main className="lg:w-[100%] w-full  h-full bg-cardbg">
          <Header />
          <div className="w-full  min-h-screen p-4 flex flex-col gap-4 ">
            {/* heading */}

            <h3 className="text-hoverblack text-2xl font-bold arimo">All Services</h3>
            <div className=" grid md:grid-cols-3 gap-3  w-full h-full">
              <ProductsCard products={products} getallProducts={getallProducts}/>
            </div>
          </div>
          {/* testing */}
        </main>
      </div>
    </>
  );
};

export default AllProducts;
