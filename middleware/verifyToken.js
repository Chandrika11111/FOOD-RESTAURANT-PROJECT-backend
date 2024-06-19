const Vendor =require('../models/Vendor');
const jwt=require('jsonwebtoken');
 const dotENV=require('dotenv');
 dotENV.config();
 const SecretKey=process.env.AnySecret;
const verifyToken=async(req,res,next)=>{
    const token =req.headers.token;
    if(!token){
        res.status(400).json({message:"token not found"})
    }
    try {
        const decoded= jwt.verify(token, SecretKey);
        const vendor=await Vendor.findById(decoded.vendorId);
        if(!vendor){
          res.status(400).json({message:'vendor not found'})
        }
        req.vendorId=vendor._id;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({error:" token server error"})
    }
   
}
module.exports=verifyToken;