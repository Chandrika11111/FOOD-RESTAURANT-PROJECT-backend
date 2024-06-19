const express=require('express');
const dotENV=require('dotenv');
const mongoose=require('mongoose');
const venderRoutes=require('./routes/vendorRoutes');
const bodyparser=require('body-parser');
const firmRoutes=require('./routes/firmRoutes');
const productRoutes=require('./routes/productRoutes');
const path=require('path')
const app=express();
dotENV.config();
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log("MongoDB connected successfully!!"))
.catch((err)=>console.log("Error:",err))
const PORT=4000;
app.use(bodyparser.json());
app.use('/vendor',venderRoutes);
app.use('/firm',firmRoutes);
app.use('/product',productRoutes);
app.use('/uploads', express.static('uploads'));
app.get("/home",(req,res)=>{
    res.send("<h1> welcome to Taste Heaven")
})
app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`);
})