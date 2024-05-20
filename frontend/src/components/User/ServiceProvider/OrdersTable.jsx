// import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MdCalendarToday } from "react-icons/md";

// import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
import { useSocketContext } from "@/context/SocketContext";
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
 
const TABLE_HEAD = ["Project Title", "Address", "Quantity", "Price", "Full Details"];
 

 
export function OrdersTable() {
    const { newOrder} = useSocketContext()
  return (
    <Card className="h-full w-full bg-cardbg shadow-none">
      <CardHeader floated={false} shadow={false} className="rounded-none bg-cardbg">
        <div className="flex items-center justify-between gap-8 ">
          <div>
            <Typography variant="h5" className="arimo text-hoverblack font-bold">
             All Orders
            </Typography>
            <Typography className="mt-1 font-normal text-hoverblack">
             Request for your fav Project 
            </Typography>
          </div>
          
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search Order..."
              icon={<MdCalendarToday className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0 bg-primarycolor  rounded-t-3xl mt-4 shadow-lg">
        <table className=" w-[95%] mx-auto  table-auto text-left">
          <thead className="bg-cardbg ">
            <tr className="rounded-xl">
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className=" p-4"
                >
                  <Typography
                   
                    
                    className="arimo text-hoverblack font-bold"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {newOrder?.map(
              (order, index) => {
                const isLast = index === newOrder.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b-2  border-blue-gray-50";
 
                return (
                  <tr key={index } className="hover:bg-[#ECF8FE] hover:cursor-pointer">
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={order?.clientId?.avatar?.url} alt={order?.serviceId.title} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                           
                            className="font-normal arimo text-hoverblack "
                          >
                            {order?.serviceId?.title}
                          </Typography>
                          <Typography
                           
                            className="text-sm opacity-70 arimo "
                          >
                             {order?.serviceId?.description}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          className="font-normal arimo text-hoverblack text-sm"
                        >
                        {order?.address}
                        </Typography>
                       
                      </div>
                    </td>
                   
                    <td className={classes}>
                      <Typography
                        
                        className="font-normal arimo text-sm text-hoverblack"
                      >
                        {order?.quantity}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                        className="text-xl font-bold arimo"
                          variant="ghost"
                          size="sm"
                          value={"Rs"+ order?.price }
                          color={"green" }
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Order Details">
                       
                       <Link to={"/"} ><p className="text-sm arimo text-[#1e0fbd]">View Order Details</p></Link>
                       
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between rounded-b-3xl shadow-lg p-4 bg-primarycolor">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" className="arimo capitalize  text-[15px]" >
            Previous
          </Button>
          <Button variant="outlined"  className="arimo capitalize bg-buttoncolor text-[15px]">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}