import * as React from "react";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import UserPage from "./UserPage";
import { ProductContext } from "./Context";
import { User } from "@auth0/auth0-react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [user, loading, error] = useAuthState(auth);
  console.log("user 1", user);
  console.log("user 1", loading);
  const [email, setEmail] = React.useState("");
  // console.log(email)
  const [password, setPassword] = React.useState("");
  const [errors, seterrors] = React.useState(false);
  const { cart } = React.useContext(ProductContext);
  // const regex = "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$";

  function emailValidation(email) {
    const RE =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return RE.test(String(email).toLowerCase());
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };
  const navigate = useNavigate();

  // fetch("https://fakestoreapi.com/auth/login", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     username: "johnd",
  //     password: "m38rmF$",
  //   }),
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  React.useEffect(() => {
    console.log("user 2", user);
    console.log("user 2", loading);
    fetch(
      `https://ecommerce-products-663af-default-rtdb.firebaseio.com/Users/${user?.uid}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          email: user?.email,
          useId: user?.uid,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, [user]);

  async function handleNavigate() {
    await logInWithEmailAndPassword(email, password);
  }

  React.useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              type="email"
              onChange={(e) => {
                setEmail(e.target.value), seterrors(false);
              }}
              errors={errors}
              helperText={errors && "Please enter a valid email"}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={(e) => {
                setPassword(e.target.value), seterrors(false);
              }}
              errors={errors}
              helperText={errors && "Enter your password"}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={handleNavigate}
              onClick={handleNavigate}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/reset" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/profile" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

// firebase.child("https://ecommerce-products-663af-default-rtdb.firebaseio.com/Users.json").child("Users").child("user_1 email").setValue(email)
