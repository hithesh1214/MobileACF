import React, { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Grid,
  Paper,
  Typography,
  makeStyles,
  Snackbar,
  Fab,
  TextField,
} from "@material-ui/core";
import Axios from "axios";
import AddIcon from "@material-ui/icons/Add";

function Servicemaster() {
  const [Servicename, setServicename] = useState("");
  const [TyreCompanyname, setTyreCompanyname] = useState("");
  const [Vechilename, setVechilename] = useState("");

  //notifier fields
  const [Open, setOpen] = useState(false);
  const [msg, setmsg] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const addService = () => {
    Axios.post("http://localhost:3001/addService", {
      Servicename: Servicename,
    }).then((response) => {
      setmsg(response.data.message);
      setOpen(true);
    });
  };

  const addTyreCompany = () => {
    Axios.post("http://localhost:3001/addTyre", {
      TyreCompanyname: TyreCompanyname,
    }).then((response) => {
      setmsg(response.data.message);
      setOpen(true);
    });
  };

  const addVechile = () => {
    Axios.post("http://localhost:3001/addVechile", {
      Vechilename: Vechilename,
    }).then((response) => {
      setmsg(response.data.message);
      setOpen(true);
    });
  };

  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(3, 1, 0),
    },
    select: {
      margin: theme.spacing(1),
      width: theme.spacing(20),
    },
    margin: {
      margin: theme.spacing(2, 1),
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              Type of Service
            </Typography>
            <div>
              <TextField
                variant="filled"
                margin="normal"
                required
                label="Service Name"
                onChange={(e) => {
                  setServicename(e.target.value);
                }}
              />
              <Fab
                size="medium"
                color="primary"
                aria-label="add"
                onClick={addService}
                className={classes.margin}
              >
                <AddIcon />
              </Fab>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              Type of Company
            </Typography>
            <div>
              <TextField
                variant="filled"
                margin="normal"
                required
                label="Tyre Company Name"
                onChange={(e) => {
                  setTyreCompanyname(e.target.value);
                }}
              />
              <Fab
                size="medium"
                color="primary"
                aria-label="add"
                onClick={addTyreCompany}
                className={classes.margin}
              >
                <AddIcon />
              </Fab>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5" gutterBottom>
              Vechile Type
            </Typography>
            <div>
              <TextField
                variant="filled"
                margin="normal"
                required
                label="Vechile Type Name"
                onChange={(e) => {
                  setVechilename(e.target.value);
                }}
              />
              <Fab
                size="medium"
                color="primary"
                aria-label="add"
                onClick={addVechile}
                className={classes.margin}
              >
                <AddIcon />
              </Fab>
            </div>
            <Snackbar open={Open} autoHideDuration={3000} onClose={handleClose}>
              <MuiAlert severity="success">{msg}</MuiAlert>
            </Snackbar>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Servicemaster;
