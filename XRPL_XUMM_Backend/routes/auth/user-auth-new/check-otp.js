const { STRIPE_SECRET_KEY, SECRET } = require("../../../config");
const {
  findOneSort,
  insertNewDocument,
  findOne,
  updateDocument,
} = require("../../../helpers");
const jwt = require("jsonwebtoken");
const xrpl = require("xrpl");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const schema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required(),
  otp_key: Joi.string().max(6).required(),
  // password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).required(),
  // password: Joi.string()
  //   .min(6)
  //   .max(30)
  //   .pattern(
  //     new RegExp(
  //       "^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{6,30}$"
  //     )
  //   )
  //   .required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9@$!%*#?&]{6,30}$"))
    .required(),
  wallet_address: Joi.string(),
});

const checkOtp = async (req, res) => {
  try {
    await schema.validateAsync(req.body);
    const { email, otp_key, first_name, last_name, password, wallet_address } =
      req.body;
    const check_user = await findOneSort("otp", { email });
    if (!check_user) {
      return res.status(400).send({ status: 400, message: "Email not exist" });
    }
    const otpCreated = new Date(check_user.created).getTime();
    const now = new Date().getTime();
    const diff = now - otpCreated;
    if (diff > 300000 || check_user.used) {
      return res.status(403).send({ status: 403, message: "OTP expire" });
    }
    const check_otp = bcrypt.compareSync(otp_key, check_user.otp_key);
    if (!check_otp) {
      return res.status(400).send({ status: 400, message: "Wrong OTP" });
    }
    await check_user.updateOne({ used: true });
    const customer = await stripe.customers.create({
      description: "my application user " + first_name + " " + last_name,
      name: first_name + " " + last_name,
      email,
    });
    var data = {
      stripe_customer_id: customer.id,
      first_name,
      last_name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    };
    if (req.files) {
      if (req.files.profile) {
        const profile = await cloudinary.uploader.upload(
          req.files.profile[0].path
        );
        data.profile = profile.url;
        fs.unlinkSync(req.files.profile[0].path);
        console.log(profile);
      }
      if (req.files.profile_banner) {
        const profile_banner = await cloudinary.uploader.upload(
          req.files.profile_banner[0].path
        );
        data.profile_banner = profile_banner.url;
        fs.unlinkSync(req.files.profile_banner[0].path);
        console.log(profile_banner);
      }
    }
    if (wallet_address) {
      const getUser = await findOne("user", { wallet_address });
      if (!getUser) {
        return res.status(400).send({
          status: 400,
          message: "Wallet address not exist",
        });
      }
      const updateUser = await updateDocument("user", { wallet_address }, data);
      var token = jwt.sign({ user: updateUser }, SECRET);
      return res.status(200).send({
        status: 200,
        token,
        message: "OTP confirmed",
        user: updateUser,
      });
    }
    const wallet = xrpl.Wallet.generate();
    data.account_public_key = wallet.publicKey;
    data.account_private_key = wallet.privateKey;
    data.wallet_address = wallet.classicAddress;
    data.account_seeds = wallet.seed;
    const newUser = await insertNewDocument("user", data);
    var token = jwt.sign({ user: newUser }, SECRET);
    return res
      .status(200)
      .send({ status: 200, token, message: "OTP confirmeddas", user: newUser });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ status: 500, message: e.message });
  }
};

module.exports = checkOtp;
