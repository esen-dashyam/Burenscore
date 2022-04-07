import { method } from "@goodtechsoft/micro-service";
import { request_log as auditService } from "../../../apis/bs_audit_service";
import Joi from "joi";

const schema = Joi.object({
  request_id: Joi.string().max(55).required()
});

export default method.post("/sync/check_result", schema, async (req, res, session) => {
  const {
    request_id
  } = req.body;

  let result = await auditService.check_result({
    request_id: request_id
  }, session);
  let status;

  if (result.length ===0){
    status = "NO_ERRORS";
  } else {
    status = "ERRORS_FOUND";
  }

  res.json({
    status,
    result
  });
});