import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
function Registration() {
  const Navigate=useNavigate();
  const [showpassword, setShowpassword] = useState(true);
  const [conformshowpassword, setConformShowpassword] = useState(true);
  const [rollno, setRollno] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformpassword, setConformPassword] = useState("");
  const [phno, setPhno] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");


  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handsubmit = async (event) => {
    
    try {
      event.preventDefault();
      axios.defaults.withCredentials=true;
      if(!validateEmail(email))
      {
        toast.error("please enter a valid email");
        return;
      }
      if (password !== conformpassword) {
        console.log("password not same");
        toast.error("Password not same");
        return;
      }
      const user = {
        rollNo: rollno,
        name: name,
        start_year: year,
        email: email,
        password: password,
        phno: phno,
        branch: branch,
      };
      console.log(user);
      const result = await axios.post(
        'http://localhost:3001/api/authstudent/register',
        user,{withCredentials: true}
      );
      console.log("user register succesfully",result.data);
      toast.success(result.data.message);
      const otp=await axios.post('http://localhost:3001/api/authstudent/otpSend');
      console.log("otpsend",otp.data);
      toast.success(otp.data.message);
      setTimeout(() => {
        Navigate("/otp");
      }, 2000);
      
    } catch (error) {
      if (error.response) {
        // Display error message from backend
        toast.error(error.response.data.message);
      } else {
        // Handle unexpected errors
        toast.error("Something went wrong. Please try again.");
      }
      console.log("Error occurred in registration:", error);
    }
    
    
  };

  return (
    <div
      className="registration"
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
        <form
          style={{
            borderTopLeftRadius: " 20px",
            borderBottomLeftRadius: "20px",
          }}
        >
          <h1>Sign Up</h1>
          <div className="box">
            <label>
              <input
                type="text"
                placeholder="Roll No"
                value={rollno}
                onChange={(e) => setRollno(e.target.value)}
              />

              <CgProfile className="icon" />
            </label>
            <label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <CgProfile className="icon" />
            </label>
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
                placeholder="password"
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
            <label>
              <input
                type={conformshowpassword ? "password" : "text"}
                placeholder="Conform password"
                value={conformpassword}
                onChange={(e) => setConformPassword(e.target.value)}
              />
              <span
                onClick={() => setConformShowpassword(!conformshowpassword)}
              >
                {conformshowpassword ? (
                  <IoEyeOff className="icon" />
                ) : (
                  <FaEye className="icon" />
                )}
              </span>
            </label>
            <label>
              <input
                type="text"
                placeholder="Telephone"
                value={phno}
                onChange={(e) => setPhno(e.target.value)}
              />
              <span>
                <BsFillTelephoneFill className="icon" />
              </span>
            </label>
            <label className="branch">
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                <option value="">Select_Branch</option>
                <option value="CSE">CSE</option>
                <option value="CSM">CSM</option>
                <option value="ECE">ECE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
              </select>
              <input
                type="text"
                placeholder="Academic_year"
                className="Academic"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </label>
          </div>

          <span></span>

          <button onClick={handsubmit}>submit</button>
        </form>
        <div
          className="photo"
          style={{
            backgroundImage: "url('/images/download3.avif')", // Use public folder absolute path
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderTopRightRadius: " 20px",
            borderBottomRightRadius: "20px",
          }}
        ></div>
         <ToastContainer /> 
      </div>
    </div>
  );
}

export default Registration;
