import { Github,Pencil,Delete, LifeBuoy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BsThreeDotsVertical } from "react-icons/bs";
import { errorToast, showtoast } from "@/Toast/Toast";
import axiosInstance from "@/ulities/axios";
import { Link } from "react-router-dom";

export function ActionProduct({id,getallProducts,product}) {
    const deleteProduct = async(req,res)=>{
        try {
            const {data} = await axiosInstance.delete(`/api/v1/admin/delete-product/${id}`)
            if (data?.success) {
                showtoast(data?.message)
                getallProducts()
            }
        } catch (error) {
            errorToast(error?.response?.data?.message)
        }
    }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="focus-visible:ring-offset-0 border-none p-0"><BsThreeDotsVertical className="text-xl"/></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 focus-visible:ring-offset-0 bg-thirdcolor text-primarycolor border border-bordercolor">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />

       <Link to={`/admin/dashboard/edit-product/${product?._id}`}>
       <DropdownMenuItem className="focus-visible:ring-offset-0 cursor-pointer">
          <Pencil className="mr-2 h-4 w-4" />
          <span>Edit</span>
        </DropdownMenuItem>
       </Link>
        <DropdownMenuItem className="cursor-pointer" onClick={deleteProduct}>
          <Delete className="mr-2 h-4 w-4" />
          <span>Delete</span>
        </DropdownMenuItem>

       
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
