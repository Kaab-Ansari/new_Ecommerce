import { tooltipClasses } from "@mui/material";
import React from "react";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ProductContext = React.createContext();

function ProductContextProvider(props) {
  const [user, loading, error] = useAuthState(auth);

  const [product, setProduct] = React.useState([]);
  const [cart, setCart] = React.useState([]);
  const [filteritem, setFilterItem] = React.useState([]);

  React.useEffect(() => {
    console.log("rub user fetxh")
    fetch(
      `https://ecommerce-products-663af-default-rtdb.firebaseio.com/Users/${user?.uid}.json`
    )
      .then((res) => res.json())
      .then((data) => console.log("data", data));
  }, []);

  // console.log(product)
  React.useEffect(() => {
    fetch(
      "https://ecommerce-products-663af-default-rtdb.firebaseio.com/products.json"
    )
      .then((res) => res.json())
      .then((data) => setProduct(data.map((p) => ({ ...p, quantity: 1 }))));
  }, []);

  function handleCart(id) {
    const handleCartFunction = cart.some((c) => c.id === id);

    if (handleCartFunction) {
      const removeFromCart = cart.filter((p) => p.id !== id);
        // console.log(removeFromCart)
      setCart(removeFromCart);
    } else {
      const products = product.find((product) => product.id === id);
      setCart((prev) => [...prev, products]);
    }
  }

  function handleChange(e) {
    const searchValue = e.target.value;
    const searchInput = product.filter((p) =>
      p.title.toUpperCase().includes(searchValue.toUpperCase())
    );
    setFilterItem(searchInput);
  }

  function addQuantity(id) {
    setCart((preValue) =>
      preValue.map((p) =>
        p.id === id
          ? { ...p, quantity: p.quantity + (p.quantity < 10 ? 1 : 0) }
          : p
      )
    );
  }

  function subQuantity(id) {
    setCart((preValue) =>
      preValue.map((p) =>
        p.id === id
          ? { ...p, quantity: p.quantity - (p.quantity > 1 ? 1 : 0) }
          : p
      )
    );
  }

  return (
    <ProductContext.Provider
      value={{
        product,
        handleCart,
        cart,
        handleChange,
        filteritem,
        addQuantity,
        subQuantity,
        setCart,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
}

export { ProductContext, ProductContextProvider };
