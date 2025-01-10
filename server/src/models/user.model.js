const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
  name:{type:String, required:true},
  email:{type:String.prototype,required:true},
  mobile:{type:String, required:true},
  // profile:{type:string, required:true},
  about:{type:String},
})

const userModel=mongoose.model('user',userSchema)

module.exports=userModel;