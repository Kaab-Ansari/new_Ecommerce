import React, { useContext } from "react";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import "./Product.css";
import Navbar from "./Navbar";
import ReactStars from "react-rating-stars-component";
import { ProductContext } from "./Context";
import { useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const [user, loading, error] = useAuthState(auth);
  const { id } = useParams();
  const { product, handleCart, cart } = useContext(ProductContext);
  const navigate = useNavigate()

  const p = product.find((p) => p.id == id);
  const firstExample = {
    size: 30,
    edit: false,
    isHalf: true,
  };

  const handleCartApi = (id) => {
    handleCart(id);
    // user &&
    //   fetch(
    //     `https://ecommerce-products-663af-default-rtdb.firebaseio.com/Users/${user?.uid}.json`,
    //     {
    //       method: "PATCH",
    //       body: JSON.stringify({ cart }),
    //     }
    //   )
    //     .then((res) => res.json())
    //     .then((data) => console.log(data));
  };

  return (
    <div>
      <div className="pro">
        <div className="it" key={p.id}>
        <div className="about-product">
          <img className="imge" src={p.image} />
            <h2 className="titles">{p.title}</h2>
            <p className="ratings">⭐ {p.rating.rate}</p>
            <h2 className="prices">${p.price}</h2>
            <p className="description">{p.description}</p>
            <button className="bttn" onClick={() => handleCartApi(p.id)}>
              {cart.some((c) => c.id === p.id)
                ? "Remove from cart"
                : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
