import { method } from "@goodtechsoft/micro-service";
import { asyncPooled, fall, chunkArray } from "../../../utils";
import { dataSync } from "../../../services/v1";
import { request_log as auditService } from "../../../apis/bs_audit_service";
import Joi from "joi";

const schema = Joi.object({
  customers: Joi.object({
    customer: Joi.alternatives().try(Joi.array().min(1).required(), Joi.object().required()).required()
  })
});

export default method.post("/sync/insert", schema, async (req, res, session) => {
  const {
    customers : {
      customer
    },
  } = req.body;
  console.log(customer);

  let customers = [];
  if (Array.isArray(customer)){
    customers = customer;
  }
  else {
    customers.push(customer);
  }

  const array = chunkArray(customers, 100);
  let request = await auditService.insert({
    client_id : req.user.client_id,
    partner_id: req.user.partner_id,
    date      : new Date(),
  }, session);

  let errors = [];

  await asyncPooled(1, array, async (data) => {
    let falls = data.map(item =>{
      return async () => {
        let result = await dataSync.main(item, session);
        console.log("========INSERT_API_RESULT============>", result);
        if (result.error) {
          errors.push({
            register_no: result.error.customer,
            error      : result.error.code,
            message    : result.error.message,
            date       : new Date(),
          });
          try {
            auditService.insert_error({
              request_id    : request._id,
              register_no   : result.error.customer,
              error         : result.error.code,
              request_status: "FAILED",
              date          : new Date(),
            }, session);
          } catch (err){
            console.log(err);
          }
        } else {
          console.log("==================================================");
          console.log(request);
          console.log(result.customer.customerInfo.o_c_registerno);
          console.log("==================================================");
          try {
            await auditService.insert_error({
              request_id    : request._id,
              register_no   : result.customer.customerInfo.o_c_registerno,
              request_status: "SUCCESS",
              date          : new Date()
            });
          } catch (err){
            console.log("==================>", err.code.details);
          }

        }
        await Promise.resolve();
      };
    });
    await fall(falls);
  });
  console.log("BEFORE_RES", errors);
  res.json({
    request_id: request._id,
    errors
  });
});