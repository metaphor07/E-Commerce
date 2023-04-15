import styled from "styled-components";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Main from "./stripe/Payment";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckoutSuccess from "./components/CheckoutSuccess";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Main /> */}
    </BrowserRouter>
  );
}

export default App;
