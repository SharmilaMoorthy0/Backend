const mongoose=require("mongoose")

const cartschema= mongoose.Schema({
    productName:{type:String,requried:true},
     Description:{type:String,requried:true},
     Price:{type:Number,requried:true},
     Rating:{type:Number,requried:true},
     Image:{type:String,requried:true},
     Offerprice:{type:Number,requried:true},
     client:{type:mongoose.Types.ObjectId,ref:'User'}
    
},{
    timestamps:true,
    versionKey:false
}
)
const Cart=mongoose.model('Cart',cartschema)

module.exports = Cart