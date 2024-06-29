const mongoose=require("mongoose")

const productschema= mongoose.Schema({
    productName:{type:String,requried:true},
    Description:{type:String,requried:true},
    Rating:{type:Number,requried:true},
    Offerprice:{type:Number,requried:true},
    Price:{type:Number,requried:true},
    Image:{type:String,requried:true}
    
},{
    timestamps:true,
    versionKey:false
}
)
const Plants=mongoose.model('Plants',productschema)

module.exports = Plants
