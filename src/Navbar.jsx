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
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { ProductContext } from "./Context";
import { useNavigate } from "react-router-dom";
import "./Nav.css";
// import { useAuth0 } from "@auth0/auth0-react";

export default function Navbar() {
  const { product, handleCart, cart, handleChange } =
    useContext(ProductContext);
  const navigate = useNavigate();

  // const { user, isAuthenticated} = useAuth0();

function handleNavigate(e){
  // if(localStorage.getItem("token")){
  //   navigate("/user")
  // }
  if(localStorage.getItem("token") && localStorage.getItem("email") ){
    navigate("/user")
  }
   else if(localStorage.getItem("email")){
    navigate("/log-in")
  }
  else if(!localStorage.getItem("token") && !localStorage.getItem("email")){
    navigate("/profile")
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
