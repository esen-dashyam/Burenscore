import { logic } from "@goodtechsoft/micro-service";
import { db } from "@goodtechsoft/sequelize-postgres";
import { NotfoundError } from "@goodtechsoft/micro-service/lib/errors";
import Joi from "joi";
import { ERRORS } from "../../../constants";
import { co_owner, owner } from "./logics";
const schema = Joi.object({
  register_no     : Joi.string().required(),
  report_rel_types: Joi.string().required(),
  report_purpose  : Joi.string().required()
});

export default logic(schema, async (data, session) => {
  const {
    register_no,
    report_rel_types,
    report_purpose
  } = data;

  // console.log(register_no, report_purpose, report_rel_types);

  let where = {
    o_c_registerno: register_no,
  };


  // if (!customer){
  //   if (register_no.length > 7){
  //     customer = await db.find(db.OCRelationcustomer, { o_c_relationcustomer_registerno: register_no }, session);
  //   } else {
  //     customer = await db.find(db.OCRelationorg, { o_c_relationorg_registerno: register_no }, session);
  //   }
  // }
  if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
  let result;
  let customer;
  if (report_rel_types === "OWNER"){
    customer = await db.find(db.Customer, {
      where: where,
      order: [["created_at", "DESC"]]
    }, session);
    if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
    result = await owner({ where: { ...where } }, session);
  } else {
    if (register_no.length > 7){
      customer = await db.find(db.OCRelationcustomer, { o_c_relationcustomer_registerno: register_no }, session);
    } else {
      customer = await db.find(db.OCRelationorg, { o_c_relationorg_registerno: register_no }, session);
    }
    if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
    result = await co_owner({ where: { ...where } }, session);
  }

  return ({
    count: result.count,
    rows : result.rows,
    customer,
  });
});
