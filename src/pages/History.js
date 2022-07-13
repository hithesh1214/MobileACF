import React, { useState, useEffect } from "react";
import {
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
import Axios from "axios";

function History() {
  const [orders, setorders] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost:3001/getorders", {
      ACFid: sessionStorage.getItem("user_id"),
    }).then((response) => {
      // console.log(response.data);
      setorders(response.data);
      // let d = new Date(response.data[0].date);
      // console.log(d.toLocaleString("en-us", { month: "short" }));
    });
  }, []);

  function dateformater(row) {
    let d = new Date(row);
    let month = d.toLocaleString("en-us", { month: "short" });
    let date = d.getDate();
    let year = d.getFullYear();
    return date + " " + month + "," + year;
  }

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
        <Typography variant="h4">List Of Old Orders</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Services</TableCell>
                <TableCell>Vechile type</TableCell>
                <TableCell>Total Cost</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row) => (
                <TableRow>
                  <TableCell>{dateformater(row.date)}</TableCell>
                  <TableCell>
                    {JSON.parse(row.User).FirstName +
                      " " +
                      JSON.parse(row.User).LastName}
                  </TableCell>
                  {JSON.parse(row.Service).Orders.map((r) => (
                    <TableRow>
                      <TableCell>{r.Servicename}</TableCell>
                      <TableCell>{r.Quantity}</TableCell>
                    </TableRow>
                  ))}
                  <TableCell>{JSON.parse(row.Service).Vechilecat}</TableCell>
                  <TableCell>{JSON.parse(row.Service).Totalcost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

export default History;
