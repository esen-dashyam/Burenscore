import { logic } from "@goodtechsoft/micro-service";
import { NotfoundError } from "@goodtechsoft/micro-service/lib/errors";
import { db } from "@goodtechsoft/sequelize-postgres";
import { ERRORS } from "../../../constants";
import { parseCustomer } from "./logics";
import Joi from "joi";

const schema = Joi.object({
  id: Joi.string().guid("uuid").required()
});

export default logic(schema, async (data, session) => {
  let customerInfo = data.o_c_customer_information;
  let financialInfo = data.o_c_financial_information;
  let mrtInfo = data.o_c_mortgage_information.o_c_mortgage;
  let customer = await db.findOne(db.Customer, { o_c_customercode: customerInfo.o_c_customercode, o_c_bank_code: customerInfo.o_c_bankCode, o_c_registerno: customerInfo.o_c_registerno }, session);
  if (!customer){
    console.log("=====================================================CUSTOMER_NOT_EXISTS_ROUTE=====================================================");
    let newCustomer = await parseCustomer(customerInfo);
  }
  else if (customer){
    console.log("=====================================================CUSTOMER_EXISTS_ROUTE=====================================================");
    console.log(data);
  }
  return {};
});
