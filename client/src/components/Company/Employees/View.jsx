import React, { useState } from "react";
import InsertForm from "./InsertForm";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Close, Add } from "@mui/icons-material";
import EmployeeTabulation from "./EmployeeTabulation";

const Container = styled(Box)`
  width: 100%;
  padding: 1rem;
`;

const TableMenu = styled(DataGrid)`
  width: 100%;
  height: 10px;
`;

const AddEmpButton = styled(Button)`
  color: red;
`;

const TableView = styled(Box)`
  margin-top: 1rem;
`;

function EmployeeView() {
  const [isAddEmp, setIsAddEmp] = useState(false);
  const id = location.pathname.split("/")[3];

  async function getEmployeesDetails() {
    const { data } = await axios.get(`employee/${id}`);

    return data;
  }

  const { data, isLoading, isError } = useQuery(
    "employee",
    getEmployeesDetails
  );

  if (isLoading) return <h1>Loading...</h1>;

  if (!data) return <h1>Undefined Data</h1>;
  return (
    <Container>
      <AddEmpButton
        startIcon={isAddEmp ? <Close /> : <Add />}
        sx={{ background: `${isAddEmp ? "red" : null}` }}
        onClick={() => setIsAddEmp(!isAddEmp)}
        variant="contained"
      >
        {isAddEmp ? "Close Form" : "Add Employee"}
      </AddEmpButton>
      {isAddEmp && <InsertForm />}
      <EmployeeTabulation empData={data} />
    </Container>
  );
}

export default EmployeeView;
