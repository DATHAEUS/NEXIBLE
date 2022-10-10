const express = require("express");
// const burnNft = require("./burn-nft");
// const getUserNft = require("./get-user-nft");
const mintNft = require("./mintNft");
const createOffer = require("./create-offer");
// const cancelOffer = require("./cancel-offer");
// const getOffers = require("./get-offer");
const acceptOffer = require("./accept-offer");
const { tokenVerification } = require("../../../middleware");
const getMintedNfts = require("./get-minted-nfts");
const getUserNftDb = require("./get-user-nft-db");
const getSingleNft = require("./get-single-nft");
const nftsONSell = require("./get-sell-nfts");
const getUserNftOnSell = require("./get-user-nfts-on-sell-db");
const { upload } = require("../../../lib");
const getNftByTagName = require("./get-nft-by-tag-name");
// const createWallet = require("./create-wallet");
// const bidOffer = require("./bid-offer");
const router = express.Router();

router.post(
  "/mint-nft/:socketId",
  tokenVerification,
  upload.single("nft_img"),
  mintNft
);
router.get("/get-minted-nfts", getMintedNfts);
router.post("/create-offer/:socketId", tokenVerification, createOffer);
router.put("/accept-offer/:socketId", tokenVerification, acceptOffer);

// Bidding
// router.put("/burn-nft", burnNft);
// router.delete("/cancel-offer", cancelOffer);
// router.get("/get-offers/:tokenId", getOffers);
// router.post("/bid-offer/:socketId", bidOffer);
// Custom Backend Data
// router.get("/get-user-nft/:account", getUserNft);
router.get("/get-user-nft-db/:owner", getUserNftDb);
router.get("/get-single-nft/:id", getSingleNft);
router.get("/nft-on-sell", nftsONSell);
router.get("/get-user-nft-on-sell/:id", getUserNftOnSell);
router.get("/get-nft-by-tag", getNftByTagName);

// Create Wallet
// router.get("/create-wallet", createWallet);

module.exports = router;
