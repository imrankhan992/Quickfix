import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CiCircleCheck } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { CiCircleAlert } from "react-icons/ci";
import { TbLockOff } from "react-icons/tb";
import { MdOutlineChangeHistory } from "react-icons/md";

export function AccountStatus({setaccountStatus}) {
  return (
    <Select  onValueChange={(e)=>{setaccountStatus(e)}}>
      <SelectTrigger className="w-full bg-thirdcolor ">
       <div className="flex gap-2 items-center"> <MdOutlineChangeHistory className="text-xl text-red-900"/> <SelectValue placeholder="Change Account Status" /></div>
       
      </SelectTrigger>
      <SelectContent >
        <SelectGroup>
        <SelectItem value="pending" className="text-yellow-900 "><div className="flex items-center  gap-2"><CiTimer /> <span>pending</span></div></SelectItem>
        <SelectItem value="approve" className="text-green-900"><div  className="flex items-center  gap-2"><CiCircleCheck/> approve</div></SelectItem>
          <SelectItem value="reject" className="text-red-900"><div className="flex items-center  gap-2"><RxCrossCircled/> reject</div></SelectItem>
          <SelectItem value="deactivate" className="text-pink-900"><div className="flex items-center  gap-2"><CiCircleAlert/> deactivate</div></SelectItem>
          <SelectItem value="disabled" ><div className="flex items-center  gap-2"><TbLockOff/> disabled</div></SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
