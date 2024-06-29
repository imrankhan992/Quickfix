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
    <div>
      <h1>QuickFix</h1>
      {user?._id && (
        <div>
          <h2>Wallet Balance: ${balance}</h2>
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
  const [amount, setAmount] = useState(0);
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
        console.error(result.error.message);
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
    <form onSubmit={handleSubmit}>
      <CardElement
        onChange={(e) => {
          setIsCardComplete(e.complete);
          setErrorMessage(e.error ? e.error.message : "");
        }}
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount to Recharge"
        required
      />
      <button
        type="submit"
        disabled={!stripe || isProcessing || !isCardComplete}
      >
        {isProcessing ? "Processing..." : "Pay"}
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </form>
  );
};

export default Stripe;
