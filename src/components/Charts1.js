import React from "react";
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
import Title from "./Title";

// Generate Sales Data
function createData(name, amount) {
  return { name, amount };
}

const data = [
  createData("2w/3w", 100),
  createData("Farm", 40),
  createData("LCV", 30),
  createData("PCR", 30),
  createData("Truck", 200),
];

export default function Charts1() {
  return (
    <React.Fragment>
      <Title>Vechile footfall</Title>
      <ResponsiveContainer>
        <BarChart width={150} height={40} data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
