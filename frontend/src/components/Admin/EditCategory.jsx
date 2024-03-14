import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa6";
import { TextInput } from "@tremor/react";
import { Loader2 } from "lucide-react";
import { MdEdit } from "react-icons/md";

export function EditCategory({
  setcategory,
  categorys,
  updateCategory,
  _id,
  currentCategory,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Button
        onClick={handleOpen}
        className="bg-buttoncolor border border-buttonborder py-2 px-6 flex gap-2 items-center justify-center capitalize text-sm"
      >
        <MdEdit className="text-xl" />
        Edit
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <Card className="mx-auto w-full max-w-[24rem] bg-thirdcolor rounded-2xl">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" className="text-primarycolor">
              Update Service
            </Typography>
            {/* <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your email and password to Sign In.
            </Typography> */}
            <Typography className="-mb-2" variant="h6">
              Update here
            </Typography>
            <TextInput
              defaultValue={currentCategory}
              onChange={(e) => {
                setcategory(e.target.value);
              }}
              className="rounded-md bg-inputbg_color border-bordercolor text-primarycolor"
              placeholder="Type here..."
            />
          </CardBody>
          <CardFooter className="pt-0 flex gap-3">
            {/* {!loading && (
             
            )} */}
            <Button
              className="bg-thirdcolor border border-primarycolor capitalize text-sm"
              onClick={() => {
                handleOpen();
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-buttoncolor border border-buttonborder capitalize text-sm"
              onClick={() => {
                handleOpen();
                updateCategory(_id);
              }}
              fullWidth
            >
              Update now
            </Button>

            {/* {loading && (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            )} */}
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
