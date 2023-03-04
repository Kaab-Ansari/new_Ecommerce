import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "./Context";
import { logout } from "./firebase";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function UserPage() {
  const [user, loading, error] = useAuthState(auth);

  const { cart, setCart } = useContext(ProductContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
   setCart([])
    navigate("/");
  }

  return (
    <div>
      <h1>Welcome </h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
