const jwt = require("jsonwebtoken");
const { SECRET } = require("../../config");
const { findOne } = require("../../helpers");

const adminVerification = (req, res, next) => {
  try {
    let token = req.headers["token"];
    if (!token) {
      return res
        .status(404)
        .send({ status: 404, message: "No token provided!" });
    }
    jwt.verify(token, SECRET, async (err, decoded) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .send({ status: 400, message: "Token Unauthorized!" });
      }
      if (!decoded.user) {
        return res
          .status(400)
          .send({ status: 400, message: "Upgrade your token" });
      }
      const isUserExist = await findOne("user", { _id: decoded.user._id });
      if (!isUserExist) {
        return res.status(404).send({
          status: 404,
          message: "User does not exist with your token",
        });
      }
      const checkType = findOne("userType", {
        _id: decoded.user.type,
        type: "Admin",
      });
      if (!checkType) {
        return res.status(400).send({
          status: 400,
          message: "Only Admin can access this",
        });
      }
      req.userId = decoded.user._id;
      req.user = decoded.user;
      next();
    });
  } catch (e) {
    console.log("Token verification Error", e.message);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = { adminVerification };
