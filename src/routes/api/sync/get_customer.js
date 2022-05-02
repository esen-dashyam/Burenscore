import { method } from "@goodtechsoft/micro-service";
import Joi from "joi";
import co_owner from "./logics";
import owner from "./logics";

const schema = Joi.object({
  register_no     : Joi.string().max(12).required(),
  report_rel_types: Joi.string().valid(["OWNER", "CO_OWNER"]).required()
});
// USD|RUB|CNY|DEM|GBP|JPY|CHF|ATS|CAD|FRF|HKD|EUR|ITL|KRW|THB|KZT|BGL|KPW|AUD|DKK|SEK|BEF|FIM|INR|TWD|LAK|VND|HUF|SGD|TRL|EGP|CZK|IDR|MYR|KWD
export default method.post("/sync/get_customer", schema, async (req, res, session) => {
  const {
    register_no,
    report_rel_types
  } = req.body;

  let result ={};

  if (report_rel_types === "OWNER"){
    result = await owner(register_no, session);
  } else {
    result = await co_owner(register_no, session);
  }

  res.json(result);
});