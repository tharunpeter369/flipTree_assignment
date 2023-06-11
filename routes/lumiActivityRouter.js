const express = require("express");
const router = express.Router();
const lumiActivityController = require("../controllers/lumiActivityController");


// get all profiles
router.get("/", async (req, res) => {
  const data = await lumiActivityController.getAllActivity();
  res.json(data);
});

//Create acitvity
router.post("/", async (req, res) => {
  try {
    const { userId, field, value } = req.body;
    const updatedActivity = await lumiActivityController.createOrUpdateActivity(
      userId,
      field,
      value
    );
    res.json(updatedActivity);
  } catch (error) {
    res.status(400).json({ error: "Bad request" });
  }
});



module.exports = router;
