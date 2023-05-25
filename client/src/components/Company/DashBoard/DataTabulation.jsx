import { Box } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";

const Container = styled(Box)`
  margin: 1rem 0;
  padding: 1rem;
`;

const Text = styled.h2`
  padding: 1rem 0;
`;

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: true,
  },
  {
    field: "assignedPackages",
    headerName: "Packages",
    type: "number",
    width: 150,
    editable: true,
    valueGetter: (params) => params.row.assignedPackages.length,
  },
  {
    field: "contactNumber",
    headerName: "Contact Number",
    type: "number",
    width: 150,
    editable: true,
  },
  {
    field: "role",
    headerName: "Role",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 150,
  },
];
const rows = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Manager",
    assignedPackages: ["PKG-001", "PKG-002", "PKG-003"],
    contactNumber: "123-456-7890",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Courier",
    assignedPackages: ["PKG-004", "PKG-005"],
    contactNumber: "987-654-3210",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Courier",
    assignedPackages: ["PKG-006", "PKG-007"],
    contactNumber: "555-555-5555",
  },
  {
    id: 4,
    name: "Alice Lee",
    email: "alice.lee@example.com",
    role: "Manager",
    assignedPackages: ["PKG-008", "PKG-009"],
    contactNumber: "777-777-7777",
  },
  {
    id: 5,
    name: "James Smith",
    email: "james.smith@example.com",
    role: "Courier",
    assignedPackages: ["PKG-010"],
    contactNumber: "888-888-8888",
  },
  {
    id: 6,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "Courier",
    assignedPackages: ["PKG-011", "PKG-012", "PKG-013"],
    contactNumber: "111-111-1111",
  },
  {
    id: 7,
    name: "David Brown",
    email: "david.brown@example.com",
    role: "Manager",
    assignedPackages: ["PKG-014", "PKG-015"],
    contactNumber: "222-222-2222",
  },
  {
    id: 8,
    name: "Sarah Kim",
    email: "sarah.kim@example.com",
    role: "Courier",
    assignedPackages: ["PKG-016", "PKG-017"],
    contactNumber: "333-333-3333",
  },
];

function DataTabulation() {
  return (
    <Container>
      <Text>Packages</Text>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Container>
  );
}

export default DataTabulation;
