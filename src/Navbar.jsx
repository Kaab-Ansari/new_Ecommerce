// import React, {useContext} from "react";
// import "./Nav.css"
// import { useNavigate } from "react-router-dom";
// import { ProductContext } from "./Context";

// export default function Navbar(){
//     const { product, handleCart, cart } = useContext(ProductContext);

//     const navigate = useNavigate();

//     return(
//     <div>

//     <div className="head">
//           <p>Home</p>
//   <h1 onClick={()=> navigate("order-summary")}
//     className="fa fa-cart-plus"
//   >
//     <sub>{cart.length}</sub>
//   </h1>
//         </div>
//     </div>
//     )
// }

import React, { useContext } from "react";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { ProductContext } from "./Context";
import { useNavigate } from "react-router-dom";
import "./Nav.css";
import { User } from "@auth0/auth0-react";
// import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const [user, loading, error] = useAuthState(auth);
  const { product, handleCart, cart, handleChange } =
    useContext(ProductContext);
  const navigate = useNavigate();

  
  function handleNavigate() {
    if (user) {
      navigate("/user");
    } else if (!user) {
      navigate("/log-in");
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit">
              <h1
                className="fa fa-google-wallet head"
                onClick={() => navigate("/")}
                style={{ fontSize: 25 }}
              >
                Walmart
              </h1>
            </Button>
          </Typography>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            onChange={handleChange}
            // style={{border: "solid 2px black"}}
          />

          {/* {
          isAuthenticated && <h2>{user.name}</h2>
         } */}

          <Button color="inherit">
            <h1
              onClick={() => navigate("order-summary")}
              className="fa fa-cart-plus icon-cart"
              style={{ fontSize: 25 }}
            >
              <sub>{cart.length}</sub>
            </h1>
          </Button>
          <Button color="inherit">
            <h1
              className="fa fa-user"
              style={{ fontSize: 25 }}
              onClick={handleNavigate}
            ></h1>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
