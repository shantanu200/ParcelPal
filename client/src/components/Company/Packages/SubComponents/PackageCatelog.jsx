import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Inventory2, PersonPin, Info } from "@mui/icons-material";
import AssignPackage from "./AssignPackage";

function PackageCatelog() {
  const [packageID,setPackageID] = useState("");
  const [isAssign, setIsAssign] = useState(false);
  const [isDetails, setisDetails] = useState(false);
  let id = location.pathname.split("/")[3];

  const getData = async () => {
    const { data } = await axios.get(`/package/getPackages/${id}`);

    return data;
  };

  const handleAssignPackage = async (_id) => {
    setIsAssign(!isAssign);
    setPackageID(_id);
  };

  const { data, isLoading, isError } = useQuery("packages", getData);

  if (isLoading) return <h1>Data is Loading...</h1>;

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      {isAssign ? (
        <AssignPackage id={packageID} />
      ) : (
        data.map((val, id) => {
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
                <Button variant="outlined" startIcon={<Info />}>
                  Details
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<PersonPin />}
                  onClick={() => handleAssignPackage(val?._id)}
                >
                  Assign Package
                </Button>
              </Box>
            </Box>
          );
        })
      )}
    </Box>
  );
}

export default PackageCatelog;
