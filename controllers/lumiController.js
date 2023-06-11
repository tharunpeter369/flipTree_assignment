const User = require("../models/userModel");
const jwt = require("../helpers/jwt");
const lumiService = require("../services/lumiService");

const getData = () => {
  try {
    const users = User.find();
    return users;
  } catch (err) {
    throw new Error(err.message);
  }
};

const upsertUser = async (data) => {
  try {
    const { phone_number, ...userData } = data;
    const filter = { phone_number };
    const update = {
      $set: userData,
      $setOnInsert: filter, // set the phone_number if it doesn't exist
    };
    const options = { upsert: true, new: true };
    const user = await User.findOneAndUpdate(filter, update, options);
    return user;
  } catch (error) {
    throw new Error(err.message);
  }
};

const findUserWithPhoneNumber = async (phone_number) => {
  try {
    const users = User.findOne({ phone_number });
    return users;
  } catch (err) {
    throw new Error(err.message);
  }
};

const create = async (data) => {
  try {
    const user = await User.create(data);
    return user;
  } catch (error) {
    throw new Error(err.message);
  }
};

const generateOtp = async (data) => {
  try {
    const phoneNumber = data.phone_number;
    const otp = await lumiService.generateOtpService();
    //phone: 9544335325 (only work this number in twilio free trial)
    const sendOtp = await lumiService.sendTwilioOtp(otp,phoneNumber)    // uncomment after complete
    console.log("Generated OTP:", otp);
    // await sendOtp(phoneNumber, otp);
    //if otp suceess save phone number and otp in database for future verifications
    let userData = {
      phone_number: data.phone_number,
      otp: otp,
      otpDateTime: new Date(),
    };
    let upsertUserData = await upsertUser(userData);
    // const isValidOTP = await lumiService.verifyOtpService(otp);
    return otp;
  } catch (error) {
    throw new Error(err.message);
  }
};

const verifyOtp = async (data) => {
  try {
    const { otp, phone_number } = data;
    //Find phone number and get otp for verification
    const findUser = await findUserWithPhoneNumber(phone_number);
    if (findUser.otp == otp) {
      const isValidOTP = await lumiService.verifyOtpService(otp);
      if (isValidOTP) {
        //update with null value
        let userData = {
          phone_number: phone_number,
          otp: null,
        };
        //update otp with null value
        let upsertUserData = await upsertUser(userData);
        //create jwt token and authetication
        let creatJwtToken = await jwt.generateToken(userData);
        return creatJwtToken;
      }
      return isValidOTP;
    } else {
      return false;
    }
  } catch (error) {
    throw new Error(err.message);
  }
};

module.exports = {
  getData,
  create,
  generateOtp,
  verifyOtp,
};
