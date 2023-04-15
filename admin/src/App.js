import React from "react";
import "./app.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";

const App = () => {
  const user = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
    .currentUser?.isAdmin;
  console.log(user);
  return (
    <BrowserRouter>
      {!user ? (
        <Login />
      ) : (
        <>
          <Topbar />
          <div className="appContainer">
            <Sidebar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userid" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />

              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productid" element={<Product />} />
              <Route path="/newproduct" element={<NewProduct />} />
              {/* <Route path="/login" element={<Login />} /> */}
            </Routes>
          </div>
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
