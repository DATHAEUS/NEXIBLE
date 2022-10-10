const { getAggregate } = require("../../../helpers");

const Joi = require("joi");

const schema = Joi.object({
  page: Joi.number().required(),
});

const getBlogs = async (req, res) => {
  try {
    await schema.validateAsync(req.query);
    const { page } = req.query;
    const blogs = await getAggregate("blog", [
      {
        $match: {},
      },
      {
        $lookup: {
          from: "users",
          let: { user_id: "$userId" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
            {
              $project: {
                followers: 0,
                following: 0,
                password: 0,
              },
            },
          ],
          as: "user",
        },
      },
      {
        $project: {
          blogData: 0,
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $skip: Number(page),
      },
      { $limit: 5 },
    ]);

    const blogLength = await getAggregate("blog", [
      {
        $count: "total",
      },
    ]);
    return res.status(200).send({ status: 200, blogs, blogLength });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ status: 500, message: e.message });
  }
};

module.exports = getBlogs;
