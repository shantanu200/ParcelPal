import pallete from "../../utils/color";
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import CompanyLogin from "../../components/Company/Login";
import CompanyRegisterForm from "../../components/Company/Register";

function CompanyRegister() {
  const location = useLocation();
  const action = location.pathname.split("/")[2];

  const renderBlock = () => {
     switch(action){
       case 'register':
        return <CompanyRegisterForm />;
       case 'login':
        return <CompanyLogin />
       default:
        return <h1>Error Page Not Found</h1>
     }
  }
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{
        minHeight:"100vh",
        height:"100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: pallete.purple,
      }}
    >
    {renderBlock()}
    </Box>
  );
}

export default CompanyRegister;
