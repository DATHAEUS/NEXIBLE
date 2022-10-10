const express = require("express");
const addCreditCard = require("./add-credit-card");
const addStripeCard = require("./add-stripe-card");
const butXrp = require("./add-stripe-card");
const checkOtp = require("./check-otp");
const otpToEmail = require("./otp-email");
const { tokenVerification } = require("../../../middleware");
const { upload } = require("../../../lib");
const router = express.Router();

// router.post("/add-card", addCreditCard);
router.post("/otp-email", otpToEmail);
router.post(
  "/check-otp",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "profile_banner", maxCount: 1 },
  ]),
  checkOtp
);
router.post("/add-stripe-card", tokenVerification, addStripeCard);

module.exports = router;
