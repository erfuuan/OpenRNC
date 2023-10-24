import joi from 'joi';

const create = joi.object().keys({
  title: joi.string().required(),
  platform: joi.string().required(),
  description: joi.string(),
});

const update = joi.object().keys({
  id: joi.string().required(),
  source: joi
    .object()
    .keys({
      title: joi.string().required(),
      platform: joi.string().required(),
      description: joi.string(),
    })
    .required(),
});

const oneRecord = joi.object().keys({
  id: joi.string().required(),
});

export default { create, update, oneRecord };
