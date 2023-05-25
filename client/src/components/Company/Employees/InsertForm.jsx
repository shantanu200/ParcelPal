import React, { useState } from "react";
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

function InsertForm() {
  const id = location.pathname.split("/")[3];
  const [role, setRole] = useState("");
  const [name, handleName, nameError] = useInput("");
  const [email, handleEmail, emailError] = useEmail("");
  const [password, handlePassword, passwordError] = usePassword("");
  const [contact, handleContact, contactError] = useMobileNumber("");

  const handleSubmit = async () => {
    if (!role || nameError || emailError || passwordError || contactError) {
      alert("Please fill all fields");
    } else {
      try {
        const { data } = await axios.post(`/employee/${id}`, {
          name,
          email,
          password,
          role,
          phoneNumber: contact,
        });

        if (data) {
          alert("Employee Add Successfully");
        }
      } catch (error) {
        console.log(error?.response?.data?.msg);
      }
    }
  };
  return (
    <Container>
      <Header>Add Employee Details</Header>
      <FormControl fullWidth>
        <FieldContainer>
          <TextField
            label={"Full Name"}
            onChange={handleName}
            error={nameError}
            helperText={nameError ? "Field must not be empty" : ""}
            fullWidth
            required
          />
        </FieldContainer>
        <FieldContainer>
          <TextField
            label="Email"
            error={emailError}
            onChange={handleEmail}
            helperText={emailError ? "Invalid Email" : ""}
            fullWidth
            required
          />
        </FieldContainer>
        <FieldContainer>
          <TextField
            type="password"
            label="Password"
            error={passwordError}
            onChange={handlePassword}
            helperText={passwordError ? "Field must contain 8 characters" : ""}
            fullWidth
            required
          />
        </FieldContainer>

        <FieldContainer>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <SelectMenu
              labelID="demo-simple-select-label"
              labelId="demo-simple-select"
              label="Role"
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
            label="Contact Details"
            onChange={handleContact}
            helperText={contactError ? "Field must contain 10 digits" : ""}
            error={contactError}
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
        <Button
          sx={{ width: "50%" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </FormControl>
    </Container>
  );
}

export default InsertForm;
