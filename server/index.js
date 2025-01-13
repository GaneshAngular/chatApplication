const express = require('express')
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const authRouter = require('./src/routes/auth.route')
const session = require('express-session')
const userRouter = require('./src/routes/user.route')
const socketIo=require('socket.io')
const app = express()
const http=require('http')
const chatModel = require('./src/models/chat.model')
const { log } = require('console')


app.use(cors())
const server=http.createServer(app)
const io=socketIo(server,{
    cors: {
      origin: "http://localhost:4200", // Allow Angular frontend
      methods: ["GET", "POST"], // Allow these HTTP methods
      allowedHeaders: ["Content-Type"], // Allow custom headers
    },
  })
app.io=io


mongoose.connect(process.env.DATABASE_URL).then(() => {
    console.log('Connected to MongoDB')
}).catch((err) => {
    console.error('Error connecting to MongoDB', err)
})

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
  
    // Handle user joining their own room based on userId
    socket.on('setUser', (userId) => {
      socket.userId = userId; // Store user ID on the socket
      socket.join(userId); // Join the room with user ID (used for private messaging)
      console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    });

    socket.on('sendMessage', async (data) => {
      const { message, receiver } = data;
      const senderId = socket.userId;
      try {
        console.log("user is",senderId);
        if(senderId && receiver && message){
          const newChat = new chatModel({
              message: message,
              sender: senderId,
              receiver: receiver
            })
            
              const msg = await newChat.save();
              console.log("data saved",msg);
              
        }else{
         return console.log("error in sending message");
        }
        //   const user={
        //     message: message,
        //     sender: senderId,
        //     receiver: receiver
        // }
        // console.log("thisis user",user);
        
       const chats = await chatModel.find({
          $or: [
            { sender: senderId, receiver: receiver },
            { sender: receiver, receiver: senderId }
          ]
        }).sort({ createdAt: 1 });
              io.emit('privateMessage', chats);
              console.log(`Message sent to ${receiver}: ${message}`);
          
      } catch (err) {
          console.error("Error saving message:", err);
      }
  });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });

app.use(express.json())
app.use('/auth', authRouter)
app.use('/users',userRouter)


server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})   
