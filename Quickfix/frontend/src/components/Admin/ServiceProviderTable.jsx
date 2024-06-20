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
    <Card className="h-full w-full rounded-none bg-thirdcolor">
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-thirdcolor"
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" className="text-primarycolor">
              Members list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal text-primarycolor">
              See information about all service providers
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row bg-thirdcolor">
          
          <div className="w-full md:w-72">
            <Input label="Search" color="white" icon={<FaUserClock className="h-5 w-5" />} className="disabled:bg-green-500 placeholder-shown:border-red-500 outline-none focus:border-primarycolor" />
          </div>
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
                            className="font-normal text-primarycolor"
                          >
                            {name}
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
                          color={accountStatus==="pending" ? "yellow" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal text-primarycolor"
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


