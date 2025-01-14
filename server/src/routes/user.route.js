const express = require('express')
const { getContacts, sendMessage, getMessages, getUsers, getProfile, getUsersById, updateProfileImage, updatePersonalDetails } = require('../controllers/user.controller')
const upload = require('../services/multer.service')

const userRouter = express.Router()


userRouter.get('/', getUsers)
userRouter.get('/id', getUsersById)
userRouter.get('/self', getProfile)
userRouter.get('/contacts/', getContacts)
userRouter.post('/message/', sendMessage)
userRouter.put('/self/profile', upload.single('image'),updateProfileImage)

userRouter.put('/self/detail', updatePersonalDetails)
userRouter.get('/message/', getMessages)

module.exports = userRouter