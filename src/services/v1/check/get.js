import { logic } from "@goodtechsoft/micro-service";
import { db } from "@goodtechsoft/sequelize-postgres";
import { NotfoundError } from "@goodtechsoft/micro-service/lib/errors";
import Joi from "joi";
import { ERRORS } from "../../../constants";
const schema = Joi.object({
  id  : Joi.string().required(),
  type: Joi.string().required(),
});

export default logic(schema, async (data, session) => {
  const {
    id,
    type,
  } = data;

  let where = {
    id: id,
  };
  let value;
  let customer;
  switch (type){
    case "LOAN": {
      value = await db.find(db.OCLoanInformation, { where: where }, session);
      customer = await db.find(db.Customer, { where: {
        o_c_customercode: value.o_c_customercode,
        o_c_bank_code   : value.o_c_bank_code,
        o_c_registerno  : value.o_c_registerno,
      }, session });
      // console.log("LOAN=================================>", value);
      break;
    }
    case "LEASING": {
      value = await db.find(db.OCLeasing, { where: where }, session);
      // console.log("LEASING=================================>", value);
      customer = await db.find(db.Customer, { where: {
        o_c_customercode: value.o_c_customercode,
        o_c_bank_code   : value.o_c_bank_code,
        o_c_registerno  : value.o_c_registerno,
      }, session });
      break;
    }
    case "ACCREDIT": {
      value = await db.find(db.OCAccredit, { where: where }, session);
      // console.log("ACCREDIT=================================>", value);
      customer = await db.find(db.Customer, { where: {
        o_c_customercode: value.o_c_customercode,
        o_c_bank_code   : value.o_c_bank_code,
        o_c_registerno  : value.o_c_registerno,
      }, session });
      break;
    }
    case "ONUS": {
      value = await db.find(db.OCOnusInformation, { where: where }, session);
      // console.log("ONUS=================================>", value);
      customer = await db.find(db.Customer, { where: {
        o_c_customercode: value.o_c_customercode,
        o_c_bank_code   : value.o_c_bank_code,
        o_c_registerno  : value.o_c_registerno,
      }, session });
      break;
    }
    case "BOND": {
      value = await db.find(db.OBond, { where: where }, session);
      // console.log("BOND=================================>", value);
      customer = await db.find(db.Customer, { where: {
        o_c_customercode: value.o_c_customercode,
        o_c_bank_code   : value.o_c_bank_code,
        o_c_registerno  : value.o_c_registerno,
      }, session });
      break;
    }
    case "GUARANTEE": {
      value = await db.find(db.OCGuarantee, { where: where }, session);
      // console.log("GUARANTEE=================================>", value);
      customer = await db.find(db.Customer, { where: {
        o_c_customercode: value.o_c_customercode,
        o_c_bank_code   : value.o_c_bank_code,
        o_c_registerno  : value.o_c_registerno,
      }, session });
      break;
    }
    case "LOANLINE": {
      value = await db.find(db.OCLoanline, { where: where }, session);
      // console.log("LOANLINE=================================>", value);
      customer = await db.find(db.Customer, { where: {
        o_c_customercode: value.o_c_customercode,
        o_c_bank_code   : value.o_c_bank_code,
        o_c_registerno  : value.o_c_registerno,
      }, session });
      break;
    }
    case "RECEIVABLE": {
      value = await db.find(db.OCReceivable, { where: where }, session);
      // console.log("RECEIVABLE=================================>", value);
      customer = await db.find(db.Customer, { where: {
        o_c_customercode: value.o_c_customercode,
        o_c_bank_code   : value.o_c_bank_code,
        o_c_registerno  : value.o_c_registerno,
      }, session });
      break;
    }
    default: {
      value = null;
      break;
    }
  }
  if (!value) throw new NotfoundError(ERRORS.VALUE_NOTFOUND);

  return ({
    ...value.dataValues,
    customer
  });
});
