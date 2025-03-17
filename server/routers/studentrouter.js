import express from 'express'
import { is_Authenticated, login, logout, otp_Send, register, resendOtp, resetpassword, verify_Email } from '../controllers/authstudent.js'
import userAuth from '../middleware/userauth.js'

const studentrouter=express.Router()

studentrouter.post('/register',register)
studentrouter.post('/login',login)
studentrouter.post('/logout',logout)
studentrouter.post('/otpSend',userAuth,otp_Send)
studentrouter.post('/verifyEmail',userAuth,verify_Email)
studentrouter.post('/is_Auth',userAuth,is_Authenticated)
studentrouter.post('/resendOtp',userAuth,resendOtp)
studentrouter.post('/resetPassword',userAuth,resetpassword)
export default studentrouter;

