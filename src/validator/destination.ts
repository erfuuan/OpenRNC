import joi from "joi";

const create = joi.object().keys({
  title: joi.string().required(),
  platform: joi.string().required(),
  description: joi.string(),
  credential: joi.object().required(),
});

const update = joi.object().keys({
  id: joi.string().required(),
  title: joi.string().required(),
  platform: joi.string().required(),
  description: joi.string(),
  credential: joi.object().required(),
});

const oneRecord = joi.object().keys({
  id: joi.string().required(),
});

export default { create, update, oneRecord };
