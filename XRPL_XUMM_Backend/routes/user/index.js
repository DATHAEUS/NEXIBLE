const express = require("express");
// const { upload } = require("../../lib");
// const { tokenVerification } = require("../../middleware");
const profile = require("./profile");
const xrpl = require("./xrpl");
const xummXrpl = require("./xumm-xrpl");
const blog = require("./blog");
const auction = require("./auction");
const bid = require("./bid");
const stripe = require("./stripe");
const offer = require("./offer");

const router = express.Router();

router.use("/xrpl", xrpl);
router.use("/xumm-xrpl", xummXrpl);
router.use("/profile", profile);
router.use("/blog", blog);
router.use("/auction", auction);
router.use("/bid", bid);
router.use("/stripe", stripe);
router.use("/offer", offer);

module.exports = router;
