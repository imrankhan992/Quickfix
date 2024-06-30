import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axiosInstance from "@/ulities/axios";

const stripePromise = loadStripe(
  "pk_test_51PX0FHLhXKwMvDT9iOoGQODgRZkfU5ySSsQ9NXRMSa69A9qKngXqnDP3JfOZeKJ9SqWr817JIEPMQLCKb3S1EZtn00Zz5GSHuj"
);

const Stripe = () => {
  const { user } = useSelector((state) => state.user);
  const [balance, setBalance] = useState(0);

  const fetchWalletBalance = async () => {
    const { data } = await axiosInstance.get(`/api/v1/wallet/${user?._id}`);
    setBalance(data.balance);
  };

  useEffect(() => {
    if (user?._id) {
      fetchWalletBalance();
    }
  }, [user?._id]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">QuickFix</h1>
      {user?._id && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Wallet Balance: RS {balance}
          </h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm userId={user._id} />
          </Elements>
        </div>
      )}
    </div>
  );
};

const CheckoutForm = ({ userId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [isCardComplete, setIsCardComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    const cardElement = elements.getElement(CardElement);

    try {
      // Create a PaymentIntent with the amount entered by the user
      const { data: paymentIntentData } = await axiosInstance.post(
        "/api/v1/recharge-wallet",
        {
          userId,
          amount,
        }
      );

      const result = await stripe.confirmCardPayment(
        paymentIntentData.clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (result.error) {
        
        setErrorMessage(result.error.message);
        console.error(result.error);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          await axiosInstance.post("/api/v1/update-wallet", {
            userId,
            amount: result.paymentIntent.amount / 100,
          });
          alert("Wallet recharged successfully!");
          setErrorMessage(""); // Clear the error message on success
        }
      }
    } catch (error) {
      console.error("Error during payment processing:", error);
      setErrorMessage("Error during payment processing. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4"><h3 className="text-sm text-mutedcolor text-end"><strong>Note:</strong> Recharge at least RS150</h3>
      <div className="p-3 border border-gray-300 rounded-md bg-primarycolor">
        
        <CardElement
          onChange={(e) => {
            setIsCardComplete(e.complete);
            setErrorMessage(e.error ? e.error.message : "");
          }}
          options={{
            style: {
              base: {
             
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      
      <input
      
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to Recharge - Minimum RS150"
        className="w-full p-2 border border-gray-300 rounded-md bg-primarycolor"
        required
      />
      <button
        type="submit"
        disabled={!stripe || isProcessing || !isCardComplete}
        className={`w-full p-3 bg-buttoncolor text-hoverblack font-bold arimo rounded-md ${
          isProcessing || !isCardComplete ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isProcessing ? "Processing..." : "Pay"}
      </button>
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}
    </form>
  );
};

export default Stripe;
