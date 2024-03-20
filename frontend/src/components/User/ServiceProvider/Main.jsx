import React from "react";
import { useSelector } from "react-redux";
import Pending from "./Pending";
import Approve from "./Approve";

const Main = ({ user,products }) => {
  return (
    <>
      <main className="w-full">
        {user?.accountStatus === "pending" && (
          <Pending user={user}/>
        )}
        {
          user?.accountStatus==="approve" && (
            <Approve products={products}/>
          )
        }
      </main>
    </>
  );
};

export default Main;
