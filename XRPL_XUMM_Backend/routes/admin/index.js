const express = require("express");
const router = express.Router();

const user = require("./user");
const profile = require("./profile");
const nft = require("./nft");
const blog = require("./blog");
const payment = require("./payment");

router.use("/user", user);
router.use("/nft", nft);
router.use("/profile", profile);
router.use("/blog", blog);
router.use("/payment", payment);

module.exports = router;
