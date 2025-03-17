import React, { useState } from 'react'
import { MdMail } from "react-icons/md";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
function Mail() {
  const Navigate=useNavigate();
  const [email,setEmail]=useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handmail=async(event)=>{
    axios.defaults.withCredentials=true;
    try {
      event.preventDefault();
      if(!validateEmail(email))
      {
        toast.error("please enter a valid email");
        return;
      }
      const result = await axios.post(
        'http://localhost:3001/api/authstudent/resendOtp',
        {
          email:email
        },{withCredentials: true}
      );
      toast.success(result.data.message);
      setTimeout(()=>{
        Navigate("/resetpassword",{state:{email}});
      },2000)
    } catch (error) {
      if (error.response) {
        // Display error message from backend
        toast.error(error.response.data.message);
      } else {
        // Handle unexpected errors
        toast.error("Something went wrong. Please try again.");
      }
      console.log("Error occurred login:", error);
    }
  }
  return (
    <div className='mail'
        style={{
            backgroundImage: "url('/images/bg5.avif')", // Use public folder absolute path
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        }}
    >
      <div class="mail_box">
        <h1>Reset Password</h1>

        <label>
            <input type="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <span><MdMail className='icon' /></span>
        </label>
        
        <button onClick={handmail}>Submit</button>
        <ToastContainer />  
      </div>
    </div>
  )
}

export default Mail
