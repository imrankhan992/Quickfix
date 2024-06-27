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




const OrderStatusUpdate = ({ status ,setStatus,handleBlur,data }) => {
   
  return (
    <Select name="clientSideOrderStatus"  onValueChange={setStatus} onBlur={handleBlur}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Update Status" value={status} />
      </SelectTrigger>
      <SelectContent className="bg-primarycolor" >
        <SelectGroup>
          <SelectLabel>Update Status</SelectLabel>
          {data.map((item) => (
            <SelectItem
              key={item}
              value={item}
              className={`cursor-pointer ${
                item === "Cancel" ? "text-errorcolor" : "text-green-500"
              }`}
            >
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default OrderStatusUpdate;
