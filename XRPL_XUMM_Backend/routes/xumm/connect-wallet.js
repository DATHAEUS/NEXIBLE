const { XummSdk } = require("xumm-sdk");
const { XUM_KEY, XUM_SECRET, SECRET } = require("../../config");
const { findOne, insertNewDocument, updateDocument } = require("../../helpers");
const jwt = require("jsonwebtoken");

// const { TxData } = require("xrpl-txdata");

const Sdk = new XummSdk(XUM_KEY, XUM_SECRET);

const connectWallet = async (req, res) => {
  try {
    // const Verify = new TxData();
    console.log("connect Xum wallet func call");
    const appInfo = await Sdk.ping();
    console.log(appInfo);
    const request = {
      txjson: {
        TransactionType: "SignIn",
      },
    };
    const subscription = await Sdk.payload.createAndSubscribe(
      request,
      (event) => {
        console.log("New payload event:", event.data);
        req.io.to(req.params.socketId).emit("liveXum", {
          data: event.data,
          type: "success",
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
      message: subscription.created.refs.qr_png,
      link: subscription.created.next.always,
    });
    console.log("New payload created, URL:", subscription.created);

    const resolveData = await subscription.resolved;

    if (resolveData.signed === false) {
      console.log("The sign request was rejected :(");
      // req.io.to(req.params.id).emit("result", );
    }

    if (resolveData.signed === true) {
      console.log("Woohoo! The sign request was signed :)");

      /**
       * Let's fetch the full payload end result, and get the issued
       * user token, we can use to send our next payload per Push notification
       */
      const result = await Sdk.payload.get(resolveData.payload_uuidv4);
      console.log("result:", result, "========>");
      console.log(
        "User token:",
        result.application.issued_user_token,
        "==========>"
      );
      if (result) {
        if (req.query.userId) {
          const findUser = await findOne("user", { _id: req.query.userId });
          if (!findUser) {
            req.io.to(req.params.socketId).emit("result", {
              message: "No User Found with your user id",
              type: "error",
            });
          }
          if (findUser.wallet_address) {
            if (findUser.wallet_address === result.response.account) {
              const token = jwt.sign({ user: findUser }, SECRET);
              req.io.to(req.params.socketId).emit("result", {
                result,
                user: findUser,
                token,
                type: "success",
              });
            } else {
              req.io.to(req.params.socketId).emit("result", {
                message:
                  "wallet address does not match with the user wallet address",
                type: "error",
              });
            }
          } else {
            const checkWalletAddressExist = await findOne("user", {
              wallet_address: result.response.account,
            });
            if (checkWalletAddressExist) {
              req.io.to(req.params.socketId).emit("result", {
                type: "error",
                message: "This wallet is already in use",
              });
            } else {
              const user = await updateDocument(
                "user",
                { _id: req.query.userId },
                {
                  wallet_address: result.response.account,
                  connect_wallet: true,
                }
              );
              const token = jwt.sign({ user }, SECRET);
              req.io
                .to(req.params.socketId)
                .emit("result", { result, user, token, type: "success" });
            }
          }
        } else {
          let user = await findOne("user", {
            wallet_address: result.response.account,
          });
          if (user) {
            const token = jwt.sign({ user }, SECRET);
            //   return res.status(200).send({ status: 200, user, token });
            req.io
              .to(req.params.socketId)
              .emit("result", { result, user, token, type: "success" });
          } else {
            const check_user_type = await findOne("userType", { type: "User" });
            if (!check_user_type) {
              return res
                .status(404)
                .send({ status: 404, message: "No user type found" });
            }
            user = await insertNewDocument("user", {
              wallet_address: result.response.account,
              full_Name: "Unnamed",
              bio: "I Love XRPL",
              connect_wallet: true,
              type: check_user_type._id,
            });
            const token = jwt.sign({ user }, SECRET);
            // return res.status(200).send({ status: 200,  });
            req.io
              .to(req.params.socketId)
              .emit("result", { result, user, token, type: "success" });
          }
        }
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = connectWallet;
