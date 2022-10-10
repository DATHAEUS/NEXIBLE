const Joi = require("joi");
const { XummSdk } = require("xumm-sdk");
const { XUM_KEY, XUM_SECRET } = require("../../../config");
const Sdk = new XummSdk(XUM_KEY, XUM_SECRET);

const schema = Joi.object({
  account: Joi.string().required(),
  nftTokenOffer: Joi.string().required(),
});

const cancelOffer = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { account, nftTokenOffer } = req.body;
    const request = {
      TransactionType: "NFTokenCancelOffer",
      Account: account,
      NFTokenOffers: [nftTokenOffer],
    };
    const payload = await Sdk.payload.create(request, true);
    console.log(payload);
    console.log(payload?.refs?.qr_png);
    return res
      .status(200)
      .send({
        status: 200,
        qr_png: payload.refs.qr_png,
        link: payload.next.always,
      });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};
module.exports = cancelOffer;
