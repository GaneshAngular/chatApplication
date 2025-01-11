const express=require('express')
const { getContacts, sendMessage, getMessages, getUsers } = require('../controllers/user.controller')

const userRouter=express.Router()


userRouter.get('/',getUsers)

userRouter.get('/self')
userRouter.get('/contacts/',getContacts)

userRouter.post('/message/',sendMessage)

userRouter.get('/message/',getMessages)

module.exports=userRouter