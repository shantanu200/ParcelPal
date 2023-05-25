import React from "react";
import { MenuConatiner } from "../../utils/readyToUse";
import SideBar from "../../components/Company/DashBoard/SideBar";
import DashAppBar from "../../components/Company/DashBoard/AppBar";
import { Box } from "@mui/material";
import PackageManage from "../../components/Company/Packages/PackageManage";
import CurrentPackage from "../../components/Company/Packages/CurrentPackage";
import TrackPackage from "../../components/Company/Packages/TrackPackage";
import DeliveredPackages from "../../components/Company/Packages/DeliveredPackages";

function Package() {
  const action = location.pathname.split("/")[2];

  const renderComp = () => {
    switch (action) {
      case "manage":
        return <PackageManage />;
      case "todays":
        return <CurrentPackage />;
      case "track":
        return <TrackPackage />;
      case "delivered":
        return <DeliveredPackages />;
      default:
        return <h1>404 Error Status Code</h1>;
    }
  };
  return (
    <Box>
      <DashAppBar />
      <MenuConatiner>
        <SideBar />
        {renderComp()}
      </MenuConatiner>
    </Box>
  );
}

export default Package;
