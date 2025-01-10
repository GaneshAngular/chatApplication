const jwt=require('jsonwebtoken');
require('dotenv').config()

const generateToken=(data)=>{
     return jwt.sign(data,process.env.SECRET_KEY)
}

const verifyToken=(token)=>{
    return jwt.verify(token,process.env.SECRET_KEY)
}

module.exports={generateToken,verifyToken}