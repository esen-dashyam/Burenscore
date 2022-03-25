import { logic } from "@goodtechsoft/micro-service";
import { NotfoundError } from "@goodtechsoft/micro-service/lib/errors";
import { db } from "@goodtechsoft/sequelize-postgres";
import { ERRORS } from "../../../constants";
import { parseAccredit, parseBond, parseCustomer, parseFinancialInfo, parseGuarantee, parseLeasing, parseLoan, parseLoanLine, parseMortgage, parseOnus, parseReceivable, parseRelation, parseShareholder } from "./logics";
import Joi from "joi";

const schema = Joi.object({
  id: Joi.string().guid("uuid").required()
});

export default logic(schema, async (data, session) => {
  let customerInfo = data.o_c_customer_information;
  let shareholderCustomer = customerInfo?.o_shareholdercustomers?.o_shareholdercustomer;
  let shareholderOrg = customerInfo?.o_shareholderorgs?.o_shareholderorg;
  let relationOrg = customerInfo?.o_c_relationorgs?.o_c_relationorg;
  let relationCustomer =customerInfo?.o_c_relationcustomers?.o_c_relationcustomer;
  let financialInfo = data?.o_c_financial_information;
  let loanInfo = data?.o_c_onus_information?.o_c_loan_information;
  let leasingInfo = data?.o_c_onus_information?.o_c_leasing;
  let accreditInfo = data?.o_c_onus_information?.o_c_accredit;
  let guarenteeinfo = data?.o_c_onus_information?.o_c_guarantee;
  let loanLineinfo = data?.o_c_onus_information?.o_c_loanline;
  let receivableInfo =data?.o_c_onus_information?.o_c_receivable;
  let onusInfo = data?.o_c_onus_information?.o_c_onus;
  let bond = data?.o_c_onus_information?.o_bond;
  let mrtInfo = data?.o_c_mortgage_information?.o_c_mortgage; // array orj irne
  let where = {
    o_c_customercode: customerInfo.o_c_customercode,
    o_c_bank_code   : customerInfo.o_c_bankCode,
    o_c_registerno  : customerInfo.o_c_registerno
  };
  let CUSTOMER = {};

  CUSTOMER.customerInfo = await parseCustomer(customerInfo);
  CUSTOMER.shareholderCustomer = await parseShareholder({ data: shareholderCustomer, where, type: "CUSTOMER" });
  CUSTOMER.shareholderOrg = await parseShareholder({ data: shareholderOrg, where, type: "ORG" });
  CUSTOMER.relationOrg = await parseRelation({ data: relationOrg, where, type: "ORG" });
  CUSTOMER.relationCustomer = await parseRelation({ data: relationCustomer, where, type: "CUSTOMER" });
  CUSTOMER.financialInfo = await parseFinancialInfo({ data: financialInfo, where });
  CUSTOMER.loanInfo = await parseLoan({ data: loanInfo, where });
  // Done
  CUSTOMER.leasingInfo = await parseLeasing({ data: leasingInfo, where });
  CUSTOMER.accreditInfo = await parseAccredit({ data: accreditInfo, where });
  CUSTOMER.guarenteeInfo = await parseGuarantee({ data: guarenteeinfo, where });
  CUSTOMER.loanLineInfo = await parseLoanLine({ data: loanLineinfo, where });
  CUSTOMER.receivableInfo = await parseReceivable({ data: receivableInfo, where });
  CUSTOMER.onusInfo = await parseOnus({ data: onusInfo, where });
  CUSTOMER.bondInfo = await parseBond({ data: bond, where });
  CUSTOMER.mrtInfo = await parseMortgage({ data: mrtInfo, where });

  let customer = await db.find(db.Customer, {
    where: where
  }, session);
  if (!customer){
    await db.create(db.Customer, {
      ...CUSTOMER.customerInfo
    }, session);
    await db.bulkCreate(db.OShareholdercustomer, CUSTOMER.shareholderCustomer, session);
    await db.bulkCreate(db.OShareholderorg, CUSTOMER.shareholderOrg, session);
    await db.bulkCreate(db.OCRelationorg, CUSTOMER.relationOrg, session);
    await db.bulkCreate(db.OCRelationcustomer, CUSTOMER.relationCustomer, session);
    await db.create(db.OCFinancialInformation, {
      ...CUSTOMER.financialInfo
    }, session);
    await db.create(db.CBusiness, {
      ...CUSTOMER?.financialInfo?.business
    }, session);
    await db.create(db.CFamily, {
      ...CUSTOMER?.financialInfo?.family
    }, session);
    await db.create(db.CCapital, {
      ...CUSTOMER?.financialInfo?.capital
    }, session);
    await db.create(db.OMReport, {
      ...CUSTOMER?.financialInfo?.o_m_report
    }, session);
    await db.create(db.OReport, {
      ...CUSTOMER?.financialInfo?.o_report
    }, session);
    await db.create(db.OTReport, {
      ...CUSTOMER?.financialInfo?.o_t_report
    }, session);
    // LOAN START
    await db.create(db.OCLoanInformation, {
      ...CUSTOMER.loanInfo
    }, session);
    await db.bulkCreate(db.Mrtno, CUSTOMER.loanInfo.o_c_loanmrtnos, session);
    await db.bulkCreate(db.Relno, CUSTOMER.loanInfo.o_c_loanrelnos, session);
    await db.create(db.NeoInfo, {
      ...CUSTOMER.loanInfo.neoInfo
    }, session);
    await db.bulkCreate(db.Transaction, CUSTOMER.loanInfo.transactions, session);

    await db.create(db.OCLeasing, {
      ...CUSTOMER.leasingInfo
    }, session);
    await db.bulkCreate(db.Mrtno, CUSTOMER.leasingInfo.o_c_loanmrtnos, session);
    await db.bulkCreate(db.Relno, CUSTOMER.leasingInfo.o_c_loanrelnos, session);
    await db.bulkCreate(db.Transaction, CUSTOMER.leasingInfo.transactions, session);
    // LOAN END
    return CUSTOMER;
  }
  if (customer){
    console.log("=====================================================CUSTOMER_EXISTS_ROUTE=====================================================");
    return CUSTOMER;
  }


});
