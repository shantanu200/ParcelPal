import { Alert, Box, Button, TextField } from '@mui/material';
import {useState} from 'react'
import { useEmail, useOTP } from '../../hooks/useNumberInput';
import pallete from '../../utils/color';
import styled from '@emotion/styled';
import CompanyLoginImg from "../../images/LoginCompany.jpg";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Image = styled.img`
  min-width: "20rem";
  width: 100%;
`

function CompanyLogin() {
  const navigate = useNavigate();
  const [email,handleEmail,emailError] = useEmail("");
  const [otp,handleChangeOTP,otpError] = useOTP("");
  const [isOTPSend,setotpSend] = useState(false);
  const [errorMsg,setErrorMsg] = useState("");
  const [isValid,setIsValid] = useState(true);
  
  const handleOTP = async () => {
    if(isOTPSend){
      try{
       
       const {data} = await axios.post(`/company/login`,{email,otp});
       
       if(data){
        localStorage.setItem("comp",JSON.stringify(data?.comp));
        navigate(`/orgdetails/${data?.comp?._id}`)
       }
      }catch(error){
      setIsValid(false);
      setErrorMsg(error?.response?.data?.msg);
      }
    }else{
    try{
      setIsValid(true);
      const {data} = await axios.post(`/company/sendOTP`,{email});
      
      if(data){
        setotpSend(true);
      }
    }catch(error){
      setIsValid(false);
      setotpSend(false);
      setErrorMsg(error?.response?.data?.msg);
    }
    }
  }                                       
  return (
    <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",}}>
    {!isValid && <Alert sx={{width:"30%",my:2}} variant='filled' severity='error'>{errorMsg}</Alert>}
    <Box  sx={{width:"30%",background:"white",p:2,borderRadius:'5px',boxShadow: "-4px -3px 45px 21px rgba(0,0,0,0.35)"}}  >
      <Box>
        <Image alt='' src={CompanyLoginImg} />
      </Box>
      <Box>
       <Box sx={{borderBottom:"2px solid black",py:1}}>
        <h2>Welcome Back!</h2>
       </Box>
       <Box>
        <TextField onChange={handleEmail} disabled={isOTPSend} error={emailError} helperText={emailError ? "Invalid Email is Entered" : ""} variant='outlined' label="Email" fullWidth sx={{mt:2}} />
        {(isOTPSend && isValid) && <TextField inputProps={{maxLength:6}} label="Valid OTP" fullWidth sx={{mt:2}} onChange={handleChangeOTP} error={otpError} helperText={otpError ? "OTP must contain 6 characters" : ""}  />}
        <Button variant='contained' onClick={handleOTP} fullWidth sx={{mt:2,background:pallete.blue}} disabled={emailError}>Send OTP</Button>
       </Box>
       <Box sx={{p:2,textAlign:"center"}}>New Organization,<a href='/org/register' style={{textDecoration:"none"}}> Sign Up</a></Box>
      </Box>
    </Box>
    </Box>
    
  )
}

export default CompanyLogin;