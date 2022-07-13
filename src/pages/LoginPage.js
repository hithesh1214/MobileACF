import React, { useState, useEffect } from "react";
import logo from "../images/apollotryes.png";
import tyres from "../images/banr.png";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Button,
  TextField,
  makeStyles,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Link,
  Grid,
} from "@material-ui/core";
import Axios from "axios";
import { Redirect } from "react-router-dom";

function LoginPage() {
  const useStyles = makeStyles((theme) => ({
    logo: {
      width: "100%",
      margin: theme.spacing(1, "auto"),
    },
    input: {
      margin: theme.spacing(1),
      width: "100%",
    },
    margin: {
      margin: theme.spacing(2, "auto"),
    },
    fillwindow: {
      height: "100%",
      position: "absolute",
      width: "100%",
      padding: theme.spacing(3),
    },
    center: {
      margin: theme.spacing("auto", 0),
      // width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
  }));
  const classes = useStyles();

  const [Open, setOpen] = useState(false);
  const [msg, setmsg] = useState("");

  const [usernameInp, setUsernameInp] = useState("");
  const [passwordInp, setPasswordInp] = useState("");
  const [to, setTo] = useState("");

  const [LoginStatus, setLoginStatus] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validateEmail = (event) => {
    const email = event.target.value;
    if (emailRegex.test(email)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  Axios.defaults.withCredentials = true;

  const Signin = () => {
    Axios.post("http://localhost:3001/login", {
      usernamelogin: usernameInp,
      passwordlogin: passwordInp,
    }).then((response) => {
      setmsg(response.data.message);
      setOpen(true);
      // console.log(response.data);
      setLoginStatus(true);
      if (!response.data.auth) {
        setLoginStatus(false);
      } else {
        setLoginStatus(true);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user_id", response.data.result[0].Userid);
        sessionStorage.setItem("type", response.data.result[0].type);
        const typeofaccess = response.data.result[0].type;
        if (typeofaccess === "admin") {
          setTo("/Admin");
        } else {
          setTo("/User");
        }
      }
    });
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      setLoginStatus(response.data.loggedIn);
      console.log(LoginStatus);
    });
  });
  return (
    <div
      className={classes.fillwindow}
      style={{ backgroundImage: "url(/bg.jpg)", height: "100%" }}
    >
      <CssBaseline />
      <Grid
        container
        spacing={3}
        className={classes.center}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          lg={6}
          direction="column"
          alignItems="center"
          justifyContent="flex-end"
          container
        >
          <Grid item lg={6}>
            <img src={logo} className={classes.logo} alt=""></img>
          </Grid>
          <Grid item lg={10}>
            <img src={tyres} className={classes.logo} alt=""></img>
          </Grid>
        </Grid>
        <Grid
          item
          lg={6}
          spacing={1}
          direction="column"
          justifyContent="center"
          alignItems="center"
          container
        >
          <Grid item lg={6}>
            <TextField
              helperText={`${isValid ? "" : "enter a valid email"}`}
              variant="outlined"
              margin="normal"
              fullWidth
              label="Username"
              className={classes.input}
              onChange={(e) => {
                validateEmail(e);
                setUsernameInp(e.target.value);
              }}
            />
          </Grid>
          <Grid item lg={6}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              className={classes.input}
              onChange={(e) => {
                setPasswordInp(e.target.value);
              }}
            />
          </Grid>
          <Grid item lg={6}>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
          </Grid>
          <Grid item lg={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={Signin}
            >
              Sign In
            </Button>
            <Snackbar open={Open} autoHideDuration={5000} onClose={handleClose}>
              <MuiAlert severity="error">{msg}</MuiAlert>
            </Snackbar>
          </Grid>
          {to ? <Redirect to={to}></Redirect> : null}
          <Link href="#" variant="body1" className={classes.margin}>
            Forgot password?
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginPage;
