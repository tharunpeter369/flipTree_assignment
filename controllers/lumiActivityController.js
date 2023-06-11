const Activity = require("../models/activityModel");
const lumiService = require("../services/lumiService");

const getAllActivity = async () => {
  try {
    // Retrieve all profiles
    const profiles = await Activity.find();
    return profiles;
  } catch (err) {
    throw new Error(err.message);
  }
};

const createOrUpdateActivity = async (userId, field, value) => {
  try {
    // find the activity record
    let activity = await Activity.findOne({ userId });
    if (!activity) {
      // if not create new
      activity = new Activity({
        userId,
        [field]: [value],
      });
    } else {
      //update the field array
      console.log(activity[field].includes(value));
      if (Array.isArray(activity[field]) && !activity[field].includes(value)) {
        activity[field].push(value);
      }
    }
    const updatedActivity = await activity.save();
    return updatedActivity;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getAllActivity,
  createOrUpdateActivity,
};
