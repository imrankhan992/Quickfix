import React from "react";
import { BurgerMenu } from "./BurgerMenu";
import Aside from "./Aside";

import { useSelector } from "react-redux";
import Header from "./Header";
import Stripe from "@/components/StripePayment/Stripe";
import TransactionHistory from "./Transaction";


const RechargeAccount = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className=" w-full h-[100vh] mx-auto max-w-[1750px] ">
      <div className="flex relative">
        <BurgerMenu />
        <Aside open={7} />
        <main className="bg-cardbg w-full">
          <Header user={user} />

          <div className="px-8 py-6">
           
            <Stripe/>
          </div>
          {/* transaction history */}
          <div>
            
            <TransactionHistory/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RechargeAccount;
