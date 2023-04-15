import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { publicRequest } from "../requestMethods";
import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

const PayButton = ({ cart }) => {
  // const user = {
  //   _id:"",
  //   username:"",
  //   email:"",

  // }
  const handleCheckOut = async (e) => {
    // e.preventDefault();
    try {
      const res = await publicRequest.post("stripe/create-checkout-session", {
        cartitems: cart.products,
        userId: "6428fc9e3340818598ce294e",
      });
      console.log("stripe: ", res.data);
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={() => handleCheckOut()}>Check Out</Button>;
};

export default PayButton;
