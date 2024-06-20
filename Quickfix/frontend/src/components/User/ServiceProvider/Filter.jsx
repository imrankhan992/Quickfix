import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoFilter } from "react-icons/io5";

export function Filter({ allcategories, setcategory }) {
  const [position, setPosition] = React.useState("bottom")
  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild className="p-0  ">
        <Button className="bg-cardbg px-2 flex items-center gap-1 outline-1 ">
          <IoFilter />
          Add Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-cardbg ">
        <DropdownMenuLabel className="text-hoverblack">
          Add filters
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="" />
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={(e) => {
            setPosition(e);
            setcategory(e);
           
          }}
          className="text-hoverblack"
        >
          <DropdownMenuRadioItem value={"All"} className="cursor-pointer">
            All
          </DropdownMenuRadioItem>
          {allcategories?.map((cat, index) => {
            return (
              <DropdownMenuRadioItem
                key={index}
                value={cat?.category}
                className="cursor-pointer"
              >
                {cat?.category}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
