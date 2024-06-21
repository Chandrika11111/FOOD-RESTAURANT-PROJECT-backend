
const Firm=require('../models/Firm');
const multer=require('multer');
const Vendor = require('../models/Vendor');
const path=require('path')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});
const upload = multer({ storage: storage });
const addfirm=async(req,res)=>{
    try{
    const {firmName,area,category,region,offer}=req.body;
    const image=req.file?req.file.fileName:undefined;
    const vendor=await Vendor.findById(req.vendorId);
    if(!vendor){
        res.status(400).json({message:'vendor not found'})
    }
    const firm=new Firm({
        firmName,area,category,region,offer, image,vendor:vendor._id
    });
    const savedfirm=await firm.save();
    vendor.firm.push(savedfirm);
    await vendor.save();
    res.status(200).json({message:"firm added successfully"})
   }catch(error){
     console.log(error);
     res.status(500).json({error:"server error"});
   }
}
const deleteFirmById=async(req,res)=>{
    try {
        const firmId=req.params.firmId;
        const deletedFirm=await Firm.findByIdAndDelete(firmId);
        if(!deletedFirm){
            res.status(404).json({error:"record not found"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"server error"});
    }
}
module.exports={addfirm :[upload.single('image'),addfirm],deleteFirmById}