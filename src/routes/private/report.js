import { method } from "@goodtechsoft/micro-service";
import Joi from "joi";
import { co_owner, owner } from "./logics";

const schema = Joi.object({
  register_no: Joi.string().max(12).required(),
});
// USD|RUB|CNY|DEM|GBP|JPY|CHF|ATS|CAD|FRF|HKD|EUR|ITL|KRW|THB|KZT|BGL|KPW|AUD|DKK|SEK|BEF|FIM|INR|TWD|LAK|VND|HUF|SGD|TRL|EGP|CZK|IDR|MYR|KWD
export default method.post("/report", schema, async (req, res, session) => {
  const {
    register_no,
    report_rel_types
  } = req.body;
  console.log("=======================================================================================");
  console.log(report_rel_types);
  console.log("=======================================================================================");
  let result ={};
  if (report_rel_types === "OWNER"){
    result = await owner(register_no, session);
  } else {
    result = await co_owner(register_no, session);
  }
  res.json(result);
});