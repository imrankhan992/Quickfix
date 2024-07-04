import React from "react";
import { useSelector } from "react-redux";
import Pending from "./Pending";
import Approve from "./Approve";

const Main = ({ user, products }) => {
  return (
    <>
      <main className="w-full">
        {user?.accountStatus === "approve" && <Approve products={products} />}
        {(user?.accountStatus === "pending" ||
          user?.accountStatus === "reject" ||
          user?.accountStatus === "disabled" ||
          user?.accountStatus === "deactivate") && <Pending user={user} />}
      </main>
    </>
  );
};

export default Main;
