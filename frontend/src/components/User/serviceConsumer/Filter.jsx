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
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu s>
      <DropdownMenuTrigger asChild className="p-0 border ">
        <Button className="bg-cardbg px-2 flex items-center gap-1 outline-1 outline-bordercolor font-bold text-hoverblack">
          <IoFilter />
          Add Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-thirdcolor border border-bordercolor">
        <DropdownMenuLabel className="text-hoverblack">
          Add filters
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="border border-bordercolor" />
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
