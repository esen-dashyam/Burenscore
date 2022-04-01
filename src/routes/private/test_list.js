import { method } from "@goodtechsoft/micro-service";
import Joi from "joi";
import check from "../../services/v1/check";

const schema = Joi.object({
  filter: Joi.object({
    id: Joi.string().required(),
  }).required(),
  offset: Joi.object({
    page : Joi.number().required(),
    limit: Joi.number().required()
  }).required(),
});
export default method.post("/test_list", schema, async (req, res, session) => {
  const {
    filter, offset
  } = req.body;
  let result = await check.mortgage({ filter, offset }, session);

  res.json(result);
});