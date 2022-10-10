const Joi = require("joi");
const { XummSdk } = require("xumm-sdk");
const {
  XUM_KEY,
  XUM_SECRET,
  dev_net_xrpl,
  dev_net_xrpl_nft_xumm,
} = require("../../../config");
const {
  updateDocument,
  findOne,
  insertNewDocument,
  deleteDocument,
  deleteManyDocument,
} = require("../../../helpers");
const Sdk = new XummSdk(XUM_KEY, XUM_SECRET);
const xrpl = require("xrpl");

const schema = Joi.object({
  nft_offer_index: Joi.string().required(),
  wallet_address: Joi.string().required(),
});
const cancelOffer = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { nft_offer_index, wallet_address } = req.body;
    const checkOffer = await findOne("offer", { nft_offer_index });
    if (!checkOffer) {
      return res.status(400).send({ status: 400, message: "Offer not found" });
    }
    const check_wallet_address = await findOne("user", { wallet_address });
    if (!check_wallet_address) {
      return res
        .status(400)
        .send({ status: 400, message: "Wallet Address not found" });
    }
    const request = {
      TransactionType: "NFTokenCancelOffer",
      Account: wallet_address,
      NFTokenOffers: [nft_offer_index],
    };
    const subscription = await Sdk.payload.createAndSubscribe(
      request,
      (event) => {
        console.log("New payload event:", event.data);
        // console.log("event:", event);
        req.io.to(req.params.socketId).emit("acceptBuyOffer", {
          data: event.data,
        });
        if (event.data.signed === true) {
          // console.log("Woohoo! The sign request was signed :)");
          // console.log("data", event.data);
          return event.data;
        }

        if (event.data.signed === false) {
          // console.log("The sign request was rejected :(");
          return false;
        }
      }
    );
    res.status(200).send({
      status: 200,
      // qr_png: `<img src=${subscription.created.refs.qr_png}/>`,
      qr_png: subscription.created.refs.qr_png,
      link: subscription.created.next.always,
    });
    console.log("New payload created, URL:", subscription.created);

    const resolveData = await subscription.resolved;

    if (resolveData.signed === false) {
      console.log("The nft create offer request was rejected :(");
      // req.io.to(req.params.id).emit("result", );
    }

    if (resolveData.signed === true) {
      console.log("Woohoo! The nft create offer request was signed :)");

      console.log(resolveData);
      const result = await Sdk.payload.get(resolveData.payload_uuidv4);
      console.log("result:", result, "========>");
      console.log(
        "User token:",
        result.application.issued_user_token,
        "==========>"
      );
      if (result.response.account) {
        console.log("result.response.account", result.response.account);
        const deleteOffer = await deleteDocument("offer", {
          nft_offer_index,
        });
        console.log({ deleteOffer });
        if (!deleteOffer) {
          req.io.to(req.params.socketId).emit("acceptBuyOfferResult", {
            nft: "Error: offer Not found in the DB",
          });
        }
        req.io
          .to(req.params.socketId)
          .emit("acceptBuyOfferResult", { nft: "Offer Cancelled Succesfully" });
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ status: 500, message: e.message });
  }
};
module.exports = cancelOffer;

// const Joi = require("joi");
// const { XummSdk } = require("xumm-sdk");
// const {
//   XUM_KEY,
//   XUM_SECRET,
//   dev_net_xrpl,
//   dev_net_xrpl_nft_xumm,
// } = require("../../../config");
// const {
//   updateDocument,
//   findOne,
//   insertNewDocument,
//   deleteDocument,
//   deleteManyDocument,
// } = require("../../../helpers");
// const Sdk = new XummSdk(XUM_KEY, XUM_SECRET);
// const xrpl = require("xrpl");

// const schema = Joi.object({
//   nft_offer_index: Joi.string().required(),
//   wallet_address: Joi.string().required(),
// });
// const cancelOffer = async (req, res) => {
//   try {
//     await schema.validateAsync(req.body);
//     const { nft_offer_index, wallet_address } = req.body;
//     const checkOffer = await findOne("offer", { nft_offer_index });
//     if (!checkOffer) {
//       return res.status(400).send({ status: 400, message: "Offer not found" });
//     }
//     const check_wallet_address = await findOne("user", { wallet_address });
//     if (!check_wallet_address) {
//       return res
//         .status(400)
//         .send({ status: 400, message: "Wallet Address not found" });
//     }
//     const request = {
//       TransactionType: "NFTokenCancelOffer",
//       Account: wallet_address,
//       NFTokenOffers: [nft_offer_index],
//     };
//     const subscription = await Sdk.payload.createAndSubscribe(
//       request,
//       (event) => {
//         console.log("New payload event:", event.data);
//         // console.log("event:", event);
//         req.io.to(req.params.socketId).emit("acceptBuyOffer", {
//           data: event.data,
//         });
//         if (event.data.signed === true) {
//           // console.log("Woohoo! The sign request was signed :)");
//           // console.log("data", event.data);
//           return event.data;
//         }

//         if (event.data.signed === false) {
//           // console.log("The sign request was rejected :(");
//           return false;
//         }
//       }
//     );
//     res.status(200).send({
//       status: 200,
//       // qr_png: `<img src=${subscription.created.refs.qr_png}/>`,
//       qr_png: subscription.created.refs.qr_png,
//       link: subscription.created.next.always,
//     });
//     console.log("New payload created, URL:", subscription.created);

//     const resolveData = await subscription.resolved;

//     if (resolveData.signed === false) {
//       console.log("The nft create offer request was rejected :(");
//       // req.io.to(req.params.id).emit("result", );
//     }

//     if (resolveData.signed === true) {
//       console.log("Woohoo! The nft create offer request was signed :)");

//       console.log(resolveData);
//       const result = await Sdk.payload.get(resolveData.payload_uuidv4);
//       console.log("result:", result, "========>");
//       console.log(
//         "User token:",
//         result.application.issued_user_token,
//         "==========>"
//       );
//       if (result.response.account) {
//         console.log("result.response.account", result.response.account);
//         const deleteOffer = await deleteDocument("offer", {
//           nft_offer_index,
//         });
//         console.log({ deleteOffer });
//         if (!deleteOffer) {
//           req.io.to(req.params.socketId).emit("acceptBuyOfferResult", {
//             nft: "Error: offer Not found in the DB",
//           });
//         }
//         req.io
//           .to(req.params.socketId)
//           .emit("acceptBuyOfferResult", { nft: "Offer Cancelled Succesfully" });
//       }
//     }
//   } catch (e) {
//     console.log(e);
//     return res.status(500).send({ status: 500, message: e.message });
//   }
// };
// module.exports = cancelOffer;
