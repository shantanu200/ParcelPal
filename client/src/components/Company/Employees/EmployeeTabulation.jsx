import React, { useEffect, useState } from "react";
import InsertForm from "./InsertForm";
import styled from "styled-components";
import axios from "axios";
import { useQuery } from "react-query";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { Close, Add } from "@mui/icons-material";
import UpdateEmployee from "./UpdateEmployee";

const Container = styled(Box)`
  width: 100%;
  padding: 1rem;
`;

const TableView = styled(Box)`
  margin-top: 1rem;
`;

function EmployeeTabulation({ empData }) {
  const [empID, setEmpID] = useState(null);
  const [empDetails, setEmpDetails] = useState({});
  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "phoneNumber", headerName: "ContactDetails", width: 150 },
    {
      field: "assignedPackages",
      headerName: "Packages",
      type: "number",
      width: 100,
      valueGetter: (params) => params.row.assignedPackages.length,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        const handleClick = () => {
          setEmpID(params.row._id);
        };

        const handleDelete = async () => {
          const res = confirm("Do You want to delete employee details");

          if (res) {
            const { data } = await axios.get(
              `/employee/deleteEmployee/${params.row._id}`
            );

            if (data) {
              alert("Deleted");
            } else {
              alert("error");
            }
          } else {
            return;
          }
        };

        return (
          <>
            <Button
              onClick={handleClick}
              sx={{ marginRight: "2rem" }}
              variant="outlined"
            >
              Update
            </Button>
            <Button
              sx={{ color: "red", borderColor: "red" }}
              variant="outlined"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`/employee/details/${empID}`);
      setEmpDetails(data);
    }
    getData();
  }, [empID]);

  return (
    <Container>
      <TableView>
        <DataGrid
          rows={empData}
          columns={columns}
          getRowId={(row) => row._id}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </TableView>
      {empID && <UpdateEmployee id={empID} />}
    </Container>
  );
}

export default EmployeeTabulation;
