import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv();

const auth: any = {
  type: "object",
  properties: {
    email: { type: "integer", nullable: false },
    password: { type: "string", nullable: false },
  },
  required: ["email", "password"],
  additionalProperties: false,
};


export default auth