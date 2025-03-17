import React, { useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate ,useLocation} from "react-router-dom";
import { ToastContainer,toast } from "react-toastify";
import axios from "axios";
function Resetpassword() {
  const location=useLocation();
  const email=location.state?.email;
  const Navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(true);
  const handreset = async (event) => {
    axios.defaults.withCredentials = true;
    try {
      console.log(email);
      event.preventDefault();
      const result = await axios.post(
        "http://localhost:3001/api/authstudent/resetPassword",
        {
          email:email,
          otp:otp,
          password: password
        },
        { withCredentials: true }
      );
      toast.success(result.data.message);
      console.log("password reset completed");

      setTimeout(()=>{
        Navigate("/");
      },2000);
    } catch (error) {
      if (error.response) {
        // Display error message from backend
        toast.error(error.response.data.message);
      } else {
        // Handle unexpected errors
        toast.error("Something went wrong. Please try again.");
      }
      console.log("Error occurred reset password:", error);
    }
  };

  return (
    <div
      className="resetpassword"
      style={{
        backgroundImage: "url('/images/bg5.avif')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div class="mail_box">
        <h1>New Password</h1>

        <label>
          <input
            type="text"
            placeholder="Enter otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <span><RiLockPasswordFill className='icon'/></span>
        </label>
        <label>
          <input
            type={showpassword ? "password" : "text"}
            placeholder="New Password"
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

        <button onClick={handreset}>Submit</button>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default Resetpassword;
