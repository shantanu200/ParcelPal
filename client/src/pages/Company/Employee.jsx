import React from "react";
import { Box } from "@mui/material";
import DashAppBar from "../../components/Company/DashBoard/AppBar";
import { MenuConatiner } from "../../utils/readyToUse";
import SideBar from "../../components/Company/DashBoard/SideBar";
import InsertForm from "../../components/Company/Employees/InsertForm";
import EmployeeView from "../../components/Company/Employees/View";
import MapView from "../../components/Company/GoogleMaps/MapView";

function Employee() {
  const action = location.pathname.split("/")[2];

  const renderComponent = () => {
    switch (action) {
      case "view":
        return <EmployeeView />;

      case "manage":
        return <MapView />;
      default:
        return <h1>404 Status Code</h1>;
    }
  };
  return (
    <Box>
      <DashAppBar />
      <MenuConatiner>
        <SideBar />
        {renderComponent()}
      </MenuConatiner>
    </Box>
  );
}

export default Employee;
