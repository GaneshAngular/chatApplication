const { hash } = require("crypto")
const userModel = require("../models/user.model")
const { generateOtp, sendOtpViaEmail, hashOTP } = require("../services/otp-service.service")
const { Session } = require("inspector/promises")
const OTP = require("../models/otp.model")
const { generateToken } = require("../services/jwt.service")


const login = async (req, res) => {
  const { email } = req.body
  try {
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }
    const otpData = generateOtp()
    const isSent = sendOtpViaEmail(email, otpData)


    if (isSent) {
    
      await OTP.create({ otp: otpData, email: user.email })
      return res.status(200).json({ message: 'OTP sent successfully', email: user.email })
    } else {
      return res.status(500).json({ message: 'Error sending OTP' })
    }

  } catch (error) {
    console.log(error);

  }

}

const verifyOtp = async (req, res) => {
  const { otp,email } = req.body
  // const email = "ganeshturate@gmail.com"
  const dbOtp = await OTP.findOne({ email })
  if (!dbOtp) {
    return res.status(404).json({ message: 'OTP not found' })
  }

  if (dbOtp.otp == otp) {
       const token=generateToken({email})
    return res.status(200).json({ message: 'OTP verified successfully',token:token })
  } else {
    return res.status(401).json({ message: 'Invalid OTP' })
  }
}

const signup = async (req, res) => {
  const { name, email, mobile } = req.body

  try {
    const user = await userModel.findOne({ email, mobile })
    if (user) {
      return res.status(409).json({ message: 'Account already exists' })
    }

    const newUser = await userModel.create({ name, email, mobile })

    if (newUser) {
      return res.status(201).json({ message: ' signup successfully' })
    } else {
      return res.status(500).json({ message: 'newtwork issue...' })
    }
  } catch (error) {
    console.log(error);

  }




}

module.exports = {
  login, signup, verifyOtp
}