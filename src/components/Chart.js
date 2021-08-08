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
  createData("Puncture repair", 240),
  createData("Tyre Fitment(new/old)", 90),
  createData("Tyre rotation", 50),
  createData("Tyre repair", 800),
];

export default function Chart() {
  return (
    <React.Fragment>
      <Title>Total no. of Services</Title>
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
