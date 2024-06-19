const vendorController=require('../cotrollers/vendorController');
const express=require('express');
const router=express.Router();
router.post('/register',vendorController.vendorRegister);
router.post('/login',vendorController.vendorLogin);
router.get('/allVendors',vendorController.allVendors);
router.get('/singlevendor/:id',vendorController.singleVendor);
module.exports=router;