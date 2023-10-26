import joi from 'joi';

const create = joi.object().keys({
  title: joi.string().required(),
  workspaceId: joi.string().required(),
  platform: joi.string().required().valid('kafka', 'redis', 'mysql', 'mongo', 'webHooks'),
  description: joi.string(),
  credential: joi.object().required(),
});

const update = joi.object().keys({
  id: joi.string().required(),
  destination: joi
    .object()
    .keys({
      title: joi.string().required(),
      platform: joi.string().required(),
      description: joi.string(),
      credential: joi.object().required(),
    })
    .required(),
});

const oneRecord = joi.object().keys({
  id: joi.string().required(),
});

export default { create, update, oneRecord };
