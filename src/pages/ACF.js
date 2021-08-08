import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Axios from "axios";

function ACF() {
  const [SBUlist, setSBUlist] = useState([]);
  const [SBUid, setSBUid] = useState("");
  const [RBUlist, setRBUlist] = useState([]);
  const [RBUid, setRBUid] = useState("");
  const [ABUlist, setABUlist] = useState([]);
  const [ABUid, setABUid] = useState();
  const [Userslist, setUserlist] = useState([]);

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

  const getUser = () => {
    Axios.post("http://localhost:3001/getACF", {
      ABUid: ABUid,
    }).then((response) => {
      console.log(response);
      setUserlist(response.data);
    });
  };
  useEffect(getUser, [ABUid]);
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: theme.spacing(3, 1, 0),
    },
    select: {
      margin: theme.spacing(1),
      width: "100%",
    },
    margin: {
      margin: theme.spacing(2, 1),
    },
  }));
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container spacing={3}>
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
        </Grid>
      </Paper>
      <Grid container spacing={3}>
        <Grid item lg={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4">List Of ACF's</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Owner Name</TableCell>
                    <TableCell>ACF Name</TableCell>
                    <TableCell>ACF id</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(Userslist).map((row) => (
                    <TableRow>
                      <TableCell>{row[1].Ownername}</TableCell>
                      <TableCell>{row[1].Shopname}</TableCell>
                      <TableCell>{row[1].Userid}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default ACF;
