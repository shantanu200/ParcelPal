import { Box, Step, StepLabel, Stepper } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function RoutesDetails({ packageId }) {
  const [path, setPath] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(
        `http://localhost:6969/package/directionOfPackage/${packageId}`
      );
      setPath(data);
    }
    getData();
  }, [packageId]);

  return (
    <Box sx={{ width: "100%", p: 2, my: 4, border: "1px solid black" }}>
      {path.length > 0 ? (
        <Stepper activeStep={0} alternativeLabel>
          {path.map((val) => (
            <Step key={val}>
              <StepLabel>{val}</StepLabel>
            </Step>
          ))}
        </Stepper>
      ) : (
        <Box fontWeight={700} fontSize={16} color={"red"}>
          Location Not Found in Graph...
        </Box>
      )}
    </Box>
  );
}

export default RoutesDetails;
