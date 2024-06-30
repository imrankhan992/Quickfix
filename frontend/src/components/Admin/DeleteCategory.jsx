import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MdOutlineDelete } from "react-icons/md";
import { FaExclamationTriangle } from "react-icons/fa";

export function DeleteCategory({deleteCategory,_id}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} className="p-[6px] bg-[#E9ECEF]">
        <MdOutlineDelete className=" text-hoverblack text-2xl " />
      </Button>
      <Dialog
        className="bg-thirdcolor"
        size="xs"
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="text-hoverblack flex gap-3">
          <FaExclamationTriangle className="text-red-900 text-3xl" />
          <div className="flex justify-start">
            <p className="text-[16px]">
              Are you sure you want to delete this category.
            </p>
          </div>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col px-6 py-2 bg-[#FFE9D9] text-[#BC4C2E] border-s-8 border-[#FA703F]">
            <div className="flex gap-3 font-bold">
              {" "}
              <FaExclamationTriangle className="text-red-900 text-xl" />{" "}
              <span className="text-[#872E1E]">Warning:</span>
            </div>
            If you delete this category, all products within this category will
            also be deleted.
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            onClick={handleOpen}
            className="mr-1 capitalize text-sm bg-none text-hoverblack"
            
          >
            <span>No,Cancel</span>
          </Button>
          <Button variant="text" onClick={()=>{handleOpen(); deleteCategory(_id)}}
            color="red" className="capitalize text-sm bg-red-200"  o>
            <span>Yes,Delete</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
