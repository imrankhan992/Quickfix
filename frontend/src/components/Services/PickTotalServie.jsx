import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BiSolidMessageSquareEdit } from "react-icons/bi";

import { Switch, Typography } from "@material-tailwind/react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const PickTotalServie = ({
  currentservice,
  totalnumber,
  price,
  setprice,
  settotalnumber,
  setnewprice
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="arimo">
          <BiSolidMessageSquareEdit className="text-2xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-cardbg rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Total number of {currentservice?.title}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="flex justify-center items-center w-full">
          <div className="flex justify-center items-center ">
            <p htmlFor="name" className=" text-5xl text-mutedcolor font-bold">
              TOTAL
            </p>
            <Input
              id="name"
              value={totalnumber <= 0 ? settotalnumber(1) : totalnumber}
              type="number"
              className=" border-none text-5xl"
              onChange={(e) => {
                settotalnumber(e.target.value);
              }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            className="bg-buttoncolor w-full text-xl font-bold rounded-xl"
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PickTotalServie;
