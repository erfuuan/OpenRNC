import joi from "joi";

const schema = joi.object().keys({
  email: joi.string().required(),
  password: joi.string().required(),
});
export default schema;
