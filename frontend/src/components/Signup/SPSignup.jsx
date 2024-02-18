import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";

const SPSignup = () => {
  const handlesubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      {/* header */}
      <div className="w-full h-full">
        <div className="max-w-[1750px] mx-auto">
          <div className="flex  justify-center items-center py-3 px-8">
            <div>logo here</div>
            <div className="ms-auto flex justify-end gap-4 items-center">
              <div>
                <p>Here to hire talent?</p>
              </div>
              <div>
                <a>Join as a Client</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* form */}
      <div className=" w-full md:max-w-[1750px] mx-auto h-[100vh] ">
        <div className="md:w-[40%] mx-auto flex flex-col  items-center px-3 ">
          <h1 className=" text-primarycolor text-3xl font-semibold px-2 py-5 text-center">
            Sign up to find work you love
          </h1>
          <form className="grid grid-cols-2 gap-3 w-full py-5">
            {/* first name  */}
            <div>
              <Label
                htmlFor="name"
                className="font-normal text-primarycolor text-lg"
              >
                First name
              </Label>
              <Input
                className="border-2 focus:border-none border-gray-200"
                type="text"
                id="name"
              />

            </div>

            {/* last name */}
            <div>
              <Label
                htmlFor="lastname"
                className="font-normal text-primarycolor text-lg"
              >
                Last name
              </Label>
              <Input
                className="border-2 focus:border-none border-gray-200"
                type="text"
                id="lastname"
              />
            </div>
            {/* email */}
            <div className="col-span-2">
              <Label
                htmlFor="email"
                className="font-normal text-primarycolor text-lg"
              >
                Email
              </Label>
              <Input
                className="border-2 focus:border-none border-gray-200"
                type="email"
                id="email"
              />
            </div>
            {/* password */}
            <div className="col-span-2">
              <Label
                htmlFor="password"
                className="font-normal text-primarycolor text-lg"
              >
                Password
              </Label>
              <Input
                className="border-2 focus:border-none border-gray-200"
                type="password"
                id="password"
              />
            </div>
            {/* confirm password */}
            <div className="col-span-2">
              <Label
                htmlFor="password"
                className="font-normal text-primarycolor text-lg"
              >
                Confirm Password
              </Label>
              <Input
                className="border-2 focus:border-none border-gray-200"
                type="password"
                id="password"
              />
            </div>
            {/* accept terms and conditons */}
            <div className="items-top flex space-x-2 col-span-2">
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
                <p className="text-sm text-muted-foreground">
                  You agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
            <div className="py-5 items-center flex justify-center col-span-2">
              <Button>Create my account</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SPSignup;
