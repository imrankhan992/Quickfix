import React from "react";
import { Input } from "../ui/input";
import { TextInput } from "@tremor/react";
import { Label } from "../ui/label";
import { DatePicker } from "@tremor/react";
import profileimage from "../../assets/profile.svg";
import plus from "../../assets/plus.gif";
import "./profile.css";
import {
  MultiSelect,
  MultiSelectItem,
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
} from "@tremor/react";
import { Button } from "../ui/button";
import { DropdownMenuProfile } from "./DropdownMenuProfile";

const Profile = () => {
  return (
    <div className="w-full md:max-w-[1750px] mx-auto h-[100vh]">
      <div className="py-5 px-8 bg-primarycolor flex items-center justify-between">
        <img
          src="https://quickfix.co.uk/wp-content/uploads/2022/07/QuickFix-Logo-Colour.png"
          className="w-20"
          alt=""
        />
        <DropdownMenuProfile />
      </div>

      <div className="w-full md:flex ">
        <div className="md:w-[20%] w-full  px-6 md:px-0 flex flex-col   bg-hovercolor md:border-e-2 border-[#5b5757]">
          <div className="flex items-center justify-center flex-col relative  rounded-full mt-6">
            <img
              src={profileimage}
              className="w-32 flex bg-primarycolor  p-2 rounded-full"
              alt=""
            />
            <Input
              id="picture"
              className="absolute h-full w-full cursor-pointer opacity-0"
              type="file"
            />

            <div className="flex gap-1 items-center justify-center border-2 py-1 px-3 text-white bg-primarycolor hover:bg-greencolor mt-3 rounded-full mb-6">
              {" "}
              <img src={plus} className="w-8" /> Upload Photo
            </div>
            {/* <img
              src={plus}
              className="absolute w-10 bottom-0 right-10"
              alt=""
            /> */}
          </div>
        </div>
        {/* first grid */}
        <form className="w-full">
          <div className="md:grid md:grid-cols-2 gap-6 w-full px-6 mt-6">
            <div className="flex  flex-col col-span-2 gap-3">
              <Label
                htmlFor="dob"
                className="font-normal text-primarycolor text-lg "
              >
                Date of Birth
              </Label>
              <DatePicker
                className="rounded-lg border-2 md:w-[30%] bg-hovercolor "
                id="dob"
              />

              <hr />
            </div>

            <div className="rounded-lg flex col-span-2 flex-col mt-3 gap-3 ">
              <Label
                htmlFor="experience"
                className="font-normal text-primarycolor text-lg "
              >
                Experience
              </Label>
              <TextInput
                id="experience"
                className="  md:w-[30%] rounded-lg border-2   bg-hovercolor"
                placeholder="Experience"
              />
            </div>
            <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
              <Label
                htmlFor="city"
                className="font-normal text-primarycolor text-lg "
              >
                City
              </Label>
              <Select
                defaultValue="1"
                className="rounded-lg bg-hovercolor border-2"
              >
                <SelectItem value="1" className="bg-hovercolor cursor-pointer ">
                  Abbottabad
                </SelectItem>
                <SelectItem value="2" className="bg-hovercolor cursor-pointer">
                  Manshera
                </SelectItem>
                <SelectItem value="3" className="bg-hovercolor cursor-pointer">
                  Haripur
                </SelectItem>
              </Select>
            </div>
            <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
              <Label
                htmlFor="city"
                className="font-normal text-primarycolor text-lg "
              >
                Job
              </Label>
              <Select
                defaultValue="1"
                className="rounded-lg bg-hovercolor border-2"
              >
                <SelectItem value="1" className="bg-hovercolor cursor-pointer ">
                  Carpainter
                </SelectItem>
                <SelectItem value="2" className="bg-hovercolor cursor-pointer">
                  Electrician
                </SelectItem>
                <SelectItem value="3" className="bg-hovercolor cursor-pointer">
                  Plumber
                </SelectItem>
              </Select>
            </div>
            <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
              <Label
                htmlFor="address"
                className="font-normal text-primarycolor text-lg "
              >
                Address
              </Label>
              <TextInput
                id="address"
                className="  rounded-lg border-2  bg-hovercolor"
                placeholder="Enter street address"
              />
            </div>
            <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
              <Label
                htmlFor="zipcode"
                className="font-normal text-primarycolor text-lg "
              >
                Zip code
              </Label>
              <TextInput
                id="zipcode"
                className="  rounded-lg border-2  bg-hovercolor"
                placeholder="Enter Zip/Postal code"
              />
            </div>
            <div className="rounded-lg flex   flex-col mt-3 gap-3 w-full ">
              <Label
                htmlFor="zipcode"
                className="font-normal text-primarycolor text-lg "
              >
                Phone
              </Label>
              <TextInput
                type="number"
                id="zipcode"
                className="  w-full rounded-lg border-2  bg-hovercolor"
                placeholder="Enter number"
              />
            </div>
            <div className="rounded-lg flex  col-span-2 mb-6 flex-col mt-6 gap-3 w-full md:w-[20%]">
              <Button type="submit " className="bg-primarycolor">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
