import express from 'express'
import studentmodel from '../models/student.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import transporter from '../nodemail.js'


export const register=async(req,res)=>{
    const {name,rollNo,start_year,email,password,phno,branch}=req.body;
    if(!name || !rollNo || !start_year || !email || !password || !phno || !branch)
    {
        return res.status(401).send({message:"required data was missing"})
    }

    try {
        const studentId =await studentmodel.findOne({rollNo});

        if(studentId)
        {
            return res.status(400).send({message:"RollNo is alreay exist"});
        }
        const user =await studentmodel.findOne({email});
        if(user)
        {
            return res.status(400).send({message:"mail is alreay exist"});
        }

        const hashpassword=await bcrypt.hash(password,10);
        
        const newstudent={
            name,email,rollNo,start_year,
            password:hashpassword,
            phno,branch
        }

        const User=new studentmodel(newstudent);
        await User.save();

        const token=jwt.sign({id:User._id},process.env.SECRET_KEY,{expiresIn:'7d'})

        res.cookie('token',token ,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production'?'none':'strict',
            maxAge :7*24*60*60*1000
        })

        const verificationMail={
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"welcome to JNTU sulthanpur",
            text:`Welcome to JNTU sulthanpur your account has been created by email id ${email}`
        }

        await transporter.sendMail(verificationMail);

        return res.status(201).send({message:"register succesfullly"})
        
    } catch (error) {
        console.error({message:"error occur in signup",error})
    }
    
    
}


export const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password)
    {
        return res.status(505).send({message:"Data missing"});
    }
    try {
        
        const user=await studentmodel.findOne({email});
        if(!user)
        {
            return res.status(400).send({message:"email not exist"});
        }

        const check=await bcrypt.compare(password,user.password);
        if(!check)
        {
            return res.status(404).send({message:"password is incorrect"});
        }

        const token=jwt.sign({id:user._id},process.env.SECRET_KEY,{expiresIn:'7d'})

        res.cookie('token',token ,{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production'?'none':'strict',
            maxAge :7*24*60*60*1000
        })

        return res.status(200).send({message:"Login succesfully"});


    } catch (error) {
        console.error({message:"error in login_page",error});
        console.log("error in login page")
        return res.status(400).send({message:"error occur in login"})
    }
}

export const logout=async(req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production'?'none':'strict'
        })

        return res.status(200).send({message:"logout succesfully"})
    } catch (error) {
        console.error({message:"error in login_page",error});
    }
}

export const otp_Send=async(req,res)=>{
    const {USER_ID}=req.body;
        
    const user=await studentmodel.findById(USER_ID);
    console.log({user});
    if(!user)
    {
        return res.status(400).send({message:"User Not found"})
    }
    try {
        
        if(user.user_verify)
        {
            return res.status(200).send({message:"account is already verified"})
        }

        const otp=String(Math.floor(10000+Math.random()*90000))

        const email=user.email;

        user.optsend=otp;
        user.otp_expiry_time=Date.now()+5*60*1000;

        await user.save();

        const otpEmail={
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"Account verification OTP",
            text:`your otp is ${otp} . verify your account using this OTP`
        }

        await transporter.sendMail(otpEmail);

        return res.status(200).send({message:"otp send to email succesfully"});

    } catch (error) {
        console.error(error.message)
        return res.status(404).send({message:"error at otp_send",error})
    }
}

export const verify_Email=async(req,res)=>{

    try {
        const {USER_ID,OTP}=req.body;

        const user=await studentmodel.findById(USER_ID)
        
        console.log(user);
        
        if(!user)
        {
            return res.status(400).send({message:"User not found"})
        }

        if(user.optsend="" || user.optsend!==OTP)
        {
            console.log(user.optsend,OTP);
            return res.status(400).send({message:"OTP not valid"})
        }
        if(user.otp_expiry_time<Date.now())
        {
            return res.status(401).send({message:"OTP Expired"});
        }

        user.user_verify=true;
        user.optsend="";
        user.otp_expiry_time=0;
        await user.save();

        return res.status(200).send({message:"Email Verified"});

    } catch (error) {
        return res.status(400).send({message:"error in verify_Email",error});
    }
}

export const is_Authenticated=async(req,res)=>{
    try {
        return res.status(200).send({success:true});
    } catch (error) {
        return res.status(400).send({message:error.message});
    }
}

export const resendOtp=async(req,res)=>{
    const {email}=req.body
    if(!email)
    {
        return res.status(400).send({message:"Please enter email"})
    }
    try {
        const user =await studentmodel.findOne({email})
        if(!user)
        {
            return res.status(401).send({message:"user not found"})
        }
        const otp=String(Math.floor(10000+Math.random()*90000));
        user.resendotp=otp;
        user.resend_otp_expiry_time=Date.now()+10*60*1000;
        await user.save();

        const resend_email={
            from:process.env.SENDER_EMAIL,
            to:email,
            subject:"reset password",
            text:`verification otp ${otp},used to reset password`
        }

        await transporter.sendMail(resend_email);

        return res.status(200).send({message:"otp send to your email succesfully"})

    } catch (error) {
        console.log(error);
        return res.status(404).send({message:"error at resendOtp",error})
        
    }
}

export const resetpassword=async(req,res)=>{
    const{email,otp,password}=req.body

    if(!email || !otp || !password)
    {
        return res.status(404).send({message:"Data missing"})
    }
    try {
        
        const user=await studentmodel.findOne({email});
        if(!user)
        {
            return res.status(404).send({message:"user not found"})
        }
        if(user.resendotp=="" || user.resendotp!==otp)
        {
            return res.status(401).send({message:"otp incorrect"})
        }
        if(user.resend_otp_expiry_time<Date.now())
        {
            return res.status(402).send({message:"otp expired"})
        }


        const hashpassword=await bcrypt.hash(password,10)

        user.password=hashpassword
        user.resendotp=""
        user.resend_otp_expiry_time=0
        await user.save()
        return res.status(200).send({message:"password reset succesfully"});

    } catch (error) {
        return res.send(400).send({message:"error in passreset",error})
    }
}

export const delete_unverify_students=async(req,res)=>{

    try {
        const currentTime=Date.now();
        const verify=await studentmodel.deleteMany({
            user_verify:false,
            otp_expiry_time :{$lt :currentTime}
        });
        return res.status(400).send({message:"Unverified students deleted"});
    } catch (error) {
        console.log(error.data)
        return res.status(401).send({message:"error occur in delete unverified student deletion",error});
        
    }

}
