import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'
import userModel from '../model/userModel.js'
import jwt from 'jsonwebtoken'
//Api for register the user

const registerUser = async (req,res)=>{
   
    try {
         const {name,email,password} = req.body
    if(!name || !email || !password)
    {
        res.json({
            success:false,message:"Missing Required Fields"
        })
    }
    if(!validator.isEmail(email))
    {
         res.json({
            success:false,message:"Invalid Email"
        })
    }
    if(password.length<8)
    {
         res.json({
            success:false,message:"Please Enter a strong password"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)
    const data = {
        name,email,
        password:hashedPassword
    }

    const newUser = new userModel(data)
    const user = await newUser.save()

    const payload = {id:user._id}
    const token = jwt.sign(payload,process.env.JWT_SECRET);
    res.json({
        success:true,token
    })
    } catch (error) {
        console.log(error.message)
        res.json({
            success:false,message:error.message
        })
    }



}


//api for user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "Missing Required Fields" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    const user = await userModel.findOne({ email });  // FIXED
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.json({ success: false, message: "Incorrect Password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};



export {registerUser,loginUser}