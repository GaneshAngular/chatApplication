const express=require('express')
const { getContacts, sendMessage, getMessages, getUsers, getProfile, getUsersById } = require('../controllers/user.controller')

const userRouter=express.Router()


userRouter.get('/',getUsers)
userRouter.get('/id',getUsersById)
userRouter.get('/self',getProfile)
userRouter.get('/contacts/',getContacts)

userRouter.post('/message/',sendMessage)

userRouter.get('/message/',getMessages)

module.exports=userRouter