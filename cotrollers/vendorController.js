const Vendor=require('../models/Vendor');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotENV=require('dotenv');
dotENV.config();
const SecretKey=process.env.AnySecret;
 
const vendorRegister=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
    const vendorEmail=await Vendor.findOne({email});
    if(vendorEmail){
        return res.status(400).json("email already taken");
    }
    const hashedPassword=await bcrypt.hash(password,10);
    const NewVendor=new Vendor({username,email,password:hashedPassword})
    await NewVendor.save()
    res.status(200).json({message:" Vendor Registered successfully!"})
    console.log("Reistered")
    }catch(error){
        console.log(error)
        res.status(500).json({error:"server errorr"})
    }
}
const vendorLogin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const vendor=await Vendor.findOne({email});
        if(!vendor || !(await bcrypt.compare(password,vendor.password) )){
             return res.status(400).json({message:"Invalid username or password"});
        }
        const token= jwt.sign({vendorId:vendor._id},SecretKey,{expiresIn:"1h"})
        res.status(200).json({message:"Login successfull!!" ,token});
        console.log(email ,token);
    }catch(error){
        console.log(error)
        res.status(500).json({Error:"server error"})
  }
}
const allVendors=async(req,res)=>{
    try {
        const vendors=await Vendor.find().populate('firm');
        res.json({vendors})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"server error"})
    }
}
const singleVendor=async(req,res)=>{
    const vendorId=req.params.id;
    try {
        const vendor=await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            res.status(400).json({error:"vendor not found"});
        }
        res.status(200).json({vendor});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"server error"})
    }
}
module.exports={vendorRegister ,vendorLogin,allVendors,singleVendor}