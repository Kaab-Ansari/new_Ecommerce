import React from "react";
import Homepage from "./Homepage";
import Cart from "./Cart";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import Navbar from "./Navbar";
import Checkout from "./Checkout";
import Placeorder from "./Placeorder";
import Profile from "./Profile";
import Login from "./Login";
import UserPage from "./UserPage";
import { useLocation } from "react-router-dom";
import Reset from "./Reset";

export default function App() {
  let location = useLocation();

  // console.log(location);
  return (
    <div>
      
      {location.pathname !== "/log-in" && location.pathname !== "/profile" && (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/log-in" element={<Login />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/confirmed" element={<Placeorder />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="order-summary" element={<Cart />} />
        <Route path="detail/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
}
