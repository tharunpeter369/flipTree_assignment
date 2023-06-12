const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference the User collection
      required: true,
    },
    profile_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile", // Reference the User collection
    },
    connection_request: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Profile", // Reference the Profile collection
        },
      ],
      default: [],
    },
    //groom || bride
    short_listed: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Profile", // Reference the Profile collection
        },
      ],
      default: [],
    },
    recently_viewed: {
      type: ["String"],
      default: [],
    },
    profile_vistors: {
      type: ["String"],
      default: [],
    },
  },
  { timestamps: true }
);

const Activity = mongoose.model("Activity", activitySchema);
module.exports = Activity;
