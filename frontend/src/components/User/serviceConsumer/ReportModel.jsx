import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axiosInstance from "@/ulities/axios";
import { toast } from "react-toastify";
 
export function ReportModel() {
    const {id} = useParams()
const {user} = useSelector((state) => state.user);
  const [size, setSize] = React.useState(null);
 
  const handleOpen = (value) => setSize(value);
  const [reason, setReason] = useState('');
  const [userId, setUser] = useState();
  const [serviceProvider, setServiceProvider] = useState();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if(user){
        setUser(user._id)
    }
    if(id){
        setServiceProvider(id)
    }
  }, [user,id])
  
  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };

  const handleSubmit =async (event) => {
    event.preventDefault();
    try {
        setLoading(true)
        const {data } = await axiosInstance.post(`/api/v1/report/${id}`,{
            userId,
           
            reason
        })
        if(data.success){
          toast.success(data.message)
            setReason('')
            handleOpen(null)
        }   

    } catch (error) {
      console.log(error);
        
    }finally{
        setLoading(false)
    }
  };
  return (
    <>
      <div className="mb-3 flex gap-3">
       
        <button onClick={() => handleOpen("sm")} className="mt-6  py-2 bg-red-500 max-w-xs px-12 text-white rounded-full hover:bg-red-600">
          Report
        </button>
      </div>
      
      <Dialog
        open={
          size === "xs" ||
          size === "sm" ||
          size === "md" ||
          size === "lg" ||
          size === "xl" ||
          size === "xxl"
        }
        size={size || "md"}
        handler={handleOpen}
      >
       
        <DialogBody>
        <div className="container mx-auto p-5">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800">Report Service Provider</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="reason" className="block text-gray-700 font-semibold mb-2">Reason for Report:</label>
            <textarea
              id="reason"
             placeholder="write your report here..."
              className="w-full text-black bg-gray-300 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 "
              rows="5"
              value={reason}
              onChange={handleReasonChange}
              required
            />
          </div>
        {
            !loading &&   <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">Submit Report</button>
        }
        {
            loading &&   <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">Submitting...</button>
        }
        </form>
      </div>
    </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          
        </DialogFooter>
      </Dialog>
    </>
  );
}