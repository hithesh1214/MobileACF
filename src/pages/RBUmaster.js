import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Snackbar,
  MenuItem,
  makeStyles,
  Fab,
  TextField,
} from "@material-ui/core";
import Axios from "axios";
import AddIcon from "@material-ui/icons/Add";

function RBUmaster() {
  const [SBUlist, setSBUlist] = useState([]);
  const [SBUid, setSBUid] = useState("");
  const [RBUname, setRBUname] = useState("");
  const handleChange = (event) => {
    setSBUid(event.target.value);
  };

  //notifier fields
  const [Open, setOpen] = useState(false);
  const [msg, setmsg] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const addRBU = () => {
    Axios.post("http://localhost:3001/addRBU", {
      RBUname: RBUname,
      SBUid: SBUid,
    }).then((response) => {
      setmsg(response.data.message);
      setOpen(true);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getSBU").then((response) => {
      // console.log(response.data);
      setSBUlist(response.data);
    });
  }, []);

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
            <Typography variant="h5">
              Select to which SBU you want to add
            </Typography>
            <FormControl className={classes.select}>
              <InputLabel id="demo-simple-select-label">SBU Name</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                autoWidth="true"
                value={SBUid}
                onChange={handleChange}
              >
                {SBUlist.map((row) => (
                  <MenuItem value={row.SBUid}>{row.SBUname}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              RBU Master
            </Typography>
            <div>
              <TextField
                variant="filled"
                margin="normal"
                required
                label="RBU Name"
                onChange={(e) => {
                  setRBUname(e.target.value);
                }}
              />
              <Fab
                size="medium"
                color="primary"
                aria-label="add"
                onClick={addRBU}
                className={classes.margin}
              >
                <AddIcon />
              </Fab>
            </div>
          </Paper>
          <Snackbar open={Open} autoHideDuration={3000} onClose={handleClose}>
            <MuiAlert severity="success">{msg}</MuiAlert>
          </Snackbar>
        </Grid>
      </Grid>
    </div>
  );
}

export default RBUmaster;
