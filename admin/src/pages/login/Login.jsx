import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "./login.css";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };
  return (
    <div className="login">
      <h2>Only For Admin's</h2>
      <form className="loginForm">
        <input
          type="text"
          placeholder="email"
          className="loginInput"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          className="loginInput"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginButton" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
