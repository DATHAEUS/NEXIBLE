const express = require("express");
const createOffer = require("./create-offer");
const getNftOffers = require("./get-offers");
const accecptOffer = require("./accept-offer");
const cancelOffer = require("./cancel-offer");

const router = express.Router();

router.get("/", getNftOffers);
router.post("/:socketId", createOffer);
router.put("/:socketId", accecptOffer);
router.delete("/:socketId", cancelOffer);
module.exports = router;
