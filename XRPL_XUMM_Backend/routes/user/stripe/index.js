const express = require("express");
const { tokenVerification } = require("../../../middleware");
const cancelPayment = require("./cancel-payment");
const confirmPayment = require("./confirm-payment");
const createPaymentIntent = require("./create-payment-intent");

const router = express.Router();

router.post("/create-payment-intent", tokenVerification, createPaymentIntent);
router.post("/confirm-payment", tokenVerification, confirmPayment);
router.post("/cancel-payment", tokenVerification, cancelPayment);

module.exports = router;
