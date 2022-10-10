const express = require("express");
const { upload } = require("../../../lib");
const { tokenVerification } = require("../../../middleware");
const getUserProfile = require("./get-user-profile");
const updateProfile = require("./update-profile");
const router = express.Router();

router.get("/:id", getUserProfile);
router.put(
  "/update",
  tokenVerification,
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "profile_banner", maxCount: 1 },
  ]),
  updateProfile
);

module.exports = router;
