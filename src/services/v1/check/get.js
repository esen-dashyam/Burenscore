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
  switch (type){
    case "LOAN": {
      value = await db.find(db.OCLoanInformation, { where: where }, session);
      // console.log("LOAN=================================>", value);
      break;
    }
    case "LEASING": {
      value = await db.find(db.OCLeasing, { where: where }, session);
      // console.log("LEASING=================================>", value);
      break;
    }
    case "ACCREDIT": {
      value = await db.find(db.OCAccredit, { where: where }, session);
      // console.log("ACCREDIT=================================>", value);
      break;
    }
    case "ONUS": {
      value = await db.find(db.OCOnusInformation, { where: where }, session);
      // console.log("ONUS=================================>", value);
      break;
    }
    case "BOND": {
      value = await db.find(db.OBond, { where: where }, session);
      // console.log("BOND=================================>", value);
      break;
    }
    case "GUARANTEE": {
      value = await db.find(db.OCGuarantee, { where: where }, session);
      // console.log("GUARANTEE=================================>", value);
      break;
    }
    case "LOANLINE": {
      value = await db.find(db.OCLoanline, { where: where }, session);
      // console.log("LOANLINE=================================>", value);
      break;
    }
    case "RECEIVABLE": {
      value = await db.find(db.OCReceivable, { where: where }, session);
      // console.log("RECEIVABLE=================================>", value);
      break;
    }
    default: {
      value = null;
      break;
    }
  }
  if (!value) throw new NotfoundError(ERRORS.VALUE_NOTFOUND);

  return (value);
});
