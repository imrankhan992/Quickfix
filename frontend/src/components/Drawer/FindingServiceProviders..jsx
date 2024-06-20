import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@material-tailwind/react";
import { SkeletonCard } from "./../skeleton/CardSkeleton";
export function FindingServiceProviders({ currentservice, loading, errors }) {
  const [goal, setGoal] = React.useState(350);
  console.log(errors.address === undefined || errors.dateandtime === undefined);
  return (
    <Drawer>
      {errors?.address === undefined && errors?.dateandtime === undefined && (
        <DrawerTrigger asChild>
          <Button
            type="submit"
            className="w-full bg-buttoncolor text-hoverblack arimo text-[16px] capitalize rounded-xl"
          >
            Find {currentservice?.category?.category}
          </Button>
        </DrawerTrigger>
      )}
      {errors?.address !== undefined ||
        (errors?.dateandtime !== undefined && (
          <Button
            type="submit"
            className="w-full bg-buttoncolor text-hoverblack arimo text-[16px] capitalize rounded-xl"
          >
            Find {currentservice?.category?.category}
          </Button>
        ))}
      <DrawerContent className="bg-cardbg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        {loading && <SkeletonCard />}
        {!loading && (
          <div className="mx-auto  w-full max-w-3xl p-4   bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <DrawerHeader>
              <DrawerTitle>
                Just a moment, we're waiting to hear back from our service
                providers. Thanks for your patience!
              </DrawerTitle>
              <DrawerDescription>
                Set your daily activity goal.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0 h-[200px]">
              {/* <div className="mt-3 relative flex items-center justify-center">
                <iframe
                  src="https://lottie.host/embed/ff505e7b-30a8-4e17-afde-3744e3d2e0a3/5PMjASzAQ4.json"
                  className="w-96 h-96 absolute bottom-0 z-50"
                ></iframe>
              </div> */}
            </div>
            {/* <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter> */}
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}
