import React from "react";
import { useState } from "react";
import Axios from "axios";
import MuiAlert from "@material-ui/lab/Alert";
import { Grid, Paper, Typography, Snackbar } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";

function SBUmaster() {
  const [SBUname, setSBUname] = useState("");

  //notifier fields
  const [Open, setOpen] = useState(false);
  const [msg, setmsg] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const addSBU = () => {
    Axios.post("http://localhost:3001/addSBU", {
      SBUname: SBUname,
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
    margin: {
      margin: theme.spacing(2, 1),
    },
  }));
  const classes = useStyles();

  return (
    <div className="SBUmaster">
      <Grid container spacing={3} className={classes.margin}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              SBU Master
            </Typography>
            <div>
              <TextField
                variant="filled"
                margin="normal"
                // fullWidth
                required
                label="SBU Name"
                onChange={(e) => {
                  setSBUname(e.target.value);
                }}
              />
              <Fab
                size="medium"
                color="primary"
                aria-label="add"
                onClick={addSBU}
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

export default SBUmaster;
