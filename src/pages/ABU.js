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

function ABU() {
  const [SBUlist, setSBUlist] = useState([]);
  const [SBUid, setSBUid] = useState("");
  const [RBUlist, setRBUlist] = useState([]);
  const [RBUid, setRBUid] = useState("");
  const [ABUlist, setABUlist] = useState([]);

  const getABU = () => {
    Axios.post("http://localhost:3001/getABU", {
      RBUid: RBUid,
    }).then((response) => {
      //   console.log(response.data);
      setABUlist(response.data);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getSBU").then((response) => {
      // console.log(response.data);
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
  useEffect(getABU, [RBUid]);
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
              Select the specifc SBU or else select all
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
                <MenuItem value="all">all</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h5">
              Select the specifc RBU or else select all
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
                {RBUlist.map((row) => (
                  <MenuItem value={row.RBUid}>{row.RBUname}</MenuItem>
                ))}
                <MenuItem value="all">all</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4">List Of ABU's</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ABU Name</TableCell>
                    <TableCell>ABU Code</TableCell>
                    <TableCell>ABU id</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(ABUlist).map((row) => (
                    <TableRow>
                      <TableCell>{row[1].ABUname}</TableCell>
                      <TableCell>{row[1].ABUcode}</TableCell>
                      <TableCell>{row[1].ABUid}</TableCell>
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

export default ABU;
