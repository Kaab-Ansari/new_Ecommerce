import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import { ProductContext } from "./Context";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { border, color } from "@mui/system";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Cart() {
  const [user, loading, error] = useAuthState(auth);
  const { cart, handleCart, subQuantity, addQuantity } =
    useContext(ProductContext);

  let total = cart.map((c) => c.quantity * c.price);

  const navigate = useNavigate()

  function handleNavigate (e){

    if(user){
      navigate("/checkout")
    } else{
      alert("Please Login first")
      navigate("/log-in")
    }
  }

  return (
    <div>
      {cart.length > 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <div className="cart-main">
            {cart.map((p) => (
              <div className="item" key={p.id}>
                <img className="imga" src={p.image} />
                <p className="title">{p.title}</p>
                <p className="price">$-{p.price}</p>
                <div className="all-btns">
                  <button onClick={() => handleCart(p.id)} className="button">
                    Remove from cart
                  </button>
                  <div className="quantity-btns">
                  <Stack direction="row" >
                    <Button style={{ backgroundColor: "rgb(0, 102, 255 )", color: "white"}}  onClick={() => addQuantity(p.id, "+ 1")}>+</Button>
                    <Button style={{ width: "50px", color: "black"}}>{p.quantity}</Button>
                    <Button style={{backgroundColor: "rgb(0, 102, 255 )", color: "white"}} onClick={() => subQuantity(p.id, "- 1")}>-</Button>
                  </Stack>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div>
            <table style={{ height: "300px" }}>
              <tr>
                <th style={{ width: "300px" }}>Item type</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>

              {cart.map((c) => {
                return (
                  <tr>
                    <td>{c.title}</td>
                    <td>{c.quantity}</td>
                    <td>${c.price }</td>
                  </tr>
                );
              })}
              <tr>
                <th>Grand Total</th>
                <th></th>
                <th>${total.length > 0 && total.reduce((a, b) => a + b)}</th>
              </tr> 
            </table>
            <button className="checkout-btn" onClick={handleNavigate}>Proceed to checkout</button>         
          </div>  
        </div> 
      ) : (
        <h2>Your Cart is empty</h2>
      )}
    </div>
  );
}




// let name = ['kaab', 'saad', 'fahad', 'kaif']
// let name2 = name.map((n)=>{
//   return(
//     n[0].toUpperCase() + n.slice(1)
//   )
// })
// console.log(name2)





