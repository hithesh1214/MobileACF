import React from "react";
import clsx from "clsx";
import { Grid, Typography } from "@material-ui/core";
import Chart from "../components/Chart";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Charts1 from "../components/Charts1";

export default function Home() {
  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    fixedHeight: {
      height: 300,
    },
    content: {
      padding: theme.spacing(4),
    },
  }));
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <div>
      <Grid container spacing={3} className={classes.content}>
        <Grid item lg={12}>
          <Typography>ACF Dashboard</Typography>
          {/* Chart */}
        </Grid>

        <Grid item lg={6}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item lg={6}>
          <Paper className={fixedHeightPaper}>
            <Charts1 />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item lg={6}>
          <Paper className={fixedHeightPaper}>
            <Chart />
          </Paper>
        </Grid>
        <Grid item lg={6}>
          <Paper className={fixedHeightPaper}>
            <Charts1 />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
