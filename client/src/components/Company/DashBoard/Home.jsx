import { Box } from "@mui/material";
import React from "react";
import CardCatelog from "./CardCatelog";
import AreaGraph from "./AreaGraph";
import DataTabulation from "./DataTabulation";

function Home({data}) {
  return (
    <Box>
      <CardCatelog data={data} />
      <AreaGraph />
      <DataTabulation />
    </Box>
  );
}

export default Home;
