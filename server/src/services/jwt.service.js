const jwt=require('jsonwebtoken');
require('dotenv').config()

const generateToken=(data)=>{
    try {
        return jwt.sign(data,process.env.SECRET_KEY)
        
    } catch (error) {
        console.log(error);     
    }
}

const verifyToken=(token)=>{
    try {
        return jwt.verify(token,process.env.SECRET_KEY)
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports={generateToken,verifyToken}