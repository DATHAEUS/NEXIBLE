const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.userType = require("./user-type");
db.nft = require("./nft");
db.blog = require("./blog");
db.offer = require("./offer");
db.auction = require("./auction");
db.bid = require("./bid");
db.otp = require("./otp");
db.payment = require("./payment");

module.exports = db;
