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

const ChangePriceDialog = ({ currentservice }) => {
  return (
    <Dialog className="">
      <DialogTrigger asChild>
        <Button variant="outline" className="arimo">
          <BiSolidMessageSquareEdit className="text-2xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-cardbg ">
        <DialogHeader>
          <DialogTitle className="text-xl">Offer your price</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <div className="flex justify-center items-center w-full">
          <div className="flex justify-center items-center ">
            <p htmlFor="name" className=" text-5xl text-mutedcolor font-bold">
              PKR
            </p>
            <Input
              id="name"
              defaultValue={currentservice?.price}
              className=" border-none text-5xl"
            />
          </div>
        </div>
        <Switch
          label={
            <div className="ml-4">
              <Typography color="blue-gray" className="arimo font-semibold">
                Automatically accept the nearest{" "}
                {currentservice?.category?.category} for PKR{" "}
                {currentservice?.price}
              </Typography>
            </div>
          }
          containerProps={{
            className: "-mt-5 ",
          }}
        />

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

export default ChangePriceDialog;
