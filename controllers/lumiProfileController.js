const Profile = require("../models/profileModel");
const jwt = require("../helpers/jwt");
const lumiService = require("../services/lumiService");

// const createProfile = async (data) => {
//   try {
//     // Create a new profile using the provided data
//     const profile = await Profile.create(data);
//     return profile;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

const createProfile = async (profileData, profilePictures) => {
  try {
    const profile = await Profile.create({
      ...profileData,
      profile_picture: profilePictures.map((file) => file.filename),
    });
    return profile;
  } catch (error) {
    throw new Error(error.message);
  }
};


const getProfiles = async (searchField, searchValue) => {
  try {
    let query = {};

    // Check if searchField and searchValue are provided
    if (searchField && searchValue) {
      query[searchField] = searchValue;
    }

    // Retrieve profiles based on the query
    const profiles = await Profile.find(query);
    return profiles;
  } catch (err) {
    throw new Error(err.message);
  }
};

const getProfilesSearch = async (searchField, searchValue) => {
  try {
    let query = {};
    if (searchField && searchValue) {
      query[searchField] = searchValue;
    }
    //profiles based on the query
    const profiles = await Profile.find(query);
    return profiles;
  } catch (err) {
    throw new Error(err.message);
  }
};


const getProfileById = async (id) => {
  try {
    // Find a profile by its ID
    // const profile = await Profile.findById(id).populate('user');
    let profile = await Profile.findOne({ _id: id }).populate("userId");
    return profile;
  } catch (err) {
    throw new Error(err.message);
  }
};

// const updateProfile = async (id, data) => {
//   try {
//     // Update a profile by its ID
//     const profile = await Profile.findByIdAndUpdate(id, data, { new: true });
//     return profile;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

const updateProfile = async (id, data, profilePictures) => {
  try {
    const profile = await Profile.findById(id);
    if (!profile) {
      throw new Error("Profile not found");
    }
    // Handle profile pictures
    if (profilePictures && profilePictures.length > 0) {
      let incomeingPic = profilePictures.map((file) => file.filename);
      data.profile_picture = [
        ...incomeingPic,
        ...profile.profile_picture,
      ];
    }
    Object.assign(profile, data);
    // Save the updated profile
    const updatedProfile = await profile.save();
    return updatedProfile;
  } catch (error) {

    throw error;
  }
};

const deleteProfile = async (id) => {
  try {
    // Delete a profile by its ID
    await Profile.findByIdAndDelete(id);
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile,
  getProfilesSearch
};
