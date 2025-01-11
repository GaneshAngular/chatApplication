const chatModel = require("../models/chat.model");
const userModel = require("../models/user.model");
const { verifyToken } = require("../services/jwt.service");


const getUsers = async (req, res) => {
    const name = req.quary?.name
    let users = [];
    try {
        const pipeline = [];

        // If name is provided and not empty, use the $match stage
        if (name && name.trim() !== '') {
          pipeline.push({
            $match: {
              name: { $regex: name, $options: 'i' } // Case-insensitive search for 'name'
            }
          });
        }else{
            pipeline.push({ $match: {} });
        }
         users = await userModel.aggregate(pipeline);
        // users=await userModel.find({})
    } catch (error) {
        console.log(error);

    }
    return res.json(users)
}

const getContacts = async (req, res) => {
    let token = req.headers?.authorization;
     token=token.split(" ")[1]
    //  console.log(token);
     
    const email = token?verifyToken(token).email:""
   
    try{
         const user= await userModel.findOne({email:email})
     
         
         const userId=user._id
        const chats = await chatModel.find({
            $or: [
              { sender: userId},
              { receiver: userId}
            ]
          })
          .select('sender receiver') // Only return sender and receiver fields
          .exec();
      
          // Collect user IDs (excluding the current user) to form a unique list of contacts
          const contactIds = new Set();
          chats.forEach(chat => {
            if (chat.sender.toString() !== userId.toString()) {
              contactIds.add(chat.sender);
            }
            if (chat.receiver.toString() !== userId.toString()) {
              contactIds.add(chat.receiver);
            }
          });
      
          // Now, fetch the user details of the contacts
          const contacts = await userModel.find({
            _id: { $in: Array.from(contactIds) }
          });
           
              
          return  res.json(contacts);
        } catch (error) {
          console.error('Error finding contacts:', error);
           return res.status(500).json({ message: 'Error fetching contacts' });
        }

}

const sendMessage = async (req, res) => {
  let token = req.headers?.authorization;
     token=token.split(" ")[1]
     
     const email = verifyToken(token).email
     const { message, receiver } = req.body
     try {
       
       const user= await userModel.findOne({email:email})
       const userId=user._id
       const msg=await chatModel.create({
         message: message,
         sender: userId,
         receiver: receiver
        })
      

    } catch (error) {
      console.log(error);
      
         return res.status(500).json({ message:"Something went wrong"})
    }
  return  res.json( {message:"message sent"})
}

const getMessages = async (req, res) => {
    const token = req.headers['token']
    const email = verifyToken(token)
   try{ const user= await userModel.findOne({email:email})
    const userId=user._id
    const reciever=req.quary.reciever
 
    const chats = await chatModel.find({
        $or: [
          { sender: userId, receiver: reciever },
          { sender: reciever, receiver: userId }
        ]
      }).sort({ createdAt: 1 });
    }catch(error){
     return res.status(500).json({ message: 'Error fetching messages' }); 
     }
      return res.json(chats)
  
}

const getProfile=async(req,res)=>{
     const token = req.headers['token']
    const email = verifyToken(token)
    try {
        
        const user=await userModel.find({email:email})
    } catch (error) {
        return  res.status(500).json({message:"somethng error "})
    }
    return res.json({user:user})
}

module.exports = {
    getUsers,
    getContacts,
    sendMessage,
    getMessages,
    getProfile
}