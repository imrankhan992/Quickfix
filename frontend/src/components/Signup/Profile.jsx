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
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className="w-full md:max-w-[1750px] mx-auto h-[100vh]">
      <div className="w-full md:flex ">
        <div className="md:w-[20%] w-full  md:min-h-screen px-6 md:px-0 flex flex-col shadow-xl border-e border-bordercolor  bg-thirdcolor ">
          <div className="flex items-center justify-center flex-col relative  rounded-full mt-6">
            <img
              src={profileimage}
              className="w-32 flex bg-thirdcolor border border-bordercolor  p-2 rounded-full"
              alt=""
            />
            <Input
              id="picture"
              className="absolute h-full w-full cursor-pointer opacity-0"
              type="file"
            />

            <div className="flex gap-1 items-center justify-center border border-buttonborder text-primarycolor hover:bg-thirdcolor py-1 px-3  bg-buttoncolor   mt-3 rounded-full mb-6">
              {" "}
              <img src={plus} className="w-8 " /> Upload Photo
            </div>
            {/* <img
              src={plus}
              className="absolute w-10 bottom-0 right-10"
              alt=""
            /> */}
          </div>
        </div>
        {/* first grid */}
        <div className="w-full pb-4">
          <div className="py-5 px-8 md:flex items-center justify-between  hidden ">
           <h2 className="text-2xl text-primarycolor font-semibold">Setup your profile</h2>
            <DropdownMenuProfile />
          </div>
          <form className="w-full">
            <div className="md:grid md:grid-cols-2 gap-6 w-full px-6 mt-6">
              <div className="flex  flex-col col-span-2 gap-3">
                <Label
                  htmlFor="dob"
                  className="font-normal text-primarycolor  text-lg "
                >
                  Date of Birth
                </Label>
                <DatePicker
                  className="rounded-lg border border-bordercolor text-primarycolor md:w-[30%] bg-inputbg_color  "
                  id="dob"
                />

                <hr className="border border-bordercolor my-4" />
              </div>

              <div className="rounded-lg flex col-span-2 flex-col gap-3 ">
                <Label
                  htmlFor="experience"
                  className="font-normal text-primarycolor text-lg "
                >
                  Experience
                </Label>
                <TextInput
                  id="experience"
                  className="  md:w-[30%] rounded-lg border border-bordercolor text-primarycolor   bg-inputbg_color"
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
                  className="rounded-lg bg-inputbg_color border border-bordercolor text-primarycolor"
                >
                  <SelectItem
                    value="1"
                    className="bg-inputbg_color cursor-pointer "
                  >
                    Abbottabad
                  </SelectItem>
                  <SelectItem
                    value="2"
                    className="bg-inputbg_color cursor-pointer"
                  >
                    Manshera
                  </SelectItem>
                  <SelectItem
                    value="3"
                    className="bg-inputbg_color cursor-pointer"
                  >
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
                  className="rounded-lg bg-inputbg_color border border-bordercolor text-primarycolor"
                >
                  <SelectItem
                    value="1"
                    className="bg-inputbg_color cursor-pointer "
                  >
                    Carpainter
                  </SelectItem>
                  <SelectItem
                    value="2"
                    className="bg-inputbg_color cursor-pointer"
                  >
                    Electrician
                  </SelectItem>
                  <SelectItem
                    value="3"
                    className="bg-inputbg_color cursor-pointer"
                  >
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
                  className="  rounded-lg border border-bordercolor text-primarycolor  bg-inputbg_color"
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
                  className="  rounded-lg border border-bordercolor text-primarycolor  bg-inputbg_color"
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
                  className="  w-full rounded-lg border border-bordercolor text-primarycolor  bg-inputbg_color"
                  placeholder="Enter number"
                />
              </div>
              <div className="rounded-lg flex  col-span-2 mb-6 flex-col mt-6 gap-3 w-full md:w-[20%]">
                <Link className="border-2 border-buttonborder rounded-xl">
                <Button type="submit " className="bg-buttoncolor w-full rounded-lg">
                  Submit
                </Button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
