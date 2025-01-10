const { login, signup, verifyOtp } = require('../controllers/auth.controller')


const authRouter=require('express').Router()

authRouter.post('/login',login)
authRouter.post('/signup',signup)
authRouter.post('/login/verify',verifyOtp)





module.exports = authRouter