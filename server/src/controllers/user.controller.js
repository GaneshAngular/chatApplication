const chatModel = require("../models/chat.model");
const userModel = require("../models/user.model");
const cloudinary = require("../services/cloudinary.service");
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
    } else {
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
  token = token.split(" ")[1]
  //  console.log(token);

  const email = token ? verifyToken(token).email : ""

  try {
    const user = await userModel.findOne({ email: email })


    const userId = user._id
    const chats = await chatModel.find({
      $or: [
        { sender: userId },
        { receiver: userId }
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
    let contacts = await userModel.find({
      _id: { $in: Array.from(contactIds) }
    });
    contacts.push(user)

    return res.json(contacts);
  } catch (error) {
    console.error('Error finding contacts:', error);
    return res.status(500).json({ message: 'Error fetching contacts' });
  }

}

const sendMessage = async (req, res) => {
  let token = req.headers?.authorization;
  token = token.split(" ")[1]

  const email = verifyToken(token).email
  const { message, receiver } = req.body
  try {

    const user = await userModel.findOne({ email: email })
    const userId = user._id
    const msg = await chatModel.create({
      message: message,
      sender: userId,
      receiver: receiver
    })


  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: "Something went wrong" })
  }
  return res.json({ message: "message sent" })
}

const getMessages = async (req, res) => {
  let token = req.headers?.authorization;
  token = token.split(" ")[1]
  const email = verifyToken(token).email
  let chats = []
  try {
    const user = await userModel.findOne({ email: email })
    const userId = user._id
    const reciever = req.query.id;

    chats = await chatModel.find({
      $or: [
        { sender: userId, receiver: reciever },
        { sender: reciever, receiver: userId }
      ]
    }).sort({ createdAt: 1 });
  } catch (error) {
    console.log("1", error);

    return res.status(500).json({ message: 'Error fetching messages' });
  }
  return res.json(chats)

}

const getUsersById = async (req, res) => {
  try {
    const id = req.query.id
    const user = await userModel.findById(id)
    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }
    return res.json(user)
  } catch (error) {
    console.log("1", error);
    return res.status(500).json({ message: "server error" })
  }
}

const getProfile = async (req, res) => {
  let token = req.headers?.authorization;
  token = token.split(" ")[1]
  const email = verifyToken(token).email
  try {

    const user = await userModel.findOne({ email: email })
    return res.json(user)
  } catch (error) {
    return res.status(500).json({ message: "somethng error " })
  }
}
const updateProfileImage = async (req, res) => {
  console.log("fdfdfbdkfbjkb");

  let token = req.headers?.authorization
  token = token.split(" ")[1]
  const email = verifyToken(token).email


  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "chatApp-profile",
      })

      console.log(result.secure_url);

      const updatedData = await userModel.updateOne({ email: email }, { $set: { profile: result.secure_url } })
      if (updatedData) {
        return res.json({ message: "Profile updated successfully" })
      } else {
        return res.json({ message: "Profile not updated " })
      }
    }
  } catch (error) {
    console.log("1", error);

    return res.status(500).json({ message: "some thing error" })
  }

}
const updatePersonalDetails = async (req, res) => {
   const {name,about}=req.body
  let token = req.headers?.authorization
  token = token.split(" ")[1]
   try {
    
  
  const email = verifyToken(token).email

  const updatedData = await userModel.updateOne({ email: email }, { $set: { name,about } })
  if (updatedData) {
    return res.json({ message: "Profile details updated successfully" })
  } else {
    return res.json({ message: "Profile details not updated " })
  }
} catch (error) {
  return res.json({ message: "Profile details not updated " })
}


}

module.exports = {
  getUsers,
  getContacts,
  sendMessage,
  getMessages,
  getProfile,
  getUsersById,
  updatePersonalDetails,
  updateProfileImage
}