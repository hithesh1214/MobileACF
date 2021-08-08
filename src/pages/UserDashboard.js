import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button, Paper, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import Axios from "axios";

function UserDashboard() {
  useEffect(() => {
    Axios.post("http://localhost:3001/getUserdet", {
      user_id: sessionStorage.getItem("user_id"),
    }).then((response) => {
      console.log(response.data);
      sessionStorage.setItem("data", JSON.stringify(response.data));
      setContactNo(response.data[0].Contactno);
      setShopaddress(response.data[0].Shopaddress);
      setShopname(response.data[0].Shopname);
    });
  }, []);

  const [Shopaddress, setShopaddress] = useState("");
  const [Shopname, setShopname] = useState("");
  const [ContactNo, setContactNo] = useState("");

  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(3, 0, 0),
    },
    Link: {
      textDecoration: "none",
      color: "inherit",
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography>{Shopname}</Typography>
            <Typography>{Shopaddress}</Typography>
            <Typography>{ContactNo}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6">add customer</Typography>
            <Button variant="contained" color="primary">
              <Link to="/User/NewBill" className={classes.Link}>
                new Bill
              </Link>
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6">Tap to check older bills</Typography>
            <Button variant="contained" color="primary">
              <Link to="/User/History" className={classes.Link}>
                {" "}
                History
              </Link>
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserDashboard;
