
import bcryptjs from "bcryptjs";

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie,generateResetPasswordToken } from "../utils/generateTokenAndSetCookies.js";
import { sendVerificationEmail,sendForgotPasswordEmail,sendResetSuccessEmail } from "../mailtrap/email.js";
import { sendWelcomeEmail } from "../mailtrap/email.js";

export const signup = async (req, res) => {
  const { email, name, password } = req.body;
  console.log(email)

  try {
    if (!email || !password || !name){
      return res.status(400).json({success:false,message:"All fields are required"})
    }

    const userAlreadyExits = await User.findOne({ email });
 

    if (userAlreadyExits) {
      return res.status(400).json({ success: false, message: "User email id already exists" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(
      1000 + Math.random() * 900000
    ).toString();

    const user = new User({
      email,
      password: hashPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id);

    await sendVerificationEmail(user.email,verificationToken);


    res.status(201).json({
      success: true,
      message: "User created succesfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async(req,res)=>{
  const {code} = req.body;
  console.log(code)
  try {
    const user = await User.findOne({
      verificationToken:code,
      verificationTokenExpiresAt: { $gt: Date.now() }
    })
   console.log(user)
    if(!user){
      return res.status(400).json({succeess:false,message:"Invaldi or expired verification code "})
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    await sendWelcomeEmail(user.email,user.name);
 res.status(200).json({
  succeess:true,
  message:"verified succesuuly",
  user:{
    ...User._doc,
    password:undefined,
  }
})
  } catch (error) {
    console.log("error verify email",error.message)
    
    res.status(400).json({message:"error sending verfy email"})
  }
}

export const logout = async (req, res) => {
  res.clearCookie("token")
  res.status(200).json({message:"logout successfully"})
};

export const login = async (req, res) => {
 const {email,password} = req.body;

 try {
  const user = await User.findOne({email});
  if(!user){
 return res.status(400).json({message:"User not found please signup"})
  }

  const isPasswordValid = await bcryptjs.compare(password,user.password)


  if(!isPasswordValid){
    return res.status(400).json({succeess:false,message:"invalid password"})
  }


  generateTokenAndSetCookie(res,user._id);

  user.lastLogin = new Date();

  await user.save();

  res.status(200).json({
    success:true,
    message:"Login in successfully",
    user:{
      ...user._doc,
      password:undefined,
    },
  })




 } catch (error) {
console.log("error in login")
res.status(400).json({success:false,message:error.message})
 }
};

export const forgotPassword = async (req,res)=>{
  const {email} = req.body;
  
  try {
    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({succeess:false,message:"Email id not registred"})
    }

 const resetToken= await bcryptjs.hash("helloworlds123", 10);
const resetPasswordTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;


console.log("resetToken",resetToken)
 user.resetPasswordToken = resetToken;
 user.resetPasswordExpiresAt= resetPasswordTokenExpiresAt;

 await user.save();
 sendForgotPasswordEmail(email,resetToken);


 res.status(200).json({
  success:true,
  message:"resetPasswordSavedsuccesfuuly",
})



  } catch (error) {
    console.log("error in forgot password")
    res.status(400).json({succeess:false,message:error.message})
  }
}

export const forgotPasswordToken = async(req,res)=>{
  const resetToken = req.params.token;

  const {newPassword,confirmPassword} = req.body;
  console.log(newPassword)
  console.log(confirmPassword)
  if(!(newPassword===confirmPassword) || !newPassword || !confirmPassword){
return res.status(400).json({success:false,message:"password not match"})
  }

  console.log(resetToken)

  try {
    const user = await User.findOne({resetPasswordToken:resetToken,resetPasswordExpiresAt: { $gt: Date.now() },});

    if(!user){
      return res.status(400).json({succeess:false,message:"token not found"})
    }

    const hashPassword = await bcryptjs.hash(confirmPassword, 10);

    user.password = hashPassword;
    user.resetPasswordToken = undefined;
		user.resetPasswordExpiresAt = undefined;
    await user.save();

    sendResetSuccessEmail(user.email);

    res.status(200).json({
      success:true,
      message:"reset Password succesfullly",
    })
  } catch (error) {
    console.log("erroe reset password " ,error.message)
    res.status(400).json({succeess:false,message:error.message})
  }

}


export const checkAuth = async (req, res) => {
	try {
		const user = await User.findById(req.userId).select("-password");
		if (!user) {
			return res.status(400).json({ success: false, message: "User not found" });
		}

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.log("Error in checkAuth ", error);
		res.status(400).json({ success: false, message: error.message });
	}
};


