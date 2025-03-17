import React, { useState } from 'react'
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import axios from 'axios'
function Otp() {
  const Navigate=useNavigate();
  const [otp,setOtp]=useState("");

  const handOtp=async(event)=>{
    axios.defaults.withCredentials=true;
    try {
      event.preventDefault();
      if(otp==="")
      {
        toast.error("Please enter otp");
        return;
      }
      const result = await axios.post(
        'http://localhost:3001/api/authstudent/verifyEmail',
        {
          OTP:otp
        }
        ,{withCredentials: true}
      );
      console.log(result.data);
      toast.success(result.data.message);
      console.log("email verified");
      setTimeout(() => {
        Navigate("/");
      }, 2000);
    } catch (error) {
      if (error.response) {
        // Display error message from backend
        toast.error(error.response.data.message);
      } else {
        // Handle unexpected errors
        toast.error("Something went wrong. Please try again.");
      }
      console.log("Error occurred in otp:", error);
    }
    
  }
  return (
    <div className='otp'
            style={{
                backgroundImage: "url('/images/bg5.avif')", // Use public folder absolute path
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            }}
        >
          <div class="mail_box">
            <h1>Enter OTP</h1>
    
            <label>
                <input type="text" placeholder='Enter Otp' value={otp} onChange={(e)=>setOtp(e.target.value)}/>
                <span><RiLockPasswordFill className='icon'/></span>
            </label>
            
            <button onClick={handOtp}>Submit</button>
            <ToastContainer/>
          </div>
          
        </div>
  )
}

export default Otp
