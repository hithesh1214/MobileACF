import React, { useState, useEffect } from "react";
import logo from "../images/apollotryes.png";
import {
  Button,
  TextField,
  makeStyles,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
} from "@material-ui/core";
import Axios from "axios";
import { Redirect } from "react-router-dom";

function Main() {
  const useStyles = makeStyles((theme) => ({
    logo: {
      width: "100%",
      margin: theme.spacing(0, "auto"),
    },
    input: {
      margin: theme.spacing(1),
      width: "100%",
    },
    content: {
      margin: theme.spacing(3),
      padding: theme.spacing(3),
    },
  }));
  const classes = useStyles();

  const [usernameInp, setUsernameInp] = useState("");
  const [passwordInp, setPasswordInp] = useState("");
  const [to, setTo] = useState("");

  const [LoginStatus, setLoginStatus] = useState(false);

  Axios.defaults.withCredentials = true;

  const Signin = () => {
    Axios.post("http://localhost:3001/login", {
      usernamelogin: usernameInp,
      passwordlogin: passwordInp,
    }).then((response) => {
      setLoginStatus(true);
      if (!response.data.auth) {
        setLoginStatus(false);
        alert(response.data.message);
      } else {
        setLoginStatus(true);
        console.log(response.data);
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user_id", response.data.result[0].Userid);
        const typeofaccess = response.data.result[0].type;
        if (typeofaccess === "admin") {
          setTo("/Admin");
        } else {
          setTo("/User");
        }
      }
    });
  };

  // const authenticater = () => {
  //   Axios.get("http://localhost:3001/Auth", {
  //     headers: {
  //       "x-access-token": localStorage.getItem("token"),
  //     },
  //   });
  // };

  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      setLoginStatus(response.data.loggedIn);
      console.log(LoginStatus);
    });
  });

  return (
    <div className={classes.content}>
      <CssBaseline />
      <Grid
        container
        spacing={3}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={10} lg={4}>
          <img className={classes.logo} src={logo} alt=""></img>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Username"
            className={classes.input}
            onChange={(e) => {
              setUsernameInp(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
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
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={Signin}
          >
            Sign In
          </Button>
        </Grid>
        {to ? <Redirect to={to}></Redirect> : null}
        <Link href="#" variant="body1">
          Forgot password?
        </Link>
      </Grid>
    </div>
  );
}

export default Main;
