import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import React from "react";
import { Box, Tooltip } from "@mui/material";
import styled from "styled-components";

const Container = styled(Box)`
  border: 1px solid black;
  padding: 1rem;
`;

function AreaGraph() {
  /* Reference */
  const getFiveDaysDate = () => {
    const today = new Date();
    const dates = [];

    for (let i = 1; i <= 5; i++) {
      const prevDate = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const month = prevDate.toLocaleString("default", { month: "long" });
      const day = prevDate.getDate();
      dates.push(`${month},${day}`);
    }

    return dates;
  };
  const data = [
    {
      name: "April,24",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

``
  return (
    <ResponsiveContainer width={"100%"} height={250}>
      <AreaChart
        width={0}
        height={300}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey={"name"} />
        <YAxis />
        <CartesianGrid />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AreaGraph;
