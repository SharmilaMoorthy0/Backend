const mongoose=require("mongoose")

const Contactschema= mongoose.Schema({
     name:{type:String,requried:true},
     Email:{type:String,requried:true},
     message:{type:String,requried:true}
},
{
     timestamps:true,
     versionKey:false
 })
const Contact =mongoose.model('Contact',Contactschema)

module.exports =Contact