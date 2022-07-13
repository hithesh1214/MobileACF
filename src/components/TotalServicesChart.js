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

function TotalServicesChart(props) {
  const [ServiceCnt, setServiceCnt] = useState({});
  useEffect(() => {
    Axios.post("http://localhost:3001/getservicecount", {
      ACFid: props.ACFid,
    }).then((response) => {
      setServiceCnt(response.data);
      // console.log(response.data);
    });
  }, [props.ACFid]);

  if (props.ACFid) {
    return (
      <React.Fragment>
        <Title>Total no. of Services</Title>
        <ResponsiveContainer>
          <BarChart width={150} height={40} data={ServiceCnt}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend margin={{ top: 5, bottom: 5, left: 2, right: 2 }} />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </React.Fragment>
    );
  } else {
    return <CircularProgress></CircularProgress>;
  }
}
export default TotalServicesChart;
