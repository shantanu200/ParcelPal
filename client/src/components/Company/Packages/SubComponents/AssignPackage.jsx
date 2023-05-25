import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function AssignPackage({ id }) {
  let compId = location.pathname.split("/")[3];

  const [empData, setEmpData] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(null);
  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(
        `http://localhost:6969/employee/${compId}`
      );
      setEmpData(data);
    }

    getData();
  }, [compId]);
  const handleAssign = async () => {
    if (selectedEmp == null) {
      alert("Please select an employee");
      return;
    }

    try {
      const postData = {
        empID: selectedEmp,
        packageID: id,
      };
      const { data } = await axios.post(
        `http://localhost:6969/package/assignPackage`,
        postData
      );

      if (data?.status) {
        alert("Package is assigned");
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <Box sx={{ py: 2 }}>
      <Box fontWeight={800} fontSize={24}>
        Assign Package to Delivery Person
      </Box>
      <FormControl sx={{ py: 2 }}>
        <FormLabel id="demo-radio-buttons-group-label">
          Delivery Person
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={selectedEmp}
          onChange={(event) => setSelectedEmp(event.target.value)}
        >
          {empData?.map((val, id) => {
            return (
              <FormControlLabel
                value={val._id}
                control={<Radio />}
                label={val.name}
              />
            );
          })}
        </RadioGroup>
        <Button sx={{ mt: 2 }} variant="outlined" onClick={handleAssign}>
          Assign
        </Button>
      </FormControl>
    </Box>
  );
}

export default AssignPackage;
