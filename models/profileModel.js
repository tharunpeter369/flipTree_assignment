const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference the User collection
      required: true,
    },
    name: {
      type: "String",
      // required: true
    },
    //groom || bride
    type: {
      type: "String",
      enum: ["groom", "bride"],
      // required: true,
    },
    date_of_birth: {
      type: "String",
      // required: true,
    },
    mother_toungue: {
      type: "String",
      // required: true,
    },
    relegion: {
      type: "String",
      // required: true,
    },
    relegion: {
      type: "String",
      // required: true,
    },
    location: {
      type: "String",
      // required: true,
    },
    email: {
      type: "String",
      // required: true,
    },
    marital_status: {
      type: "String",
      // required: true,
    },
    height: {
      type: "String",
      // required: true,
    },
    caste: {
      type: "String",
      // required: true,
    },
    birth_star: {
      type: "String",
      // required: true,
    },
    education: {
      type: "String",
      // required: true,
    },
    job: {
      type: "String",
      // required: true,
    },
    bio: {
      type: "String",
      // required: true,
    },
    food: {
      type: "String",
      // required: true,
    },
    drinking: {
      type: "String",
      // required: true,
    },
    smoking: {
      type: "String",
      // required: true,
    },
    ideologies: {
      type: "String",
      // required: true,
    },
    hobbies: {
      type: ["String"],
      default: [],
      // required: true,
    },
    profile_picture: {
      type: ["String"],
      default: [],
      // required: true,
    },
    show_name: {
      type: "Boolean",
      default: false,
    },
    show_date_of_birth: {
      type: "Boolean",
      default: false,
    },
    show_location: {
      type: "Boolean",
      default: false,
    },
    referal_code: {
      type: "String",
      // required: true,
    },
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
