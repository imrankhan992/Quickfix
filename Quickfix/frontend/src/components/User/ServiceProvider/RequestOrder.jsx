import React from "react";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";

import { useSelector } from "react-redux";
import Header from "./Header";
import { useSocketContext } from "@/context/SocketContext";
import { OrdersTable } from "./OrdersTable";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const RequestOrder = () => {
  const [activeTab, setActiveTab] = React.useState("Active Orders");
  const { user } = useSelector((state) => state.user);
  const { newOrder } = useSocketContext();
  const data = [
   
    {
      label: "Active Orders",
      value: "Active Orders",
     
    },
    {
      label: "Expired Orders",
      value: "Expired Orders",
     
    },
    {
      label: "Completed Orders",
      value: "Completed Orders",
    
    },
  ];
  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px] ">
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={6} />
        <main className="bg-cardbg w-full">
          <Header user={user} />

          <div className="px-8 py-6">
            <div className=" py-6 flex gap-6">
              {/* filter by tags */}
              <Tabs value={activeTab} className="w-full">
                <TabsHeader
                  className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                  indicatorProps={{
                    className:
                      "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                  }}
                >
                  {data.map(({ label, value }) => (
                    <Tab
                      key={value}
                      value={value}
                      onClick={() => setActiveTab(value)}
                      className={activeTab === value ? "text-gray-900" : ""}
                    >
                      {label}
                    </Tab>
                  ))}
                </TabsHeader>
                {/* <TabsBody>
                  {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                      {desc}
                    </TabPanel>
                  ))}
                </TabsBody> */}
              </Tabs>
            </div>

            {/* orders table */}
            <OrdersTable activeTab={activeTab} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RequestOrder;
