import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { IconButton, Tooltip } from "@material-tailwind/react";
import { MdEdit } from "react-icons/md";
import { AccountStatus } from "./AccountStatus";
import axiosInstance from "@/ulities/axios";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { showtoast } from "@/Toast/Toast";
import { useDispatch, useSelector } from "react-redux";
import { spDataAction } from "../Actions/SpAction";

export function AlertDialog({ id, accountStatuss }) {
  const dispatch = useDispatch();
  const [accountStatus, setaccountStatus] = useState(accountStatuss);
  const [loading, setloading] = useState(false);
  const { SPuser, SPloading, SPsuccess, SPerror } = useSelector(
    (state) => state.spData
  );

  const updateAccountStatus = async () => {
    try {
      setloading(true);
      const { data } = await axiosInstance.post(
        `/api/v1/admin/get-single-applicant/${id}`,
        { accountStatus },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data?.success) {
        setloading(false);
        showtoast(`account status updated successfully`);
        dispatch(spDataAction());
      }
      if (!data?.success) {
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      alert(error.respone.data.message);
    }
  };
 
  useEffect(() => {
    dispatch(spDataAction);
  }, []);

  return (
    <Dialog className="bg-red-500">
      <DialogTrigger asChild>
        <Button>
          <Tooltip content="Edit User">
            <IconButton variant="text" >
              <MdEdit className="h-4 w-4 text-hoverblack" />
            </IconButton>
          </Tooltip>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-cardbg">
        <DialogHeader className={"text-hoverblack"}>
          <DialogTitle className="text-hoverblack">
            Update Account Status
          </DialogTitle>
          <DialogDescription className="text-hoverblack">
            Update the account status of the Service Provider
          </DialogDescription>
        </DialogHeader>
        <div className=" w-full text-hoverblack">
          <AccountStatus setaccountStatus={setaccountStatus} />
        </div>
        <DialogFooter>
          {!loading && (
            <Button
              type="submit"
              className="bg-buttoncolor   text-primarycolor hover:text-hoverblack hover:bg-buttoncolor"
              onClick={() => {
                updateAccountStatus();
              }}
            >
              Save changes
            </Button>
          )}

          {/* when loading */}
          {loading && (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
