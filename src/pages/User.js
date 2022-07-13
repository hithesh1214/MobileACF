import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  Container,
} from "@material-ui/core";
import UserDashboard from "./UserDashboard";
import History from "./History";
import Neworder from "./Neworder";

function User() {
  const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(8),
    },
  }));
  const classes = useStyles();
  if (sessionStorage.getItem("type") === "user") {
    return (
      <div>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap>
              User
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" className={classes.container}>
          <Router>
            <Switch>
              <Route path="/User/NewBill" component={Neworder}></Route>
              <Route path="/User/History" component={History}></Route>
              <Route path="/User" component={UserDashboard}></Route>
            </Switch>
          </Router>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <Redirect to="/Admin"></Redirect>
      </div>
    );
  }
}

export default User;
