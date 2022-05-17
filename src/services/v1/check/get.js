import { logic } from "@goodtechsoft/micro-service";
import { db } from "@goodtechsoft/sequelize-postgres";
import { NotfoundError } from "@goodtechsoft/micro-service/lib/errors";
import Joi from "joi";
import { APPENDIX, ERRORS, FORMATTABLE_VARIABLES } from "../../../constants";
const schema = Joi.object({
  id  : Joi.string().required(),
  type: Joi.string().required(),
});

const formatter = (value = {}, model) => {

  const attributes = model.rawAttributes;

  const mapped = Object.keys(attributes).reduce((acc, key) => {
    return {
      ...acc,
      [key]: attributes[key].type.constructor.name
    };
  }, {});

  return {
    ...Object.keys(value).reduce((acc, key) => {
      let attributeType = mapped[key];

      if (attributeType && value[key] && attributeType === "DATE") {
        return {
          ...acc,
          [key]: moment(value[key]).format("YYYY-MM-DD")
        };
      }
      if (FORMATTABLE_VARIABLES[key]){
        return {
          ...acc,
          [key]: APPENDIX[FORMATTABLE_VARIABLES[key]][value[key]] || value[key],
        };
      }
      return {
        ...acc,
        [key]: value[key]
      };
    }, {})
  };
};

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
      value = await db.find(db.OCLoanInformation, { where: where }, session).then(data => formatter(data.dataValues, db.OCLoanInformation));
      customer = await db.find(db.Customer, { where: {
        o_c_customercode: value.o_c_customercode,
        o_c_bank_code   : value.o_c_bank_code,
        o_c_registerno  : value.o_c_registerno,
      }, session });
      // console.log("LOAN=================================>", value);
      break;
    }
    case "LEASING": {
      value = await db.find(db.OCLeasing, { where: where }, session).then(data => formatter(data.dataValues, db.OCLeasing));
      // console.log("LEASING=================================>", value);
      customer = await db.find(db.Customer, { where: {
        o_c_customercode: value.o_c_customercode,
        o_c_bank_code   : value.o_c_bank_code,
        o_c_registerno  : value.o_c_registerno,
      }, session }).then(data, formatter(data, db.Customer));
      break;
    }
    case "ACCREDIT": {
      value = await db.find(db.OCAccredit, { where: where }, session).then(data => formatter(data.dataValues, db.OCAccredit));
      // console.log("ACCREDIT=================================>", value);
      customer = await db.find(db.Customer, { where: {
        o_c_customercode: value.o_c_customercode,
        o_c_bank_code   : value.o_c_bank_code,
        o_c_registerno  : value.o_c_registerno,
      }, session }).then(data, formatter(data, db.Customer));
      break;
    }
    case "ONUS": {
      value = await db.find(db.OCOnusInformation, { where: where }, session).then(data => formatter(data.dataValues, db.OCOnusInformation));
      // console.log("ONUS=================================>", value);
      customer = await db.find(db.Customer, { where: {
        o_c_customercode: value.o_c_customercode,
        o_c_bank_code   : value.o_c_bank_code,
        o_c_registerno  : value.o_c_registerno,
      }, session }).then(data, formatter(data, db.Customer));
      break;
    }
    case "BOND": {
      value = await db.find(db.OBond, { where: where }, session).then(data => formatter(data.dataValues, db.OBond));
      // console.log("BOND=================================>", value);
      customer = await db.find(db.Customer, { where: {
        o_c_customercode: value.o_c_customercode,
        o_c_bank_code   : value.o_c_bank_code,
        o_c_registerno  : value.o_c_registerno,
      }, session }).then(data, formatter(data, db.Customer));
      break;
    }
    case "GUARANTEE": {
      value = await db.find(db.OCGuarantee, { where: where }, session).then(data => formatter(data.dataValues, db.OCGuarantee));
      // console.log("GUARANTEE=================================>", value);
      customer = await db.find(db.Customer, { where: {
        o_c_customercode: value.o_c_customercode,
        o_c_bank_code   : value.o_c_bank_code,
        o_c_registerno  : value.o_c_registerno,
      }, session }).then(data, formatter(data, db.Customer));
      break;
    }
    case "LOANLINE": {
      value = await db.find(db.OCLoanline, { where: where }, session).then(data, formatter(data.dataValues, db.OCLoanline));
      // console.log("LOANLINE=================================>", value);
      customer = await db.find(db.Customer, { where: {
        o_c_customercode: value.o_c_customercode,
        o_c_bank_code   : value.o_c_bank_code,
        o_c_registerno  : value.o_c_registerno,
      }, session }).then(data, formatter(data, db.Customer));
      break;
    }
    case "RECEIVABLE": {
      value = await db.find(db.OCReceivable, { where: where }, session).then(data => formatter(data.dataValues, db.OCReceivable));
      // console.log("RECEIVABLE=================================>", value);
      customer = await db.find(db.Customer, { where: {
        o_c_customercode: value.o_c_customercode,
        o_c_bank_code   : value.o_c_bank_code,
        o_c_registerno  : value.o_c_registerno,
      }, session }).then(data, formatter(data, db.Customer));
      break;
    }
    default: {
      value = null;
      break;
    }
  }
  if (!value) throw new NotfoundError(ERRORS.VALUE_NOTFOUND);

  return ({
    ...value,
    customer
  });
});
