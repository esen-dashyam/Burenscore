import { method } from "@goodtechsoft/micro-service";
import Joi from "joi";
import check from "../../services/v1/check";

const schema = Joi.object({
  id  : Joi.string().required(),
  type: Joi.string().required(),
});
export default method.post("/test_get", schema, async (req, res, session) => {
  const {
    id,
    type
  } = req.body;
  let result = await check.get({ id: id, type: type }, session);

  res.json(result);
});