import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import {  Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import axios from 'axios';
function Login() {
  const Navigate=useNavigate();
  const [showpassword, setShowpassword] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  

const handlogin=async(event)=>{
      axios.defaults.withCredentials=true;
      if(!validateEmail(email))
      {
        toast.error("please enter valid email");
        return;
      }
      try {
        event.preventDefault();
        
        const result = await axios.post(
          'http://localhost:3001/api/authstudent/login',
          {
            email:email,
            password:password
          }
          ,{withCredentials: true}
        );
        console.log("login succesful");
        toast.success(result.data.message);
        setTimeout(()=>{
          Navigate("/main");
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
    <div
      className="login"
      style={{
        width: "100%",
        height: "100%",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('/images/bg5.avif')", // Use public folder absolute path
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="page">
        <div
          className="photo"
          style={{
            backgroundImage: "url('/images/download3.avif')", // Use public folder absolute path
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderTopLeftRadius: " 20px",
            borderBottomLeftRadius: "20px",
          }}
        ></div>

        <form
          style={{
            borderTopRightRadius: " 20px",
            borderBottomRightRadius: "20px",
          }}
        >
          <h1>Sign In</h1>

          <label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <CgProfile className="icon" />
          </label>
          <label>
            <input
              type={showpassword ? "password" : "text"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowpassword(!showpassword)}>
              {showpassword ? (
                <IoEyeOff className="icon" />
              ) : (
                <FaEye className="icon" />
              )}
            </span>
          </label>
          <span></span>
          <label className="forgot">
            <Link to="/mail">forgot password ?</Link>
          </label>
          <button onClick={handlogin}>Log in</button>
          <label className="go_to_signUp">
            Dont have an account ? <Link to="/register">Sign Up</Link>
          </label>
          <ToastContainer/>
        </form>
      </div>
    </div>
  );
}

export default Login;
