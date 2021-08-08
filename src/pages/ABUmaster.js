import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Fab,
  TextField,
} from "@material-ui/core";
import Axios from "axios";
import AddIcon from "@material-ui/icons/Add";

function ABUmaster() {
  const [SBUlist, setSBUlist] = useState([]);
  const [SBUid, setSBUid] = useState("");
  const [RBUid, setRBUid] = useState("");
  const [ABUname, setABUname] = useState("");
  const [RBUlist, setRBUlist] = useState([]);
  const [ABUcode, setABUcode] = useState("");

  const addABU = () => {
    Axios.post("http://localhost:3001/addABU", {
      ABUname: ABUname,
      ABUcode: ABUcode,
      RBUid: RBUid,
      SBUid: SBUid,
    }).then(() => {
      alert("succesful insert");
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getSBU").then((response) => {
      //   console.log(response.data);
      setSBUlist(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.post("http://localhost:3001/getRBU", {
      SBUid: SBUid,
    }).then((response) => {
      //   console.log(response.data);
      setRBUlist(response.data);
    });
  }, [SBUid]);
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
      margin: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5">
              Select from which SBU you want to select RBU
            </Typography>
            <FormControl className={classes.select}>
              <InputLabel>SBU Name</InputLabel>
              <Select
                autoWidth="true"
                value={SBUid}
                onChange={(e) => {
                  setSBUid(e.target.value);
                }}
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
            <Typography variant="h5">
              Select to which RBU you want to add
            </Typography>
            <FormControl className={classes.select}>
              <InputLabel>RBU Name</InputLabel>
              <Select
                autoWidth="true"
                value={RBUid}
                onChange={(e) => {
                  setRBUid(e.target.value);
                }}
              >
                {Object.entries(RBUlist).map((row) => (
                  <MenuItem value={row[1].RBUid}>{row[1].RBUname}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom>
              ABU Master
            </Typography>
            <div>
              <TextField
                variant="filled"
                margin="normal"
                required
                label="ABU Code"
                className={classes.margin}
                onChange={(e) => {
                  setABUcode(e.target.value);
                }}
              />
              <TextField
                variant="filled"
                margin="normal"
                required
                label="ABU Name"
                className={classes.margin}
                onChange={(e) => {
                  setABUname(e.target.value);
                }}
              />
              <Fab
                size="medium"
                color="primary"
                aria-label="add"
                onClick={addABU}
                className={classes.margin}
              >
                <AddIcon />
              </Fab>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ABUmaster;
