import React from "react";
import { Input } from "../ui/input";
import { TextInput } from "@tremor/react";
import { Label } from "../ui/label";
import { DatePicker } from "@tremor/react";
import profileimage from "../../assets/profile.svg";
import plus from "../../assets/plus.gif";
import {
  MultiSelect,
  MultiSelectItem,
  SearchSelect,
  SearchSelectItem,
  Select,
  SelectItem,
} from "@tremor/react";
import { Button } from "../ui/button";
const Profile = () => {
  return (
    <div className="w-full md:max-w-[1750px] mx-auto h-[100vh]">
      <div className="p-5">
        <p>logo</p>
      </div>
      <hr />
      <div className="w-full md:flex p-4">
        <div className="md:w-[20%] w-full  px-6 md:px-0 flex flex-col ">
          <div className="flex items-center justify-center flex-col relative r rounded-full">
            <img
              src={profileimage}
              className="w-32 flex bg-primarycolor hover:bg-hovercolor p-2 rounded-full"
              alt=""
            />
            <Input
              id="picture"
              className="absolute h-full w-full cursor-pointer opacity-0"
              type="file"
            />
            {/* <img
              src={plus}
              className="absolute w-10 bottom-0 right-10"
              alt=""
            /> */}
          </div>
        </div>
        {/* first grid */}
        <form className="w-full">
          <div className="md:grid md:grid-cols-2 gap-6 w-full px-6">
            <div className="flex  flex-col col-span-2 gap-3">
              <Label
                htmlFor="dob"
                className="font-normal text-primarycolor text-lg "
              >
                Date of Birth
              </Label>
              <DatePicker
                className="rounded-lg md:w-[30%] bg-hovercolor"
                id="dob"
              />

              <hr />
            </div>

            <div className="rounded-lg flex col-span-2 flex-col mt-3 gap-3">
              <Label
                htmlFor="experience"
                className="font-normal text-primarycolor text-lg "
              >
                Experience
              </Label>
              <TextInput
                id="experience"
                className=" max-w-xs md:w-[30%] rounded-lg border-2 bg-hovercolor"
                placeholder=""
              />
            </div>
            <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
              <Label
                htmlFor="city"
                className="font-normal text-primarycolor text-lg "
              >
                City
              </Label>
              <Select defaultValue="1" className="rounded-lg bg-hovercolor">
                <SelectItem value="1" className="bg-hovercolor cursor-pointer ">Abbottabad</SelectItem>
                <SelectItem value="2" className="bg-hovercolor cursor-pointer">Manshera</SelectItem>
                <SelectItem value="3" className="bg-hovercolor cursor-pointer">Haripur</SelectItem>
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
                className=" max-w-xs rounded-lg border-2 bg-hovercolor"
                placeholder=""
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
                className=" max-w-xs rounded-lg border-2 bg-hovercolor"
                placeholder=""
              />
            </div>
            <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full ">
              <Label
                htmlFor="zipcode"
                className="font-normal text-primarycolor text-lg "
              >
                Phone
              </Label>
              <TextInput
                type="number"
                id="zipcode"
                className=" max-w-xs w-full rounded-lg border-2 bg-hovercolor"
                placeholder=""
              />
            </div>
            <div className="rounded-lg flex  flex-col mt-3 gap-3 w-full md:w-[20%]">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
