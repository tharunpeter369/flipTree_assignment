const speakeasy = require("speakeasy");
const twilio = require("twilio");
const dotenv = require("dotenv")
dotenv.config()

const accountSid = "AC0ee336ee09bffee37123a6742abec35e";
// const authToken = "f74f4a2bffaa409e054ef782c044cba4";
const authToken = process.env.AUTH_TOKEN
const client = twilio(accountSid, authToken);
let secretKeyOtp = "tharun";

const sendTwilioOtp = async (otp,phoneNumber) => {
  try {
    const message = await client.messages.create({
      body: `Your OTP: ${otp}`,
      from: "+13613663356",
      to: `+91${phoneNumber}`,
    });
    console.log(`OTP sent. Message SID: ${message.sid}`);
    if (message.sid) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const generateOtpService = () => {
  const otp = speakeasy.totp({
    secret: secretKeyOtp,
    digits: 6,
    step: 1, // Time step in seconds
    window: 60, // Verification window in which the OTP is valid (6 x 10 = 60 seconds)
  });
  return otp;
};

const verifyOtpService = (otp) => {
  let verify = speakeasy.totp.verify({
    secret: secretKeyOtp,
    token: otp,
    digits: 6,
    step: 1, 
    window: 60, 
  });
  return verify;
};

module.exports = {
  generateOtpService,
  verifyOtpService,
  sendTwilioOtp,
};
