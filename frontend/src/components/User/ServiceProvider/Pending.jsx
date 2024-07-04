import React from "react";
import { IoIosAlert } from "react-icons/io";

const Pending = ({ user }) => {
  if (!user) return null;

  const statusMapping = {
    pending: {
      message: "Your account is currently pending. Please complete the necessary steps to activate your account.",
      additionalInfo: "Check your email for verification steps.",
     
      bgColor: "#FFF6D1",
      borderColor: "#F58802",
      textColor: "#F58802"
    },
    reject: {
      message: "Your account has been rejected. Please contact support for more information.",
      additionalInfo: "There might be an issue with the information provided. Please review your account details and try again.",
      
      bgColor: "#FFE6E6",
      borderColor: "#D9534F",
      textColor: "#D9534F"
    },
    disabled: {
      message: "Your account is disabled. Please contact support for assistance.",
      additionalInfo: "Your account has been temporarily disabled due to suspicious activity. Please reach out to our support team for further assistance.",
      
      bgColor: "#E6E6E6",
      borderColor: "#777777",
      textColor: "#777777"
    },
    deactivate: {
      message: "Your account has been deactivated. Please contact support for reactivation.",
      additionalInfo: "If you wish to reactivate your account, please contact our support team. Provide any necessary details to expedite the reactivation process.",
      
      bgColor: "#D1ECF1",
      borderColor: "#0C5460",
      textColor: "#0C5460"
    }
  };

  const { message, additionalInfo, buttonText, bgColor, borderColor, textColor } = statusMapping[user.accountStatus] || {};

  if (!message) return null;

  return (
    <div className={`mx-6 shadow-md mb-2 flex flex-col gap-3 items-start p-4 rounded-lg border-l-4`} style={{ backgroundColor: bgColor, borderColor: borderColor }}>
      <div className="flex items-center gap-3">
        <IoIosAlert color={textColor} size={25} className="text" />
        <h1 className="arimo font-bold" style={{ color: textColor }}>Alert:</h1>
      </div>
      <div>
        <p className="max-w-xl text-sm" style={{ color: textColor }}>
          {message}
        </p>
        <p className="max-w-xl text-sm mt-2" style={{ color: textColor }}>
          {additionalInfo}
        </p>
        
      </div>
    </div>
  );
};

export default Pending;
