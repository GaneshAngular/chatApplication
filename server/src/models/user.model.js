const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
  name:{type:String, required:true},
  email:{type:String.prototype,required:true,unique:true},
  mobile:{type:String, required:true,unique:true},
  // profile:{type:string, required:true},
  about:{type:String},
})

const userModel=mongoose.model('user',userSchema)

module.exports=userModel;