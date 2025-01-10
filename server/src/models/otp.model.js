const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const otpSchema = new Schema({
    otp: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 });

const OTP = mongoose.model('OTP', otpSchema);
module.exports = OTP;