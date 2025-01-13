const mongoose = require('mongoose')

const chatSchema=mongoose.Schema({
    sender:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    receiver:{type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    message:{type:String, required:true},
    createdAt:{type:Date, default:Date.now}, 
})

const chatModel=mongoose.model('chat',chatSchema)

module.exports=chatModel