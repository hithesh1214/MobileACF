import Axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableBody,
  TableContainer,
  Typography,
  makeStyles,
} from "@material-ui/core";

function Service() {
  const [Servicelist, setServicelist] = useState([]);
  const [Tyrelist, setTyrelist] = useState([]);
  const [Vechilelist, setVechilelist] = useState([]);

  const useStyles = makeStyles((theme) => ({
    paper: {
      margin: theme.spacing(3, 1, 0),
      padding: theme.spacing(3),
    },
    margin: {
      margin: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  useEffect(() => {
    Axios.get("http://localhost:3001/getService").then((response) => {
      //   console.log(response.data);
      setServicelist(response.data);
    });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:3001/getTyre").then((response) => {
      //   console.log(response.data);
      setTyrelist(response.data);
    });
  }, []);
  useEffect(() => {
    Axios.get("http://localhost:3001/getVechile").then((response) => {
      //   console.log(response.data);
      setVechilelist(response.data);
    });
  }, []);
  return (
    <div>
      <Grid container spacing={3} className={classes.paper}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4">List Of Service's</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Service Name</TableCell>
                    <TableCell>Service id</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(Servicelist).map((row) => (
                    <TableRow>
                      <TableCell>{row[1].Servicename}</TableCell>
                      <TableCell>{row[1].Serviceid}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4">List Of Tyre Company's</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Company id</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(Tyrelist).map((row) => (
                    <TableRow>
                      <TableCell>{row[1].TyreCompanyname}</TableCell>
                      <TableCell>{row[1].TyreCompanyid}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4">List Of Vechile Type's</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Vechile Type</TableCell>
                    <TableCell>Vechile id</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(Vechilelist).map((row) => (
                    <TableRow>
                      <TableCell>{row[1].Vechilename}</TableCell>
                      <TableCell>{row[1].Vechileid}</TableCell>
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

export default Service;
