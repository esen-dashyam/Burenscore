import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS, ERROR_DETAILS, VALUE_CODES, ERROR_CODES } from "../../../../constants";
import Joi from "joi";
import APPENDIX_E from "../../../../constants/APPENDIX_E";

const schema = Joi.object({
  o_c_accredit_advamount  : Joi.number().max(999999999999999).precision(2).required(),
  o_c_accredit_starteddate: Joi.string()
    .regex(/(^(((\d\d)(([02468][048])|([13579][26]))-02-29)|(((\d\d)(\d\d)))-((((0\d)|(1[0-2]))-((0\d)|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))\s(([01]\d|2[0-3]):([0-5]\d):([0-5]\d))$)/).required(),
  o_c_accredit_expdate       : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
  o_c_accredit_currencycode  : Joi.string().valid(Object.keys(VALUE_CODES).map(item => VALUE_CODES[item])).required(),
  o_c_accredit_type          : Joi.string().valid(Object.keys(APPENDIX_E)).required(),
  o_c_accredit_interestinperc: Joi.number().max(999999).precision(2).required(),
  o_c_accredit_commissionperc: Joi.number().max(999999999999).precision(2).required(),
  o_c_accredit_fee           : Joi.number().max(999999999999).precision(2).required(),
  o_c_accredit_updatedexpdate: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]),
  o_c_accredit_extcount      : Joi.number().integer().required(),
  o_c_accredit_balance       : Joi.number().max(999999999999999).precision(2).required(),
  o_c_accreditmrtnos         : Joi.object({
    o_c_accreditmrtno: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())),
  }).optional().optional().allow([null, ""]),
  o_c_accreditrelnos: Joi.object({
    o_c_accreditrelno: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())),
  }).optional().optional().allow([null, ""]),

}).options({ allowUnknown: true });
export default async ({ data, where }) => {
  if (!data) return null;
  try {
    await schema.validate(data);
  } catch (err){
    console.log(err);
    throw new ValidationError(ERROR_CODES[err.details[0].context.key][err.details[0].type], ERROR_DETAILS[ERROR_CODES[err.details[0].context.key][err.details[0].type]]);
  }

  let id = uuidv4();
  let mrtnos = [];
  let relnos = [];
  if (Array.isArray(data.o_c_accreditmrtnos?.o_c_accreditmrtno)){
    data.o_c_accreditmrtnos.o_c_accreditmrtno.forEach(item => {
      mrtnos.push({
        ...where,
        relation_id: id,
        type       : "ACCREDIT",
        mrtno      : item
      });
    });
  } else if (data?.o_c_accreditmrtnos?.o_c_accreditmrtno)
    mrtnos.push({
      ...where,
      relation_id: id,
      type       : "ACCREDIT",
      mrtno      : data.o_c_accreditmrtnos.o_c_accreditmrtno
    });
  if (Array.isArray(data.o_c_accreditrelnos?.o_c_accreditrelno)){
    data.o_c_accreditrelnos.o_c_accreditrelno.forEach(item => {
      relnos.push({
        ...where,
        relation_id: id,
        type       : "ACCREDIT",
        relno      : item
      });
    });
  } else if (data?.o_c_accreditrelnos?.o_c_accreditrelno)
    relnos.push({
      ...where,
      relation_id: id,
      type       : "ACCREDIT",
      relno      : data.o_c_accreditrelnos.o_c_accreditrelno
    });
  let accredit = {
    id                         : id,
    o_c_accredit_advamount     : data?.o_c_accredit_advamount,
    o_c_accredit_starteddate   : data?.o_c_accredit_starteddate,
    o_c_accredit_expdate       : data?.o_c_accredit_expdate,
    o_c_accredit_currencycode  : data?.o_c_accredit_currencycode,
    o_c_accredit_type          : data?.o_c_accredit_type,
    o_c_accredit_interestinperc: data?.o_c_accredit_interestinperc,
    o_c_accredit_commissionperc: data?.o_c_accredit_commissionperc,
    o_c_accredit_fee           : data?.o_c_accredit_fee,
    o_c_accredit_updatedexpdate: data?.o_c_accredit_updatedexpdate,
    o_c_accredit_extcount      : data?.o_c_accredit_extcount,
    o_c_accredit_balance       : data?.o_c_accredit_balance,
    o_c_accredit_isapproved    : data?.o_c_accredit_isapproved,
    o_c_accreditmrtnos         : mrtnos,
    o_c_accreditrelnos         : relnos,
    ...where,
  };
  return accredit;
};