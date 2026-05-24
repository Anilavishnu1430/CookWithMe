const users = require('../models/userModel');
const jwt = require('jsonwebtoken')

//Register Logic implemented
exports.registerUser=async(req,res)=>{
    console.log("Inside Register Function",req.body)
    const {username,email,password}=req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(401).json({message:"User Already Existing..."})
        }
        else{
            const newUser = new users({username,email,password})
            await newUser.save()
            res.status(201).json({message:"User Registered Successfully...",newUser})
        }
    }
    catch(err){
        res.status(500).json({message :"Server err",err})
    }
}

//Login Logic Implimented
exports.loginUser=async(req,res)=>{
    console.log("Inside Login Function",req.body)
    const {email,password}=req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
           if(existingUser.password===password){
            const token = jwt.sign({userMail:existingUser.email,userId:existingUser._id},process.env.JWT_SECRET)
                console.log(token);
                res.status(200).json({message:"Login Successfull..",existingUser,token})
           }
           else{
                res.status(401).json({message:"Password Mismatch"})
           }
        }
        else{
            res.status(401).json({message:"User Not Found"})
        }
    }
    catch(err){
        res.status(500).json({message :"Server err",err})
    }
}