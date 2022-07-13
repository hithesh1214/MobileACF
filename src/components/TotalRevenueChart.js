import React, { useEffect, useState } from "react";
// import { useTheme } from "@material-ui/core/styles";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  Tooltip,
  Legend,
} from "recharts";
import { CircularProgress } from "@material-ui/core";
import Title from "./Title";
import Axios from "axios";

function TotalRevenueChart(props) {
  const [Rev, setRev] = useState({});
  useEffect(() => {
    Axios.post("http://localhost:3001/getrevenue", {
      ACFid: props.ACFid,
    }).then((response) => {
      //   setServiceCnt(response.data);
      console.log(response.data);
      setRev(response.data);
    });
  }, [props.ACFid]);
  if (props.ACFid !== "") {
    return (
      <React.Fragment>
        <Title>Revenue category wise</Title>
        <ResponsiveContainer>
          <BarChart width={150} height={50} data={Rev}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend margin={{ top: 5, bottom: 5, left: 2, right: 2 }} />
            <Bar
              dataKey={"Tyre Repair(Bias/Radial)"}
              stackId="a"
              fill="#82ca9d"
            />
            <Bar dataKey={"Tyre Fitment(New/old)"} stackId="a" fill="#8884d8" />
            <Bar dataKey={"Mushroom Patch"} stackId="a" fill="#a4de6c" />
            <Bar dataKey={"Tyre rotation"} stackId="a" fill="#8dd1e1" />
            <Bar dataKey={"Regular Patch"} stackId="a" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  } else {
    return <CircularProgress />;
  }
}
export default TotalRevenueChart;
