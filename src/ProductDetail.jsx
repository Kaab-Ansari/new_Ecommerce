import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import "./Product.css"
import Navbar from "./Navbar";
import ReactStars from "react-rating-stars-component";
import { ProductContext } from "./Context";

export default function ProductDetail() {
  const { id } = useParams();
  const { product, handleCart, cart } = useContext(ProductContext);
 
  const p = product.find((p) => p.id == id);
  const firstExample = {
    size: 30,
    edit: false,
    isHalf: true,
  };

  return (
    <div>
     <div className="pro">
          <div className="it" key={p.id}>
            <img
              className="imge"
              src={p.image}
            />
              <div className="about-product">
                  <h2 className="titles">{p.title}</h2>
                  <p className="ratings">⭐ {p.rating.rate}</p>
                  <h2 className="prices">${p.price}</h2>
                <p className="description">{p.description}</p>
                <button className="bttn" onClick={() => handleCart(p.id) }>
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

