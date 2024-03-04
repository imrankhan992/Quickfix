import React from "react";
import { useSelector } from "react-redux";
import Pending from "./Pending";

const Main = ({ user }) => {
  return (
    <>
      <main className="w-full">
        {user?.accountStatus === "pending" && (
          <Pending user={user}/>
        )}
      </main>
    </>
  );
};

export default Main;
