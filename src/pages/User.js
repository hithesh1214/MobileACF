import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
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
import NewBill from "./NewBill";

function User() {
  const useStyles = makeStyles((theme) => ({
    container: {
      paddingTop: theme.spacing(8),
    },
  }));
  const classes = useStyles();

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
            <Route path="/User/NewBill" component={NewBill}></Route>
            <Route path="/User/History" component={History}></Route>
            <Route component={UserDashboard}></Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default User;
