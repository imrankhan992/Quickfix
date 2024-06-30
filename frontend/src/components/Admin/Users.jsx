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
import { useEffect } from "react";
import { spDataAction } from "../Actions/SpAction";
import Loader from "../Spinner/Spinner";
import { Link } from "react-router-dom";



const TABLE_HEAD = ["Member", "Status", "Date", "View", "Quick Action"];


export function Users() {
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
        <Aside open={3} />

        <main className="lg:w-[100%] w-full  h-full bg-thirdcolor">
          <Header />
          <div className="w-full  min-h-screen p-4 flex flex-col gap-4">
            {/* heading */}

            <h3 className="text-hoverblack text-2xl">
              All Service Providers
            </h3>
            {/* table */}
            {!SPloading && (
              <Card className="h-full w-full rounded-none bg-thirdcolor z-1">
                <CardHeader
                  floated={false}
                  shadow={false}
                  className="rounded-none bg-thirdcolor"
                >
                  <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                      <Typography variant="h5" className="text-hoverblack">
                        Customer list
                      </Typography>
                      <Typography
                        color="gray"
                        className="mt-1 font-normal text-hoverblack"
                      >
                        See information about all members
                      </Typography>
                    </div>
                   
                  </div>
                  <div className="flex flex-col items-center justify-between gap-4 md:flex-row bg-thirdcolor">
                    
                    <div className="w-full md:w-72">
                      <Input
                        label="Search"
                        icon={<FaUserClock className="h-5 w-5" />}
                        className="focus-visible:ring-offset-0 focus:outline-none"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="px-0 bg-thirdcolor text-hoverblack overflow-auto">
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
                              className="flex items-center justify-between gap-2 font-normal leading-none opacity-70  hover:text-hoverblack text-hoverblack"
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
                                      className="font-normal text-hoverblack"
                                    >
                                      {firstname + " " + lastname}
                                    </Typography>
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal opacity-70 text-hoverblack"
                                    >
                                      {email}
                                    </Typography>
                                  </div>
                                </div>
                              </td>

                              <td className={classes}>
                                <div className="w-max ">
                                  <Chip
                                    className="text-hoverblack"
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
                                  className="font-normal text-hoverblack"
                                >
                                  23/3/4
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Link to={`/admin/dashboard/applicant/${_id}`}>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal text-hoverblack underline"
                                  >
                                    View Profile
                                  </Typography>
                                </Link>
                              </td>
                              <td className={classes}>
                                <Tooltip content="Edit User">
                                  <AlertDialog
                                    id={_id}
                                    accountStatuss={accountStatus}
                                  />
                                </Tooltip>
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
