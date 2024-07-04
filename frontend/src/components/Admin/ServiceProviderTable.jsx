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
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { spDataAction } from "../Actions/SpAction";
import { Link } from "react-router-dom";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Member",  "Status", "Date"];



export function ServiceProviderTable() {
  const dispatch = useDispatch()
  const { SPuser, SPloading, SPsuccess, SPerror } = useSelector(
    (state) => state.spData
  );
  useEffect(() => {
    dispatch(spDataAction());
  }, []);
  
  return (
    <Card className="h-full w-full  border bg-thirdcolor rounded-xl">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-thirdcolor"
      >
        <div className=" flex items-center justify-between mt-6">
          
          <div className="flex items-center  gap-3">
            <h2 className="text-hoverblack arimo text-3xl font-bold mr-6 ">Service Providers</h2>
            <Link to={"/admin/dashboard/customers"} className="arimo text-hoverblack hover:text-buttoncolor transition-colors duration-1000">
              view all
            </Link>
          </div>
        </div>
        
      </CardHeader>
      <CardBody className="px-0 bg-thirdcolor text-hoverblack overflow-auto">
        <table className=" w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-sidebarbg p-4 transition-colors hover:bg-blue-gray-50 hover:text-primarycolor"
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
              ({ avatar, name, email, job, org, accountStatus, date }, index) => {
                const isLast = index === SPuser?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50 ";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={avatar?.url} alt={name} size="sm" />
                        <div className="flex flex-col ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-hoverblack"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal  text-hoverblack"
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
                          color={accountStatus==="pending" ? "yellow" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-hoverblack"
                      >
                        11/2/24
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
  );
}


