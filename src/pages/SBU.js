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

function SBU() {
  const [SBUlist, setSBUlist] = useState([]);

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
    Axios.get("http://localhost:3001/getSBU").then((response) => {
      // console.log(response.data);
      setSBUlist(response.data);
    });
  }, []);

  return (
    <div>
      <Grid container spacing={3} className={classes.paper}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h4">List Of SBU's</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>SBU Name</TableCell>
                    <TableCell>SBU id</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {SBUlist.map((row) => (
                    <TableRow>
                      <TableCell>{row.SBUname}</TableCell>
                      <TableCell>{row.SBUid}</TableCell>
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

export default SBU;
