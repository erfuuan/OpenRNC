import joi from 'joi';

const schema = joi.object().keys({
  email: joi.string().required(),
  password: joi.string().required(),
  jobTitle: joi.string().required(),
  workspaceName: joi.string().min(4).required(),
});
export default schema;
