import { Box } from "@mui/material";
import DashAppBar from "../../components/Company/DashBoard/AppBar";
import SideBar from "../../components/Company/DashBoard/SideBar";
import axios from "axios";
import { useQuery } from "react-query";
import Home from "../../components/Company/DashBoard/Home";
import { MenuConatiner } from "../../utils/readyToUse";

function DashBoard() {
  const id = location.pathname.split("/")[2];

  async function getFetchComp() {
    const { data } = await axios.get(
      `/company/details/${id}`
    );
    return data;
  }

  const { data, isLoading, isError } = useQuery("data", getFetchComp);

  if (isLoading) return <h1>Loading...</h1>;

  if (isError) return <h1>Error</h1>;

  if (!data) return <h1>Undefined Data</h1>;
  
  

  return (
    <Box>
      <DashAppBar />
      <MenuConatiner sx={{ display: "flex", flex: 1, minHeight: "90vh", width: "100%" }}>
        <SideBar />
        <Home data={data} />
      </MenuConatiner>
    </Box>
  );
}

export default DashBoard;
