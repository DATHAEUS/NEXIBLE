const { getAggregate } = require("../../../helpers");
const { ObjectID } = require("../../../types");

const Joi = require("joi");

const schema = Joi.object({
  page: Joi.number().required(),
});

const getNfts = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const { page } = req.query;

    const nfts = await getAggregate("nft", [
      {
        $match: {},
      },
      // {
      //   $lookup: {
      //     from: "users",
      //     localField: "owner",
      //     foreignField: "_id",
      //     as: "owner",
      //   },
      // },
      {
        $sort: { _id: -1 },
      },
      {
        $skip: Number(page),
      },
      { $limit: 25 },
    ]);

    const nftLength = await getAggregate("nft", [
      {
        $count: "total",
      },
    ]);
    return res.status(200).send({ status: 200, nfts, nftLength });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ status: 500, message: e.message });
  }
};

module.exports = getNfts;
