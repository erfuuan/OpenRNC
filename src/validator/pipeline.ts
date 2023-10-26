import joi from 'joi';

const create = joi.object().keys({
  title: joi.string().required(),
  description: joi.string(),
  workspaceId: joi.string().required(),
  sourceId: joi.string().required(),
  destinationIds: joi.array().items(joi.string()).required(),
});

const update = joi.object().keys({
  id: joi.string().required(),
  title: joi.string().required(),
  description: joi.string(),
  sourceId: joi.string().required(),
  destinationIds: joi.array().required(),
});

const oneRecord = joi.object().keys({
  id: joi.string().required(),
});

export default { create, update, oneRecord };
