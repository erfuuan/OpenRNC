import joi from 'joi';

const update = joi.object().keys({
  email: joi.string(),
  password: joi.string(),
  jobTitle: joi.string(),
});

export default { update };
