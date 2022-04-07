import moment from "moment";
import Joi from "joi";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS } from "../../../../constants";
import { v4 as uuidv4 } from "uuid";
const schema = Joi.object({
  o_c_guarantee_advamount     : Joi.number().required(),
  o_c_guarantee_starteddate   : Joi.date().required(),
  o_c_guarantee_expdate       : Joi.date().required(),
  o_c_guarantee_currencycode  : Joi.string().required(),
  o_c_guarantee_type          : Joi.string().required(),
  o_c_guarantee_sectorcode    : Joi.string().required(),
  o_c_guarantee_interestinperc: Joi.number().required(),
  o_c_guarantee_commissionperc: Joi.number().required(),
  o_c_guarantee_fee           : Joi.number().required(),
  o_c_guarantee_updatedexpdate: Joi.date().allow([null, ""]),
  o_c_guarantee_extcount      : Joi.number().required(),
  o_c_guarantee_balance       : Joi.number().required(),
  o_c_guarantee_loanclasscode : Joi.string().required(),
}).options({ allowUnknown: true });

export default async ({ data, where }) => {
  if (!data) return null;
  try {
    await schema.validate(data);
  }
  catch (err) {
    console.log(err);
    throw new ValidationError(ERRORS.GUARANTEE_PARSE_ERROR);
  }
  let id = uuidv4();
  let mrtnos = [];
  let relnos = [];
  if (Array.isArray(data.o_c_guaranteemrtnos.o_c_guaranteemrtno)){
    data.o_c_guaranteemrtnos.o_c_guaranteemrtno.forEach(item => {
      mrtnos.push({
        ...where,
        relation_id: id,
        type       : "GUARANTEE",
        mrtno      : item
      });
    });
  } else {
    mrtnos.push({
      ...where,
      relation_id: id,
      type       : "GUARANTEE",
      mrtno      : data.o_c_guaranteemrtnos.o_c_guaranteemrtno
    });
  }
  console.log("==========>", mrtnos);
  if (Array.isArray(data.o_c_guaranteerelnos.o_c_guaranteerelno)){
    data.o_c_guaranteerelnos.o_c_guaranteerelno.forEach(item => {
      relnos.push({
        ...where,
        relation_id: id,
        type       : "GUARANTEE",
        relno      : item
      });
    });
  } else {
    relnos.push({
      ...where,
      relation_id: id,
      type       : "GUARANTEE",
      relno      : data.o_c_guaranteerelnos.o_c_guaranteerelno
    });
  }
  let guarentee = {
    o_c_guarantee_advamount     : data?.o_c_guarantee_advamount,
    o_c_guarantee_starteddate   : moment(data?.o_c_guarantee_starteddate),
    o_c_guaranteemrtnos         : mrtnos,
    o_c_guaranteerelnos         : relnos,
    o_c_guarantee_expdate       : data?.o_c_guarantee_expdate,
    o_c_guarantee_currencycode  : data?.o_c_guarantee_currencycode,
    o_c_guarantee_type          : data?.o_c_guarantee_currencycode,
    o_c_guarantee_sectorcode    : data?.o_c_guarantee_sectorcode,
    o_c_guarantee_interestinperc: data?.o_c_guarantee_interestinperc,
    o_c_guarantee_commissionperc: data?.o_c_guarantee_commissionperc,
    o_c_guarantee_fee           : data?.o_c_guarantee_fee,
    o_c_guarantee_updatedexpdate: data?.o_c_guarantee_updatedexpdate,
    o_c_guarantee_extcount      : data?.o_c_guarantee_extcount,
    o_c_guarantee_balance       : data?.o_c_guarantee_balance,
    o_c_guarantee_loanclasscode : data?.o_c_guarantee_loanclasscode,
    o_c_guarantee_isapproved    : data?.o_c_guarantee_isapproved,
    ...where,
  };
  return guarentee;
};
