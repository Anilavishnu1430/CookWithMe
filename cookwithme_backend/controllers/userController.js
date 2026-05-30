const users = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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
            //password encryption
            const encryptedPassword = await bcrypt.hash(password,10)
            const newUser = new users({username,email,password:encryptedPassword})

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
            const userPassword = await bcrypt.compare(password,existingUser.password)
           if(existingUser.password===password || userPassword){
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

//Get All Users
exports.getAllUsers=async(req,res)=>{
    console.log("Inside the get All Users");
    try{
        const getAllUsers = await users.find({role:{$nin: ["admin"]}})
        res.status(200).json({ message:"All Users fetched",getAllUsers })
    }
    catch(err){
        res.status(500).json({ message:"server err "+err })
    }
}

//Update User profile
exports.updateProfile = async (req, res) => {
    console.log("Inside Update Profile");
    try {
        const userId = req.payload;
        const {image} = req.body
        const updatedUser = await users.findByIdAndUpdate( userId, { image}, { new: true });

        res.status(200).json({ message: "Profile picture updated", updatedUser});

    } catch (err) {
        res.status(500).json({ message: "server err "+err });
    }
}

//get profile
exports.getProfile = async(req,res)=>{
    try{
        const userId = req.payload
        const user = await users.findById(userId)
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json({ message: "server err "+err })
    }
}