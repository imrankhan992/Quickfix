import React from "react";
import { IoIosAlert } from "react-icons/io";

const Alert = ({ order, user }) => {
  return (
    <div className=" mx-6 bg-[#FFF6D1] shadow-md mb-2 flex gap-3 items-start p-4 rounded-lg border-l-4 border-[#F58802]">
      <IoIosAlert color="#F58802" size={25} className="text" />
      <div>
        <h1 className="arimo font-bold text-hoverblack">Alert:</h1>
        {user?.role === "user" && (
          <p className="text-hoverblack max-w-xl text-sm">
            {" "}
            your Project is <strong>completed </strong> by the service provider
            Side but from your side is still {order?.clientSideOrderStatus}{" "}
            .{" "}
            <span className="text-">
              Project id ( <strong>{order?._id}</strong>)
            </span>
          </p>
        )}
        {/* service provider */}
        {user?.role === "serviceprovider" && (
          <p className="text-hoverblack max-w-xl text-sm">
            {" "}
            your Project is <strong>completed </strong> by the Client Side but
            from your side is still {order?.serviceProviderOrderStatus} .{" "}
            <span className="text-">
              Project id ( <strong>{order?._id}</strong>)
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Alert;
