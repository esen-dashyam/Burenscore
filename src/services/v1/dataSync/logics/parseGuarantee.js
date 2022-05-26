import moment from "moment";
import Joi from "joi";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERROR_DETAILS, VALUE_CODES, ERROR_CODES, APPENDIX } from "../../../../constants";
import { v4 as uuidv4 } from "uuid";
const schema = Joi.object({
  o_c_guarantee_advamount     : Joi.number().max(999999999999999).precision(2).required(),
  o_c_guarantee_starteddate   : Joi.string().regex(/(^(((\d\d)(([02468][048])|([13579][26]))-02-29)|(((\d\d)(\d\d)))-((((0\d)|(1[0-2]))-((0\d)|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))\s(([01]\d|2[0-3]):([0-5]\d):([0-5]\d))$)/).required(),
  o_c_guarantee_expdate       : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
  o_c_guarantee_currencycode  : Joi.string().valid(Object.keys(VALUE_CODES).map(item => VALUE_CODES[item])).required(),
  o_c_guarantee_type          : Joi.string().valid(Object.keys(APPENDIX.APPENDIX_T)).required(),
  o_c_guarantee_sectorcode    : Joi.string().valid(Object.keys(APPENDIX.APPENDIX_A)).required(),
  o_c_guarantee_interestinperc: Joi.number().max(999999).precision(2).required(),
  o_c_guarantee_commissionperc: Joi.number().max(999999999999).precision(2).required(),
  o_c_guarantee_fee           : Joi.number().max(999999999999).precision(2).required(),
  o_c_guarantee_updatedexpdate: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]),
  o_c_guarantee_extcount      : Joi.number().integer().max(99).required(),
  o_c_guarantee_balance       : Joi.number().max(999999999999999).precision(2).required(),
  o_c_guarantee_loanclasscode : Joi.string().valid(Object.keys(APPENDIX.APPENDIX_EO)).required(),
  o_c_guarantee_isapproved    : Joi.number().integer().min(0).max(1).optional().allow([null, ""])
}).options({ allowUnknown: true });

export default async ({ data, where }) => {
  if (!data) return null;
  try {
    await schema.validate(data);
  }
  catch (err) {
    console.log(err);
    // console.log(err);
    throw new ValidationError(ERROR_CODES[err.details[0].context.key][err.details[0].type], ERROR_DETAILS[ERROR_CODES[err.details[0].context.key][err.details[0].type]]);
  }
  let id = uuidv4();
  let mrtnos = [];
  let relnos = [];
  if (Array.isArray(data.o_c_guaranteemrtnos?.o_c_guaranteemrtno)){
    data.o_c_guaranteemrtnos.o_c_guaranteemrtno.forEach(item => {
      mrtnos.push({
        ...where,
        relation_id: id,
        type       : "GUARANTEE",
        mrtno      : item
      });
    });
  } else if (data.o_c_guaranteemrtnos?.o_c_guaranteemrtno)
    mrtnos.push({
      ...where,
      relation_id: id,
      type       : "GUARANTEE",
      mrtno      : data.o_c_guaranteemrtnos.o_c_guaranteemrtno
    });
  // console.log("==========>", mrtnos);
  if (Array.isArray(data?.o_c_guaranteerelnos?.o_c_guaranteerelno)){
    data.o_c_guaranteerelnos.o_c_guaranteerelno.forEach(item => {
      relnos.push({
        ...where,
        relation_id: id,
        type       : "GUARANTEE",
        relno      : item
      });
    });
  } else if (data?.o_c_guaranteerelnos?.o_c_guaranteerelno)
    relnos.push({
      ...where,
      relation_id: id,
      type       : "GUARANTEE",
      relno      : data.o_c_guaranteerelnos.o_c_guaranteerelno
    });
  let guarentee = {
    o_c_guarantee_advamount     : data?.o_c_guarantee_advamount,
    o_c_guarantee_starteddate   : data?.o_c_guarantee_starteddate,
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
