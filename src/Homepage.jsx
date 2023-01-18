import React, { useContext } from "react";
import "./App.css";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import ProductDetail from "./ProductDetail";
import Navbar from "./Navbar";
import { ProductContext } from "./Context";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Homepage() {
  const { product, filteritem } = useContext(ProductContext);
   console.log(product)

  // const [cart, setCart] = React.useState([]);

  const firstExample = {
    size: 30,
    edit: false,
    isHalf: true,
  };
  const navigate = useNavigate();

  return (
    <div>
      {filteritem.length > 0 ? (
        <div className="products">
          {filteritem.map((f) => (
            <div className="items" key={f.id}>
              <img
                onClick={() => navigate(`detail/${f.id}`)}
                className="img"
                src={f.image}
              />
              <p className="title">{f.title}</p>
              <ReactStars {...firstExample} value={f.rating.rate} />
              <p className="rating">{f.rating.rate}</p>
              <p className="price">$:{f.price}</p>
            </div>
          ))}
        </div>
      ) : (
        product.length > 0 ?
        <div className="products">
          {product.map((p) => (
            <div
              onClick={() => navigate(`detail/${p.id}`)}
              className="items"
              key={p.id}
            >
              <img className="img" src={p.image} />
              <p className="title">{p.title}</p>
              <ReactStars {...firstExample} value={p.rating.rate} />
              <p className="rating">{p.rating.rate}</p>
              <p className="price">$:{p.price}</p>
            </div>
          ))}
        </div>
      :
       <div className="loader">
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </div> )}
      ;
    </div>
  );
}
