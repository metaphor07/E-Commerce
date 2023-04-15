import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const KEY =
  "pk_test_51M6BOJSBSrGuwEHfoLfMWYsxUIqOMnUjiIiqfWpLN5L5etmWoHWGpCM0Y4C98wRutsYu2ameoIyNJ239UziShLTI00Mu7wNiEa";

const Main = () => {
  const onToken = (token) => {
    console.log("token is: ", token);
  };
  return (
    <div>
      <StripeCheckout
        name="Meta Shop"
        image="data:image/png;base64,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"
        billingAddress
        shippingAddress
        description="Your total is $30"
        amount={3000}
        stripeKey="pk_test_51M6BOJSBSrGuwEHfoLfMWYsxUIqOMnUjiIiqfWpLN5L5etmWoHWGpCM0Y4C98wRutsYu2ameoIyNJ239UziShLTI00Mu7wNiEa"
        key={KEY}
        token={onToken}
      >
        <button
          style={{
            padding: "10px 30px",
            margin: "30% 50%",
            backgroundColor: "teal",
            cursor: "pointer",
          }}
        >
          Pay Now
        </button>
      </StripeCheckout>
    </div>
  );
};

export default Main;
