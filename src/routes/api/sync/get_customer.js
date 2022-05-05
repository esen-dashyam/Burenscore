import { method } from "@goodtechsoft/micro-service";
import { request as partnerService } from "../../../apis/bs_partner_service";
import Joi from "joi";
import co_owner from "./logics";
import owner from "./logics";

const schema = Joi.object({
  register_no     : Joi.string().max(12).required(),
  report_rel_types: Joi.string().valid(["OWNER", "CO_OWNER"]).required()
});
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
  let count = await partnerService.count({ register_no }, session);
  console.log(count);

  res.json({
    ...result,
    count
  });
});