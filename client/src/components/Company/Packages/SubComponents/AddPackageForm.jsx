import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { useInput } from "../../../../hooks/useNumberInput";
import dayjs from "dayjs";
import axios from "axios";

const FormContainer = styled(Box)`
  margin: 15px 0;
  width: 100%;
`;

const FormHeader = styled.h2`
  border: 1px solid black;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
`;

const Form = styled(Box)``;

const FormField = styled(Box)`
  width: 100%;
  margin: 15px 0;
  display: flex;
  align-items: center;
`;

const InputField = styled(TextField)`
  width: 50%;
`;

const AutoItem = styled(Autocomplete)`
  width: 50%;
`;

function AddPackageForm() {
  let id = location.pathname.split("/")[3];
  console.log(id);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "",
    libraries: ["places"],
    region: "in",
  });

  const [senderName, handleSName, senderNameError] = useInput("");
  const [receiverName, handleRName, receieverNameError] = useInput("");
  const [weight, handleWeight, weightError] = useInput("");
  const [status, setStatus] = useState("");
  const [deliveryDate, setDeliveryDate] = useState(dayjs(new Date()));
  const [deliveryTime, setdeliveryTime] = useState("");
  const senderAddress = useRef();
  const receiverAddress = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let sAddress = senderAddress.current.value;
    let rAddress = receiverAddress.current.value;
    if (
      !senderName ||
      !receiverName ||
      !weight ||
      !status ||
      !deliveryDate ||
      !deliveryTime
    ) {
      alert("Please fill complete Form");
      return;
    } else {
      const postData = {
        senderName,
        receiverName,
        weight,
        status,
        deliveryDate,
        senderAddress: sAddress,
        receiverAddress: rAddress,
      };
      console.log(postData);
      try {
        const { data } = await axios.post(`/package/createPackage/${id}`,postData);

        if (data?.status) {
          alert("Package is added");
        }
      } catch (error) {
        alert(error?.response?.data?.msg);
      }
    }
  };

  if (!isLoaded) return <h1>Google Search API is Loading</h1>;
  return (
    <FormContainer component="form">
      <FormHeader>Package Details</FormHeader>
      {console.log(senderAddress.current?.value)}
      <Form>
        <FormField>
          <InputField
            label="Sender Name"
            sx={{ mr: 2 }}
            onChange={handleSName}
            error={senderNameError}
            helperText={senderNameError ? "Please enter name" : null}
            required
          />
          <AutoItem>
            <TextField
              inputRef={senderAddress}
              name="senderAddress"
              type="text"
              sx={{ width: "100%" }}
              label="Sender Address"
              required
            />
          </AutoItem>
        </FormField>
        <FormField>
          <InputField
            label="Receiver Name"
            sx={{ mr: 2 }}
            onChange={handleRName}
            error={receieverNameError}
            helperText={receieverNameError ? "Please enter name" : null}
            required
          />
          <AutoItem>
            <TextField
              inputRef={receiverAddress}
              type="text"
              sx={{ width: "100%" }}
              label="Receiver Address"
              required
            />
          </AutoItem>
        </FormField>
        <FormField>
          <InputField
            type="number"
            label="Weight"
            sx={{ mr: 2 }}
            onChange={handleWeight}
            error={weightError}
            helperText={weightError ? "Please enter weight" : null}
            required
          />
          <FormControl sx={{ width: "50%" }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelID="demo-simple-select-label"
              labelId="demo-simple-select"
              label="Status"
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Transist">In Transist</MenuItem>
              <MenuItem value="Delivered">Delivered</MenuItem>
            </Select>
          </FormControl>
        </FormField>
        <FormField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              sx={{ width: "50%", mr: 2 }}
              onChange={(value) => setDeliveryDate(value.$d.toString())}
              required
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              sx={{ width: "50%" }}
              onChange={(value) => setdeliveryTime(value.$d.toString())}
            />
          </LocalizationProvider>
        </FormField>
      </Form>
      <Button variant="contained" onClick={handleSubmit}>
        Submit Package Details
      </Button>
    </FormContainer>
  );
}

export default AddPackageForm;
