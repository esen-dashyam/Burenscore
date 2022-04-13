import { method } from "@goodtechsoft/micro-service";
import { asyncPooled, fall, chunkArray } from "../../../utils";
import { dataSync } from "../../../services/v1";
import { request_log as auditService } from "../../../apis/bs_audit_service";
import Joi from "joi";
import { db } from "@goodtechsoft/sequelize-postgres";

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
  console.log(req.user);

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
    date      : new Date()
  }, session);
  console.log("REQUEST===========>", request);
  let errors = [];

  await asyncPooled(1, array, async (data) => {
    let falls = data.map(item =>{
      return async () => {
        let result = await dataSync.main(item, session);
        console.log("====================>", result);
        if (result.error) {
          await auditService.insert_error({
            request_id : request._id,
            register_no: result.error.customer,
            error      : result.error.code,
            date       : new Date(),
          }, session);
          errors.push({
            register_no: result.error.customer,
            error      : result.error.code,
            date       : new Date(),
          });
        }
        await Promise.resolve();
      };
    });
    await fall(falls);
  });

  res.json({
    request_id: request._id,
    errors
  });
});