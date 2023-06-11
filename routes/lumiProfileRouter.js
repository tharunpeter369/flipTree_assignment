const express = require("express");
const router = express.Router();
const lumiController = require("../controllers/lumiProfileController");
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //directory where uploaded files will be stored
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalFileName = file.originalname;
    const fileExtension = originalFileName.substring(
      originalFileName.lastIndexOf(".")
    );
    const fileName = file.fieldname + "-" + uniqueSuffix + fileExtension;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

// Get all profiles
router.get("/", async (req, res) => {
  const data = await lumiController.getProfiles();
  res.json(data);
});

//dynamic search profile
router.get("/search", async (req, res) => {
  try {
    const { searchField, searchValue } = req.query;
    const profiles = await lumiController.getProfiles(searchField, searchValue);
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get profile by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const profile = await lumiController.getProfileById(id);
  res.json(profile);
});



router.post("/", upload.array("profile_picture", 5), async (req, res) => {
  try {
    const { ...profileData } = req.body;
    const profilePictures = req.files || [];
    const newProfile = await lumiController.createProfile(
      profileData,
      profilePictures
    );
    res.json(newProfile);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});



router.put("/:id", upload.array("profile_picture", 5), async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const profilePictures = req.files;
    const updatedProfile = await lumiController.updateProfile(
      id,
      updatedData,
      profilePictures
    );
    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});

// Delete a profile
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await lumiController.deleteProfile(id);
  res.json({ message: "Profile deleted successfully" });
});

module.exports = router;



// Update a profile

// router.put("/:id", async (req, res) => {
//   const id = req.params.id;
//   const updatedData = req.body;
//   const updatedProfile = await lumiController.updateProfile(id, updatedData);
//   res.json(updatedProfile);
// });

// create a new profile

// router.post('/', async (req, res) => {
//     const profileData = req.body;
//     const newProfile = await lumiController.createProfile(profileData);
//     res.json(newProfile);
// });