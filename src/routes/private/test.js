import { method } from "@goodtechsoft/micro-service";
import Joi from "joi";
import check from "../../services/v1/check";

const schema = Joi.object({
  register_no     : Joi.string().required(),
  report_rel_types: Joi.string().required(),
  report_purpose  : Joi.string().required()
});
// USD|RUB|CNY|DEM|GBP|JPY|CHF|ATS|CAD|FRF|HKD|EUR|ITL|KRW|THB|KZT|BGL|KPW|AUD|DKK|SEK|BEF|FIM|INR|TWD|LAK|VND|HUF|SGD|TRL|EGP|CZK|IDR|MYR|KWD
export default method.post("/test", schema, async (req, res, session) => {
  const {
    register_no,
    report_rel_types,
    report_purpose
  } = req.body;


  let { rows, count, customer } = await check.customer({ register_no: register_no, report_rel_types: report_rel_types, report_purpose: report_purpose }, session);

  res.json({
    customer,
    count,
    rows
  });
});