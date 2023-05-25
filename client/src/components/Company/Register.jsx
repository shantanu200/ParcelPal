import { Alert, Autocomplete, Box, Button, TextField } from "@mui/material";
import  { useState } from "react";
import { cities, states } from "../../utils/data";
import styled from "@emotion/styled";
import pallete from "../../utils/color";
import CourierRegisterImg from "../../images/CourierRegister.jpg";
import {
  useEmail,
  useInput,
  useMobileNumber,
  usePinCode,
} from "../../hooks/useNumberInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TextHeader = styled.h2``;
const Image = styled.img`
  max-width: 80%;
`;
function CompanyRegisterForm() {
  const [name, handleName, nameError] = useInput("");
  const [email, handleEmail, emailError] = useEmail("");
  const [add1, handleAdd1, addError1] = useInput("");
  const [add2, handleAdd2, addError2] = useInput("");
  const [state,setState] = useState(null);
  const [city,setCity] = useState(null);
  const [mobileNumeber, handleMobNumber, MobError] = useMobileNumber("");
  const [pincode, handlePincode, pinCodeError] = usePinCode("");
  const [ownerName, handleOwnerName, ownerNameError] = useInput();
  const [ownerEmail, handleOwnerEmail, ownerEmailError] = useEmail();
  const [ownerContact, handleOwnerContact, ownerContactError] = useMobileNumber();
  const [formValid,setFormValid] = useState(true);
  const [errorMsg,setErrorMsg] = useState("Please Fill All Details")
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if((nameError || !name) || (emailError || !email) || (addError1 || !add1) || (addError2 || !add2) || state === "" || city === "" || (MobError || !mobileNumeber) || (pinCodeError || !pincode) || (ownerNameError || !ownerName) || (ownerEmailError || !ownerEmail) || (ownerContactError || !ownerContact)){
      setFormValid(false);
    }
    else{

      setFormValid(true);
      const postData = {
        name,
        email,
        address:{
          text:add1+", "+add2,
          state,
          city,
          mobileNumeber,
          pincode
        },
        contactPerson:{
          ownerName,
          ownerEmail,
          ownerContact
        }
      }

      try{
        const {data} = await axios.post(`/company`,postData);

        if(data?.status){
          navigate(`/compDetails/${data?._id}`);
        }
      }catch(error){
        setErrorMsg(error?.response?.data?.msg);
        setFormValid(false);
      }
    
    }
    
  };
  return (
    <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",m:2}}>
    {!formValid && <Alert variant={"filled"} severity="error" sx={{m:2,width:"80%"}}>{errorMsg}</Alert>}
    {console.log(formValid)}
    <Box
      sx={{
        width: "80%",
        backgroundColor: "#FFF",
        display: "flex",
        borderRadius: "5px",
        boxShadow: "-4px -3px 45px 21px rgba(0,0,0,0.35)",
        my:2
      }}
      lg={{
        width: "100%",
      }}
    >
      
      <Box sx={{ width: "50%", p: "2rem" }}>
        <TextHeader>Register Your Organization</TextHeader>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              onChange={handleName}
              sx={{ mr: 2, width: "50%" }}
              label="Name"
              error={nameError}
              helperText={nameError ? "Name is Empty" : ""}
            />
            <TextField
              name="email"
              onChange={handleEmail}
              label="Email"
              sx={{ width: "50%" }}
              error={emailError}
              helperText={emailError ? "Invalid Email" : ""}
            />
          </Box>
          <Box>
            <TextField
              name="line1"
              onChange={handleAdd1}
              label="Address Line 1"
              fullWidth
              error={addError1}
              helperText={addError1 ? "Field must not be Empty" : ""}
              sx={{ mt: 2 }}
            />
            <TextField
              name="line2"
              onChange={handleAdd2}
              label="Address Line 2"
              fullWidth
              sx={{ mt: 2 }}
              error={addError2}
              helperText={addError2 ? "Field must not be Empty" : ""}
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={states}
              sx={{ width: "50%", mr: 2 }}
              renderInput={(params) => <TextField {...params} label="State" />}
              value={state}
              onChange={(event, newValue) => {
                setState(newValue);
              }}
              
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={cities}
              sx={{ width: "50%" }}
              renderInput={(params) => <TextField {...params} label="City" />}
              value={city}
              onChange={(event, newValue) => {
               setCity(newValue);
              }}
            />
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between,", mt: 2 }}
          >
            <TextField
              type="text"
              inputProps={{ maxLength: 10 }}
              sx={{ width: "50%", mr: 2 }}
              name="mobileNumber"
              label="Mobile Number"
              onChange={handleMobNumber}
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*?)\..*/g, "$1")
                  .replace(/^0[^.]/, "0");
              }}
              error={MobError}
              helperText={MobError ? "Field must contain 10 Digits" : ""}
            />
            <TextField
              type="text"
              inputProps={{ maxLength: 6 }}
              name="pincode"
              sx={{ width: "50%" }}
              label="Pincode"
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*?)\..*/g, "$1")
                  .replace(/^0[^.]/, "0");
              }}
              onChange={handlePincode}
              error={pinCodeError}
              helperText={pinCodeError ? "Field must contain 6 Digits" : ""}
            />
          </Box>
          <TextField onChange={handleOwnerName} error={ownerNameError} helperText={ownerNameError ? "Field must not be empty" : ""} sx={{ mt: 2 }} fullWidth label="Owner Name" />
          <Box
            sx={{ display: "flex", justifyContent: "space-between,", mt: 2 }}
          >
            <TextField
              sx={{ width: "50%", mr: 2 }}
              label="Owner Email"
              onChange={handleOwnerEmail}
              error={ownerEmailError}
              helperText={ownerEmailError ? "Invalid Email" : ""}
            />
            <TextField
              type="text"
              name="mobileNumber"
              sx={{ width: "50%" }}
              label="Owner Contact"
              inputProps={{maxLength:10}}
              onInput={(e) => {
                e.target.value = e.target.value
                  .replace(/[^0-9.]/g, "")
                  .replace(/(\..*?)\..*/g, "$1")
                  .replace(/^0[^.]/, "0");
              }}
              onChange={handleOwnerContact}
              error={ownerContactError}
              helperText={ownerContactError ? "Field must contain 10 Digits" : ""}
            />
          </Box>
          <Button
            sx={{ mt: 2, py: 1, background: pallete.blue }}
            variant="contained"
            fullWidth
            onClick={handleSubmit}
          >
            Submit Details
          </Button>
          <Box sx={{pt:2,textAlign:'center'}}>
          Already Registered,
          <a href="/org/login">Sign In</a>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image alt="" src={CourierRegisterImg} />
      </Box>
    </Box>
    </Box>
    
  );
}

export default CompanyRegisterForm;
