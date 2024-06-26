const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg','non-veg']
            }
        ]
    },
    image:{
       type:String
    },
    bestseller:{
        type:Boolean
    },
    description:{
        type:String
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'firm'
        }
    ]
})
module.exports=mongoose.model('Product',productSchema);