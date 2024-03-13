import { FaUserClock } from "react-icons/fa";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  
  CardBody,
  Chip,
  
  Avatar,
  
  Tooltip,
} from "@material-tailwind/react";
import logo from "../../assets/quickfix logo.png";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";
import Header from "./Header";
import { MdEdit } from "react-icons/md";
import { AlertDialog } from "./AlertDialog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { spDataAction } from "../Actions/SpAction";
import Loader from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

import { CiFilter } from "react-icons/ci";


import { FaPlus } from "react-icons/fa6";

const TABLE_HEAD = ["Name", "Products", "Action"];


export function AddCategories() {
    
  const dispatch = useDispatch();
  const { SPuser, SPloading, SPsuccess, SPerror } = useSelector(
    (state) => state.spData
  );
  useEffect(() => {
    dispatch(spDataAction());
  }, [dispatch]);

  return (
    <>
      <BurgerMenu />
      <div className="flex ">
        <Aside open={2} />

        <main className="lg:w-[100%] w-full  min-h-screen">
          <Header />
          <div className="w-full  min-h-screen p-4 flex flex-col gap-4">
            {/* heading */}

            <div className="flex justify-between">
            <h3 className="text-primarycolor text-2xl">
             Add Services
            </h3>
            <Button className="bg-buttoncolor border border-buttonborder flex gap-2 items-center justify-center capitalize text-sm"><FaPlus /> Add new Service</Button>
            </div>
            {/* table */}
            {!SPloading && (
              <Card className="h-full w-full rounded-none bg-thirdcolor z-1">
                <CardHeader
                  floated={false}
                  shadow={false}
                  className="rounded-none bg-thirdcolor"
                >
                 
                  <div className="flex flex-col items-center  gap-4 md:flex-row bg-thirdcolor">
                    
                    <div className="w-full md:w-72">
                      <Input
                        label="Search"
                        icon={<FaUserClock className="h-5 w-5" />}
                      />
                    </div>
                    <div><Button className="bg-buttoncolor text-primarycolor border border-buttonborder capitalize text-sm flex gap-1 items-center justify-center py-2 px-2"><CiFilter className="text-[18px] font-bold" /> Filter</Button></div>
                  </div>
                </CardHeader>
                <CardBody className="px-0 bg-thirdcolor text-primarycolor overflow-auto">
                  <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head, index) => (
                          <th
                            key={head}
                            className="cursor-pointer border-y border-blue-gray-100 bg-thirdcolor p-4 transition-colors hover:bg-blue-gray-50 hover:text-hoverblack"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="flex items-center justify-between gap-2 font-normal leading-none opacity-70  hover:text-hoverblack text-primarycolor"
                            >
                              {head}{" "}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SPuser?.map(
                        (
                          {
                            avatar,
                            firstname,
                            lastname,
                            email,
                            _id,
                            org,
                            accountStatus,
                            date,
                          },
                          index
                        ) => {
                          const isLast = index === SPuser?.length - 1;
                          const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50 ";

                          return (
                            <tr key={firstname}>
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <Avatar
                                    src={avatar?.url}
                                    alt={firstname}
                                    size="sm"
                                  />
                                  <div className="flex flex-col ">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal text-primarycolor"
                                    >
                                      {firstname + " " + lastname}
                                    </Typography>
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal opacity-70 text-primarycolor"
                                    >
                                      {email}
                                    </Typography>
                                  </div>
                                </div>
                              </td>

                              <td className={classes}>
                                <div className="w-max ">
                                  <Chip
                                    className="text-primarycolor"
                                    variant="ghost"
                                    size="sm"
                                    value={accountStatus}
                                    color={
                                      accountStatus === "pending"
                                        ? "yellow"
                                        : "blue-gray"
                                    }
                                  />
                                </div>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal text-primarycolor"
                                >
                                  23/3/4
                                </Typography>
                              </td>
                              
                             
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            )}

            {/* if sp data loading */}
            {SPloading && <Loader />}
            
          </div>
          {/* testing */}
        </main>
      </div>
    </>
  );
}

