
require('dotenv').config()
const crypto = require('crypto');
let otps={}
const generateOtp = () => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}

// Import the nodemailer module
const nodemailer = require('nodemailer');

// Create a transporter object using your email provider's SMTP settings
const transporter = nodemailer.createTransport({
    service: 'gmail',  // You can use other services like 'hotmail', 'yahoo', etc.
    auth: {
        user:process.env.EMAIL ,
        pass:process.env.PASSWORD
    }
});




const sendOtpViaEmail =async (receverEmail,otp) => {


    const mailOptions = {
        from: process.env.EMAIL,  // Sender email address
        to: receverEmail,  // Recipient email address
        subject: 'Verification Otp',  // Subject of the email
        text: 'one-time-password for verification is ' + otp,  // Body text of the email
        // html: '<h1>Hello, this is a test email!</h1>'  // Optional: you can use HTML content
    };

    let test=false
    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error);
        } else {
            otps[receverEmail]=({ otp:otp})
          test=true
        }
    });
    console.log(test)
    
return test
}

const hashOTP = (otp) => {
    return crypto.createHash('sha256').update(otp).digest('hex');
  };

module.exports={generateOtp,sendOtpViaEmail,hashOTP}