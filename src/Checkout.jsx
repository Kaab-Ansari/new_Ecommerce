import React, { useContext } from "react";
import { ProductContext } from "./Context";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Checkout.css";

export default function Checkout() {
  const { cart } = useContext(ProductContext);
  const [firstname, setFirstName] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState(false);

  let total = cart.map((c) => c.quantity * c.price);

  const navigate = useNavigate();

  const handleNavigate = (e) => {
    e.preventDefault();
    if (firstname === "" || lastname === "" || phone === "" || email === "") {
      setError(true);
    } else {
      setError(false);
      navigate("/confirmed");
    }
  };

  return (
    <div className="tables">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="basic-info">
          <div className="billing-details">
          <h2 className="billing-head">Billing details</h2>
            <div className="name">
              <TextField
                onChange={(e) => {
                  setFirstName(e.target.value), setError(false);
                }}
                error={error}
                helperText={error && "first name required"}
                required
                id="outlined-required"
                label="Firstname"
              />

              <TextField
                onChange={(e) => {
                  setLastName(e.target.value), setError(false);
                }}
                error={error}
                helperText={error && "last name required"}
                required
                id="outlined-required"
                label="Lastname"
                // defaultValue="Hello World"
              />
            </div>
            <div className="personal-info">
              <TextField
                onChange={(e) => {
                  setPhone(e.target.value), setError(false);
                }}
                error={error}
                helperText={error && "phone required"}
                required
                id="outlined-password-input"
                label="Phone"
                // type="password"
                autoComplete="current-password"
              />
              <TextField
                onChange={(e) => {
                  setEmail(e.target.value), setError(false);
                }}
                error={error}
                helperText={error && "email is required"}
                required
                id="outlined-read-only-input"
                label="Email"
                // defaultValue="Hello World"
                // InputProps={{
                //   readOnly: true,
                // }}
              />
            </div>
            <div className="place">
              <TextField id="outlined-number" label="Address" />
              <TextField id="outlined-number" label="City" />
            </div>
            <div className="pin-code">
              <TextField id="outlined-search" label="State" type="search" />
              <TextField
                id="outlined-helperText"
                label="Pin code"
                // defaultValue="Default Value"
                // helperText="Some important text"
              />
            </div>
            <button className="place-order-btn" onClick={handleNavigate}>
            Place order
          </button>
          </div>
          
        </div>
      </Box>

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
              <td>${c.price}</td>
            </tr>
          );
        })}
        <tr>
          <th>Grand Total</th>
          <th></th>
          <th>${total.length > 0 && total.reduce((a, b) => a + b)}</th>
        </tr>
      </table>
    </div>
  );
}
