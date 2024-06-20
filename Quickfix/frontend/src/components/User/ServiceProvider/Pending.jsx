import React from 'react'

const Pending = ({user}) => {
  return (
    <div className="text-primarycolor   min-h-screen flex items-center justify-center p-4">
            <div className="  flex flex-col justify-center items-center  gap-3 border border-bordercolor p-4 bg-thirdcolor rounded-2xl">
                <img src={user?.avatar?.url} className="w-20 rounded-full" alt="" />
              <h1 className="text-2xl">
                Welcome {user?.firstname + " " + user?.lastname} !
              </h1>
              <p className="text-mutedcolor">
                your account has been{" "}
                <span className="text-greencolor font-bold underline">
                  {user?.accountStatus}
                </span>
              </p>
              <p className="text-center text-mutedcolor">Our team review your profile with in 48 business hours</p>
              <p className="text-center text-mutedcolor">Please wait...</p>
            </div>
          </div>
  )
}

export default Pending