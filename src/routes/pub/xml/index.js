import { method } from "@goodtechsoft/micro-service";
import { dataSync } from "../../../services/v1";
import Joi from "joi";

const schema = Joi.object({
  customers: Joi.array().max(1000).required(),
});

export default method.post("/zms/loan", schema, async (req, res, session) => {
  const { data
  } = req.body;
  console.log(data);
  await dataSync.syncCustomer(data);
  res.json({});
});