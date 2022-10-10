const { find, getAggregate } = require("../../../helpers");
const { ObjectID } = require("../../../types");

const getUserNftOnSell = async (req, res) => {
  try {
    const _id = req.params.id;
    // const nfts = await find("nft", { owner: _id, nftType: "sell" });
    const nfts = await getAggregate("nft", [
      {
        $match: {
          owner: ObjectID(_id),
          nftType: "sell",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "created_by",
          foreignField: "_id",
          as: "created_by",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $unwind: "$created_by",
      },
      {
        $unwind: "$owner",
      },
      {
        $sort: {
          _id: -1,
        },
      },
    ]);
    return res.status(200).send({ status: 200, nfts });
  } catch (e) {
    console.log(e);
    return res.status(400).send({ status: 400, message: e.message });
  }
};

module.exports = getUserNftOnSell;
