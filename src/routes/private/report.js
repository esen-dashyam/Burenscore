import { method } from "@goodtechsoft/micro-service";
import Joi from "joi";
import { co_owner, owner } from "./logics";

const schema = Joi.object({
  register_no     : Joi.string().max(12).required(),
  report_rel_types: Joi.string().valid(["OWNER", "CO_OWNER"]).required()
});
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