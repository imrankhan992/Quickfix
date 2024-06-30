import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa6";
import { TextInput } from "@tremor/react";
import { Loader2 } from "lucide-react";

export function CreateCategory({
  createService,
  setservices,
  service,
  loading,
  success,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Button
        onClick={handleOpen}
        className="bg-buttoncolor border border-buttonborder flex gap-2 items-center justify-center capitalize text-sm arimo text-hoverblack"
      >
        <FaPlus />
        Add new service
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
            <Typography variant="h4" className="text-hoverblack">
              Add new Service
            </Typography>
            {/* <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Enter your email and password to Sign In.
            </Typography> */}
            <Typography className="-mb-2" variant="h6">
              Create here
            </Typography>
            <TextInput
              value={service}
              onChange={(e) => {
                setservices(e.target.value);
              }}
              className="rounded-md bg-primarycolor border-bordercolor"
              placeholder="Type here..."
            />
          </CardBody>
          <CardFooter className="pt-0">
            {!loading && (
              <Button
                className="bg-buttoncolor border border-buttonborder capitalize text-sm text-hoverblack font-bold arimo"
                onClick={() => {
                  handleOpen();
                  createService();
                }}
                fullWidth
              >
                Create
              </Button>
            )}
            {loading && (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            )}
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
