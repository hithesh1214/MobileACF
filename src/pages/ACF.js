import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Paper } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import TotalServicesChart from "../components/TotalServicesChart";
import TotalVechilesChart from "../components/TotalVechilesChart";
import Axios from "axios";
import clsx from "clsx";
import TotalRevenueChart from "../components/TotalRevenueChart";

function ACF() {
  const [SBUlist, setSBUlist] = useState([]);
  const [SBUid, setSBUid] = useState("");
  const [RBUlist, setRBUlist] = useState([]);
  const [RBUid, setRBUid] = useState("");
  const [ABUlist, setABUlist] = useState([]);
  const [ABUid, setABUid] = useState();
  const [ACFlist, setACFlist] = useState([]);
  const [ACFid, setACFid] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getSBU").then((response) => {
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

  useEffect(() => {
    Axios.post("http://localhost:3001/getABU", {
      RBUid: RBUid,
    }).then((response) => {
      //   console.log(response.data);
      setABUlist(response.data);
    });
  }, [RBUid]);

  useEffect(() => {
    Axios.post("http://localhost:3001/getACF", {
      ABUid: ABUid,
    }).then((response) => {
      // console.log(response);
      setACFlist(response.data);
    });
  }, [ABUid]);

  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(1),
      margin: theme.spacing(3, 1, 0),
    },
    select: {
      margin: theme.spacing(1),
      width: "100%",
    },
    margin: {
      margin: theme.spacing(2, 1),
    },
    fixedHeight: {
      height: 400,
      padding: theme.spacing(5, 2),
    },
    content: {
      padding: theme.spacing(1),
    },
  }));
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4">ACF Dashboard</Typography>
          </Grid>
          <Grid item xs={12} lg={4}>
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
                <MenuItem value="all">all</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={4}>
            <FormControl className={classes.select}>
              <InputLabel>RBU Name</InputLabel>
              <Select
                autoWidth="true"
                value={RBUid}
                onChange={(e) => {
                  setRBUid(e.target.value);
                }}
              >
                {RBUlist.map((row) => (
                  <MenuItem value={row.RBUid}>{row.RBUname}</MenuItem>
                ))}
                <MenuItem value="all">all</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={4}>
            <FormControl className={classes.select}>
              <InputLabel>ABU Name</InputLabel>
              <Select
                autoWidth="true"
                value={ABUid}
                onChange={(e) => {
                  setABUid(e.target.value);
                }}
              >
                {ABUlist.map((row) => (
                  <MenuItem value={row.ABUid}>{row.ABUname}</MenuItem>
                ))}
                <MenuItem value="all">all</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormControl className={classes.select}>
              <InputLabel>ACF name</InputLabel>
              <Select
                autoWidth="true"
                value={ABUid}
                onChange={(e) => {
                  setACFid(e.target.value);
                }}
              >
                {ACFlist.map((row) => (
                  <MenuItem value={row.ACFid}>
                    {row.Shopname + " - " + row.Ownername}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      <Grid container spacing={1}>
        <Grid item lg={6}>
          <Paper className={fixedHeightPaper}>
            <TotalServicesChart ACFid={ACFid} />
          </Paper>
        </Grid>
        <Grid item lg={6}>
          <Paper className={fixedHeightPaper}>
            <TotalVechilesChart ACFid={ACFid} />
          </Paper>
        </Grid>
        <Grid item lg={12}>
          <Paper className={fixedHeightPaper}>
            <TotalRevenueChart ACFid={ACFid} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ACF;
