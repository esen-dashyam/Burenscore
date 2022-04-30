import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS, ERROR_DETAILS } from "../../../../constants";
import Joi from "joi";
import number from "joi/lib/types/number";

const schema = Joi.object({
  o_c_accredit_advamount: Joi.string().regex(/^[0-9]/).max(23).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME7002";
          break;
        case "any.empty":
          err.message = "ME7002";
          break;
        case "string.max":
          err.message = "ME7003";
          break;
        case "string.regex.base":
          err.message = "ME7004";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_accredit_starteddate: Joi.string()
    .regex(/(^(((\d\d)(([02468][048])|([13579][26]))-02-29)|(((\d\d)(\d\d)))-((((0\d)|(1[0-2]))-((0\d)|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))\s(([01]\d|2[0-3]):([0-5]\d):([0-5]\d))$)/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type){
          case "any.required":
            err.message = "ME7006";
            break;
          case "any.empty":
            err.message = "ME7006";
            break;
          case "string.regex.base":
            err.message = "ME7007";
            break;
          default :
            break;
        }
      });
      return errors;
    }),
  o_c_accredit_expdate: Joi.string()
    .regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type){
          case "any.required":
            err.message = "ME7008";
            break;
          case "any.empty":
            err.message = "ME7008";
            break;
          case "string.regex.base":
            err.message = "ME7009";
            break;
          default :
            break;
        }
      });
      return errors;
    }),
  o_c_accredit_currencycode: Joi.string().regex(/^[0-9]/).max(23).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME7010";
          break;
        case "any.empty":
          err.message = "ME7012";
          break;
        case "string.max":
          err.message = "ME7011";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_accredit_type: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME7013";
          break;
        case "any.empty":
          err.message = "ME7015";
          break;
        case "number.max":
          err.message = "ME7014";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_accredit_interestinperc: Joi.string().regex(/^[0-9]/).max(9).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME7016";
          break;
        case "any.empty":
          err.message = "ME7016";
          break;
        case "string.regex.base":
          err.message = "ME7018";
          break;
        case "string.max":
          err.message = "ME7017";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_accredit_commissionperc: Joi.string().regex(/^[0-9]/).max(9).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME7020";
          break;
        case "any.empty":
          err.message = "ME7020";
          break;
        case "string.regex.base":
          err.message = "ME7019";
          break;
        case "string.max":
          err.message = "ME7023";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_accredit_fee: Joi.string().regex(/^[0-9]/).max(15).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME7024";
          break;
        case "any.empty":
          err.message = "ME7024";
          break;
        case "string.regex.base":
          err.message = "ME7026";
          break;
        case "string.max":
          err.message = "ME7025";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_accredit_updatedexpdate: Joi.date().allow([null, ""]).error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "date.format":
          err.message = "ME7027";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_accredit_extcount: Joi.string()
    .regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type){
          case "any.required":
            err.message = "ME7029";
            break;
          case "any.empty":
            err.message = "ME7029";
            break;
          case "string.regex.base":
            err.message = "ME7030";
            break;
          case "string.max":
            err.message = "ME7031";
            break;
          default :
            break;
        }
      });
    }),
  o_c_accredit_balance: Joi.string().regex(/^[0-9]/).max(23).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2084";
          break;
        case "any.empty":
          err.message = "ME2084";
          break;
        case "string.max":
          err.message = "ME2085";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_c_accreditmrtnos: Joi.object({
    o_c_accreditmrtno: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string()))
  }).optional().allow([null, ""]),
  o_c_accreditrelnos: Joi.object({
    o_c_accreditrelno: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string()))
  }).optional().allow([null, ""]),

}).options({ allowUnknown: true });
export default async ({ data, where }) => {
  if (!data) return null;
  try {
    await schema.validate(data);
  } catch (err){
    console.log(err);
    throw new ValidationError(err.details[0].message, ERROR_DETAILS[err.details[0].message]);
  }
  let id = uuidv4();
  let mrtnos = [];
  let relnos = [];
  if (Array.isArray(data.o_c_accreditmrtnos.o_c_accreditmrtno)){
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
  if (Array.isArray(data.o_c_accreditrelnos.o_c_accreditrelno)){
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
    o_c_accredit_starteddate   : moment(data?.o_c_accredit_starteddate),
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