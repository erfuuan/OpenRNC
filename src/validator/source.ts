import joi from 'joi';
const create = joi.object().keys({
  title: joi.string().required(),
  platform: joi.string().required().valid('web', 'flutter', 'android', 'ios'),
  description: joi.string(),
  workspaceId: joi.string().required(),
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
