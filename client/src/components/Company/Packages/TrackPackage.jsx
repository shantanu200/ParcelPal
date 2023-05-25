import { Inventory2 } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import RoutesDetails from "./SubComponents/RoutesDetails";

function TrackPackage() {
  const [isTrack, setIsTrack] = useState(false);
  const [packageId, setPackageID] = useState(null);
  let id = location.pathname.split("/")[3];

  const getData = async () => {
    const { data } = await axios.get(`/package/getPackages/${id}`);

    return data;
  };

  const { data, isLoading, isError } = useQuery("packages", getData);

  const handleTrack = async (_id) => {
    setIsTrack(!isTrack);
    setPackageID(_id);
  };

  if (isLoading) return <h1>Data is Loading...</h1>;
  return (
    <Box
      sx={{
        width: "75%",
        py: 2,
        mx: 2,
      }}
    >
      <h2>Track Courier Package Details</h2>
      {isTrack ? (
        <RoutesDetails packageId={packageId} />
      ) : (
        data?.map((val, id) => {
          return (
            <Box
              display={"flex"}
              flexDirection={"row"}
              width={"100%"}
              alignItems={"center"}
              justifyContent={"space-around"}
              sx={{
                p: 2,
                mt: 2,
                border: "1px solid black",
                borderRadius: 2,
              }}
            >
              <Box textAlign={"center"}>
                <Inventory2 />
              </Box>
              <Box
                width={"50%"}
                display={"flex"}
                justifyContent={"space-evenly"}
              >
                <span style={{ fontWeight: 700 }}>{val.senderAddress}</span>
                <span style={{ fontWeight: 700 }}>{val.receiverAddress}</span>
              </Box>
              <Box
                display={"flex"}
                width={"30%"}
                justifyContent={"space-around"}
              >
                <Button
                  variant="outlined"
                  onClick={() => handleTrack(val?._id)}
                >
                  Track Package Path
                </Button>
              </Box>
            </Box>
          );
        })
      )}
    </Box>
  );
}

export default TrackPackage;
