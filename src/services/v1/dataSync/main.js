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
  //  customer info start
  let customerInfo = data.o_c_customer_information;
  let shareholderCustomer;
  let shareholderOrg;
  let relationOrg;
  let relationCustomer;

  //  customer info start
  // financial info start
  let financialInfo = data.o_c_financial_information;
  let business;
  let family;
  let capital;
  let o_m_report;
  let o_report;
  let o_t_report;
  // financial info end
  // zeeliin medeelel start
  let loanInfo;
  let leasingInfo;
  let accreditInfo;
  let guarenteeinfo;
  let loanLineinfo;
  let receivableInfo;
  let bond;
  let neoInfos = [];
  let transactions= [];
  // zeeliin medeelel end
  // baritsaa hurungiin medeelel
  let mrtInfo = data.o_c_mortgage_information.o_c_mortgage;
  // baritsaa hurungiin medeelel

  let customer = await db.fine(db.Customer, {
    where: {
      o_c_customercode: customerInfo.o_c_customercode,
      o_c_bank_code   : customerInfo.o_c_bankCode,
      o_c_registerno  : customerInfo.o_c_registerno }
  }, session);
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
