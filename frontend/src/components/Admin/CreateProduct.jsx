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
import { useEffect, useRef } from "react";
import { spDataAction } from "../Actions/SpAction";
import Loader from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";

const TABLE_HEAD = ["Member", "Status", "Date", "View", "Quick Action"];

export function CreateProduct() {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <>
      <BurgerMenu />
      <div className="flex ">
        <Aside open={4} />

        <main className="lg:w-[100%] w-full  min-h-screen">
          <Header />
          <div className="w-full  min-h-screen p-4 flex flex-col gap-4">
            {/* heading */}

            <h3 className="text-primarycolor text-2xl">Add Product</h3>
            {/* product */}
            <div className=" grid md:grid-cols-4 gap-3 ">
              <div className="w-full  rounded-lg border-bordercolor flex items-center flex-col justify-center hover:bg-gray-700 border-2 border-dashed cursor-pointer hover:scale-105 hover:transition-all hover:animate-pulse">
                <div className=" md:h-60 h-32  relative cursor-pointer">
                  <input
                    id="fileInput"
                    type="file"
                    className="w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => console.log(e.target.files)}
                  />
                  <label htmlFor="fileInput" className="w-full  flex items-center ">
                    <p className=" text-center cursor-pointer text-mutedcolor absolute top-2 p-3 flex flex-col gap-3 items-center justify-center">
                      Upload cover picture
                      <AiOutlineCloudUpload className="text-white text-[60px] cursor-pointer"/>
                    </p>
                    
                  </label>
                  
                </div>
              </div>
              <div className="col-span-3 ">
            
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
