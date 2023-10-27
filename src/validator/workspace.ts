import joi from 'joi';

const update = joi.object().keys({
  name: joi.string(),
  description: joi.string(),
});

export default { update };
