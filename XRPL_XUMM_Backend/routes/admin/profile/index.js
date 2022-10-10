const express = require("express");
const upload = require("../../../lib/multer");
const updateAdminProfile = require("./update");

const router = express.Router();

router.put("/update", upload.single("profile"), updateAdminProfile);

module.exports = router;
