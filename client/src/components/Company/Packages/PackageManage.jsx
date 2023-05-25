import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import styled from "styled-components";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import AddPackageForm from "./SubComponents/AddPackageForm";
import PackageCatelog from "./SubComponents/PackageCatelog";

const Container = styled(Box)`
  padding: 20px;
  width: 75%;
`;

function PackageManage() {
  const [isView, setIsview] = useState(false);
  const handleView = () => {
    setIsview(!isView);
  };
  return (
    <Container>
      <Button
        variant="contained"
        startIcon={<Inventory2Icon />}
        color="secondary"
        onClick={handleView}
        sx={isView ? { background: "red" } : null}
      >
        {isView ? "Close Form" : "Add Package"}
      </Button>
      {isView ? <AddPackageForm /> : <PackageCatelog />}
    </Container>
  );
}

export default PackageManage;
