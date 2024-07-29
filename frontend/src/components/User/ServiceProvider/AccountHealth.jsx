import React from "react";
import {
  MdOutlineHealthAndSafety,
  MdOutlineSentimentSatisfied,
} from "react-icons/md";

const AccountHealth = ({ user }) => {
  const maxReports = 4;
  const remainingHealth = Math.max(0, maxReports - user?.reportCount);
  const healthPercentage = (remainingHealth / maxReports) * 100;
  let healthStatus = "";

  if (healthPercentage >= 75) {
    healthStatus = "Excellent";
  } else if (healthPercentage >= 50) {
    healthStatus = "Good";
  } else if (healthPercentage >= 25) {
    healthStatus = "Fair";
  } else {
    healthStatus = "Poor";
  }

  return (
    <div className="bg-primarycolor border min-h-40 rounded-3xl shadow-md p-4">
      <div className="flex flex-col justify-between w-full h-full">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="p-3 bg-[#DDDDF5] rounded-full">
            <MdOutlineHealthAndSafety className="text-[#1F1E30] text-4xl" />
          </div>
          <h2 className="text-xl text-[#1F1E30] font-semibold">
            Account Health
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div
              className={`h-4 rounded-full ${
                healthPercentage > 25 ? "bg-green-500" : "bg-red-500"
              }`}
              style={{ width: `${healthPercentage}%` }}
            ></div>
          </div>
          <p className="text-[#1F1E30] font-medium mt-2">
            Account Status: {healthStatus}
          </p>
          <p className="text-[#1F1E30] font-medium mt-2">
            Remaining Health: {remainingHealth}
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-row items-center bg-blue-500 text-white rounded-lg p-2">
            <p className="text-[#1F1E30] font-semibold">Reports:</p>
            <p className="text-[#1F1E30] font-medium">{user?.reportCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountHealth;
