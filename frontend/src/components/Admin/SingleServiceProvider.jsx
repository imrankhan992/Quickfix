import logo from "../../assets/quickfix logo.png";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";
import Header from "./Header";

import { useEffect, useState } from "react";
import axiosInstance from "@/ulities/axios";
import { useParams } from "react-router-dom";
import { promisToast, showtoast } from "@/Toast/Toast";
import { AccountStatus } from "./AccountStatus";

export function SingleServiceProvider() {
  const [user, setuser] = useState(null);
  const [accountStatus, setaccountStatus] = useState("");
  const [success, setsuccess] = useState(false);
  const [loading, setloading] = useState(false)
  const { id } = useParams();
  const getsingeluserData = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/api/v1/admin/get-single-applicant/${id}`
      );
      if (data?.success) {
        setuser(data?.user);
        setsuccess(true);
      }
    } catch (error) {
      showtoast(error.response.data.message);
    }
  };
//   update account status

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
      }
      if (!data?.success) {
        setloading(false);
      }
    } catch (error) {
      setloading(false);
      showtoast(error.response.data.message);
    }
  };
  useEffect(() => {
    getsingeluserData();
    if (success) {
      setaccountStatus(user?.accountStatus);
    }
    if (accountStatus!==user?.accountStatus && accountStatus!=="") {
        updateAccountStatus()
    }
  }, [success,accountStatus]);
  
  return (
    <>
      <BurgerMenu />
      <div className="flex ">
        <Aside open={3} />

        <main className="lg:w-[100%] w-full  min-h-screen">
          <Header />
          <div className="w-full  min-h-screen p-4 flex flex-col gap-4">
            {/* heading */}

            <div className="grid grid-cols-2 items-center">
              <h3 className="text-hoverblack text-2xl">Profile Details</h3>
              <div className="text-hoverblack">
                <AccountStatus setaccountStatus={setaccountStatus} />
              </div>
            </div>
            {/* two divs */}
            <div className="grid gap-4 md:grid-cols-3 w-full  ">
              {/* left side */}
              <div className="md:col-span-1 border border-bordercolor rounded-lg flex items-center justify-center bg-thirdcolor shadow-xl">
                <div className="flex flex-col gap-3 items-center justify-center">
                  <img
                    src={user?.avatar?.url}
                    alt={user?.firstname}
                    className="border-2 min-h-14 max-h-[200px] max-w-[200px] rounded-full"
                  />
                  <h3 className="text-hoverblack font-medium">
                    {user?.firstname + " " + user?.lastname}
                  </h3>
                </div>
              </div>
              {/* right side */}
              <div className="flex flex-col gap-3  md:col-span-2 ">
                <div className="grid grid-cols-2 bg-thirdcolor border border-bordercolor text-hoverblack py-3 px-6 rounded-xl justify-start overflow-auto">
                  {" "}
                  <p className="border-e-2 border-bordercolor me-3 ">
                    Full Name
                  </p>
                  <p className="text-mutedcolor text-center">
                    {user?.firstname + " " + user?.lastname}
                  </p>
                </div>
                <div className="grid grid-cols-2  border border-bordercolor text-hoverblack py-3 px-6 rounded-xl justify-start overflow-auto">
                  {" "}
                  <p className="border-e-2 border-bordercolor me-3 ">Email</p>
                  <p className="text-mutedcolor text-center">{user?.email}</p>
                </div>
                <div className="grid grid-cols-2 bg-thirdcolor border border-bordercolor text-hoverblack py-3 px-6 rounded-xl justify-start overflow-auto">
                  {" "}
                  <p className="border-e-2 border-bordercolor me-3 ">
                    Email Verificaiton
                  </p>
                  <p className=" text-center text-greencolor">
                    {user?.emailVerify ? "True" : "False"}
                  </p>
                </div>
                <div className="grid grid-cols-2  border border-bordercolor text-hoverblack py-3 px-6 rounded-xl justify-start overflow-auto">
                  {" "}
                  <p className="border-e-2 border-bordercolor me-3 ">City</p>
                  <p className="text-mutedcolor text-center">{user?.city}</p>
                </div>
                <div className="grid grid-cols-2 bg-thirdcolor border border-bordercolor text-hoverblack py-3 px-6 rounded-xl justify-start overflow-auto">
                  {" "}
                  <p className="border-e-2 border-bordercolor me-3 ">
                    Date of birth
                  </p>
                  <p className=" text-center text-greencolor">
                    {user?.dateOfBirth}
                  </p>
                </div>
                <div className="grid grid-cols-2  border border-bordercolor text-hoverblack py-3 px-6 rounded-xl justify-start overflow-auto">
                  {" "}
                  <p className="border-e-2 border-bordercolor me-3 ">Job</p>
                  <p className="text-mutedcolor text-center">{user?.job}</p>
                </div>
                <div className="grid grid-cols-2 bg-thirdcolor border border-bordercolor text-hoverblack py-3 px-6 rounded-xl justify-start overflow-auto">
                  {" "}
                  <p className="border-e-2 border-bordercolor me-3 ">zipcode</p>
                  <p className=" text-center text-greencolor">
                    {user?.zipcode}
                  </p>
                </div>
                <div className="grid grid-cols-2  border border-bordercolor text-hoverblack py-3 px-6 rounded-xl justify-start overflow-auto">
                  {" "}
                  <p className="border-e-2 border-bordercolor me-3 ">
                    Account Status
                  </p>
                  <p className=" text-center text-yellow-500">
                    {user?.accountStatus}
                  </p>
                </div>
                <div className="grid grid-cols-2 bg-thirdcolor border border-bordercolor text-hoverblack py-3 px-6 rounded-xl justify-start overflow-auto">
                  {" "}
                  <p className="border-e-2 border-bordercolor me-3 ">Address</p>
                  <p className=" text-center text-greencolor">
                    {user?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
