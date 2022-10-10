const Joi = require("joi");
const { XummSdk } = require("xumm-sdk");
const {
  XUM_KEY,
  XUM_SECRET,
  PINATA_API_KEY,
  PINATA_API_SECRET,
  PINATA_API_URL,
  PINATA_JWT,
} = require("../../../config");
const { convertStringToHex, insertNewDocument } = require("../../../helpers");
const Sdk = new XummSdk(XUM_KEY, XUM_SECRET);

const xrpl = require("xrpl");
const { dev_net_xrpl } = require("../../../config");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");
var FormData = require("form-data");
const schema = Joi.object({
  account: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  royality: Joi.string().required(),
  tags: Joi.array().required(),
});

const mintNft = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { account, title, description, royality } = req.body;
    console.log({ account, title, description, royality });
    const appInfo = await Sdk.ping();
    console.log(appInfo.application);
    console.log(appInfo);
    if (!req?.file?.path) {
      return res
        .status(401)
        .send({ status: 401, message: "No Image Provided" });
    }
    const nft_img = await cloudinary.uploader.upload(req.file.path);
    req.body.nft_img = nft_img.url;
    console.log(nft_img);

    const request = {
      TransactionType: "NFTokenMint",
      // Account: "rJmsAaptA7KB8CXNUcY7wCHWiTytKDLgpf",
      Account: account,
      // Issuer: "rNCFjv8Ek5oDrNiMJ3pw6eLLFtMjZLJnf2",
      TransferFee: Number(royality),
      // TransferFee: 314,
      NFTokenTaxon: 0,
      Flags: 8,
      Fee: "10",
      // URI: convertStringToHex(
      URI: convertStringToHex(
        // "https://gateway.pinata.cloud/ipfs/QmXkXcSKFwbwwZvzEMmjip81VeZ9ZyPqnjrjiDhf6kcvMy"
        // [{ title, description, nft_img: nft_img.url }]
        nft_img.url
      ),
      Memos: [
        {
          Memo: {
            MemoData: convertStringToHex("You are Minting an NFT"),
            // MemoData: convertStringToHex("You are Minting an NFT"),
          },
        },
      ],
    };
    const subscription = await Sdk.payload.createAndSubscribe(
      request,
      (event) => {
        console.log("New payload event:", event.data);
        // console.log("event:", event);
        req.io.to(req.params.socketId).emit("mintingNft", {
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
      console.log("The nft request was rejected :(");
      // req.io.to(req.params.id).emit("result", );
    }

    if (resolveData.signed === true) {
      console.log("Woohoo! The nft request was signed :)");

      /**
       * Let's fetch the full payload end result, and get the issued
       * user token, we can use to send our next payload per Push notification
       */
      console.log(resolveData);
      const result = await Sdk.payload.get(resolveData.payload_uuidv4);
      console.log("result:", result, "========>");
      console.log(
        "User token:",
        result.application.issued_user_token,
        "==========>"
      );
      if (result.response.account) {
        const client = new xrpl.Client(dev_net_xrpl);
        await client.connect();

        const getNfts = await client.request({
          method: "account_nfts",
          account: account,
        });
        // console.log(getNfts);
        let data = Math.max.apply(
          Math,
          getNfts.result.account_nfts.map(function (o) {
            return o.nft_serial;
          })
        );
        data = getNfts.result.account_nfts.find(
          (element) => element.nft_serial === data
        );
        // upload img to pinata
        var pinataImgUrl;
        var pinataMetaDataUrl;
        // console.log(req.file);
        const form = new FormData();
        form.append("file", fs.createReadStream(req.file.path));
        var pinataImgRes;
        try {
          pinataImgRes = await axios.post(PINATA_API_URL, form, {
            maxContentLength: "Infinity",
            headers: {
              // "Content-Type": `multipart/form-data`,
              "Content-Type": `multipart/form-data;boundary=${form._boundary}`,
              pinata_api_key: PINATA_API_KEY,
              pinata_secret_api_key: PINATA_API_SECRET,
            },
          });
        } catch (error) {
          req.io.to(req.params.socketId).emit("mintResult", {
            message: "Error occured while uploading image to pianta",
          });
        }

        // console.log(pinataImgRes);
        if (!pinataImgRes.data.IpfsHash) {
          console.log("error occured in pinataImgRes");
          // return res.status(500).send({
          //   status: 500,
          //   message: "Error occured in pinata image uploading",
          // });
          req.io.to(req.params.socketId).emit("mintResult", {
            message: "Error occured in pinata image uploading",
          });
        }
        var foramData = JSON.stringify({
          pinataOptions: {
            cidVersion: 1,
          },
          pinataMetadata: {
            name: req.body.title,
            keyvalues: {
              customKey: "customValue",
              customKey2: "customValue2",
            },
          },
          pinataContent: {
            // somekey: "somevalue",
            title: req.body.title,
            description: req.body.description,
            nftImg: pinataImgRes.data.IpfsHash,
          },
        });
        pinataImgUrl = pinataImgRes.data.IpfsHash;
        // console.log(PINATA_JWT);
        var config = {
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${PINATA_JWT}`,
          },
          data: foramData,
        };
        // var data = JSON.stringify({
        //   hashToPin: pinataImgRes.data.IpfsHash,
        //   pinataMetadata: {
        //     name: dataObject.title,
        //     keyvalues: {
        //       title: dataObject.title,
        //       description: dataObject.description,
        //       nftImg: pinataImgRes.data.IpfsHash,
        //     },
        //   },
        // });

        // var config = {
        //   method: "post",
        //   url: "https://api.pinata.cloud/pinning/pinByHash",
        //   headers: {
        //     Authorization: `Bearer ${PINATA_JWT}`,
        //     "Content-Type": "application/json",
        //   },
        //   data: data,
        // };

        var pinataJsonRes;
        try {
          pinataJsonRes = await axios(config);
        } catch (error) {
          req.io.to(req.params.socketId).emit("mintResult", {
            message: "Error occured while uploading meta data to pianta",
          });
        }

        // console.log(pinataJsonRes.data);
        if (!pinataJsonRes.data.IpfsHash) {
          console.log("error occured in pinataJsonRes");
          // return res.status(500).send({
          //   status: 500,
          //   message: "Error occured in pinata meta data uploading",
          // });
          req.io.to(req.params.socketId).emit("mintResult", {
            message: "Error occured in pinata meta data uploading",
          });
        }
        pinataMetaDataUrl = pinataJsonRes.data.IpfsHash;
        const insertNftToDb = await insertNewDocument("nft", {
          ...data,
          ...req.body,
          pinataImgUrl,
          pinataMetaDataUrl,
          created_by: req.userId,
          owner: req.userId,
        });
        if (insertNftToDb) {
          console.log("NFt created successfully");
        }
        req.io
          .to(req.params.socketId)
          .emit("mintResult", { nft: insertNftToDb });
        fs.unlinkSync(req?.file?.path);
        await client.disconnect();
        // return res
        //   .status(200)
        //   .send({ status: 200, pinataImgUrl, pinataMetaDataUrl });
      }
    }
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = mintNft;
