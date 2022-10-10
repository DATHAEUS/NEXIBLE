const Joi = require("joi");
const { getAggregate } = require("../../../helpers");
const { ObjectID } = require("../../../types");

const schema = Joi.object({
  id: Joi.string().required(),
});

const getUserProfile = async (req, res) => {
  try {
    await schema.validateAsync(req.params);
    const { id } = req.params;
    const user = await getAggregate("user", [
      { $match: { _id: ObjectID(id) } },
    ]);
    if (!user.length) {
      return res.status(404).send({ status: 404, message: "user not found" });
    }
    user[0].password = undefined;
    return res.status(200).send({ status: 200, user: user[0] });
  } catch (e) {
    console.log(e);
    return res.status(500).send({ status: 500, message: e.message });
  }
};
module.exports = getUserProfile;
