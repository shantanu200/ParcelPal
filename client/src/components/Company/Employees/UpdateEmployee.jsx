import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import styled from "styled-components";
import {
  useEmail,
  useInput,
  useMobileNumber,
  usePassword,
} from "../../../hooks/useNumberInput";
import axios from "axios";

const Container = styled(Box)`
  width: 75%;
  margin: 1rem 0;
`;

const Header = styled.h2``;
const FieldContainer = styled(Box)`
  margin: 1rem 0;
  display: flex;
`;

const SelectMenu = styled(Select)``;

function UpdateEmployee({ id }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(null);
  const [contactDetails, setContactDetails] = useState("");

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`/employee/details/${id}`);
      setName(data.name);
      setEmail(data.email);
      setRole(data.role);
      setContactDetails(data.phoneNumber);
    }
    getData();
  }, [id]);

  console.log(id);

  const handleSubmit = async () => {
    if (!name || !email || !role || !contactDetails) {
      alert("Please fill all details");
      return;
    } else {
      try {
        const { data } = await axios.post(`/employee/updateEmployee/${id}`, {
          name,
          email,
          role,
          phoneNumber: contactDetails,
        });

        if (data) {
          alert(data?.msg);
          window.location.reload(0);
        }
      } catch (error) {
        alert(error?.response?.data?.msg);
      }
    }
  };
  return (
    <Container>
      <Header>Update Employee Details</Header>
      <FormControl fullWidth>
        <FieldContainer>
          <TextField
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
        </FieldContainer>
        <FieldContainer>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
          />
        </FieldContainer>

        <FieldContainer>
          <FormControl sx={{ width: "50%" }}>
            <SelectMenu
              labelID="demo-simple-select-label"
              labelId="demo-simple-select"
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Delivery Person">Delivery Person</MenuItem>
            </SelectMenu>
          </FormControl>
          <TextField
            sx={{ width: "50%", ml: 2 }}
            value={contactDetails}
            onChange={(e) => setContactDetails(e.target.value)}
            onInput={(e) => {
              e.target.value = e.target.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*?)\..*/g, "$1")
                .replace(/^0[^.]/, "0");
            }}
            inputProps={{ maxLength: 10 }}
            required
          />
        </FieldContainer>
        <Button sx={{ width: "50%" }} variant="outlined" onClick={handleSubmit}>
          Update Details
        </Button>
      </FormControl>
    </Container>
  );
}

export default UpdateEmployee;
