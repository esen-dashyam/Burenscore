import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import moment from "moment";
import Joi from "joi";
import { ERRORS, ERROR_DETAILS } from "../../../../constants";
const schema = Joi.object({
  o_c_loanline_type: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2402";
          break;
        case "any.empty":
          err.message = "ME2404";
          break;
        case "string.max":
          err.message = "ME2403";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_loanline_advamount: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2406";
          break;
        case "any.empty":
          err.message = "ME2406";
          break;
        case "number.max":
          err.message = "ME2407";
          break;
        case "number.base":
          err.message = "ME2409";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_loanline_starteddate: Joi.string()
    .regex(/(^(((\d\d)(([02468][048])|([13579][26]))-02-29)|(((\d\d)(\d\d)))-((((0\d)|(1[0-2]))-((0\d)|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))\s(([01]\d|2[0-3]):([0-5]\d):([0-5]\d))$)/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type){
          case "any.required":
            err.message = "ME2410";
            break;
          case "any.empty":
            err.message = "ME2410";
            break;
          case "string.regex.base":
            err.message = "ME2411";
            break;
          default :
            break;
        }
      });
      return errors;
    }),
  o_c_loanline_expdate: Joi.string()
    .regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type){
          case "any.required":
            err.message = "ME2412";
            break;
          case "any.empty":
            err.message = "ME2412";
            break;
          case "string.regex.base":
            err.message = "ME2413";
            break;
          default :
            break;
        }
      });
      return errors;
    }),
  o_c_loanline_currencycode: Joi.string().max(23).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2414";
          break;
        case "any.empty":
          err.message = "ME2416";
          break;
        case "string.max":
          err.message = "ME2415";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_loanline_sectorcode: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2071";
          break;
        case "any.empty":
          err.message = "ME2073";
          break;
        case "string.max":
          err.message = "ME2072";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_loanline_loaninterest: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3040";
          break;
        case "any.empty":
          err.message = "ME3044";
          break;
        case "number.base":
          err.message = "ME2419";
          break;
        case "number.max":
          err.message = "ME3041";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_loanline_timestoloan: Joi.number().integer(9999).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2421";
          break;
        case "number.integer":
          err.message = "ME2422";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_loanline_extdate: Joi.string()
    .regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().optional().allow([null, ""]).error(errors => {
      errors.forEach(err => {
        // console.log("================AA===========", err.type);
        switch (err.type){
          case "string.regex.base":
            err.message = "ME2413";
            break;
          default :
            break;
        }
      });
      return errors;
    }),
  o_c_loanline_interestinperc: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2424";
          break;
        case "any.empty":
          err.message = "ME2424";
          break;
        case "number.base":
          err.message = "ME2425";
          break;
        case "number.max":
          err.message = "ME2426";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_loanline_commissionperc: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2428";
          break;
        case "any.empty":
          err.message = "ME2428";
          break;
        case "number.base":
          err.message = "ME2430";
          break;
        case "number.max":
          err.message = "ME2429";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_loanline_fee: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2432";
          break;
        case "any.empty":
          err.message = "ME2432";
          break;
        case "number.base":
          err.message = "ME2434";
          break;
        case "number.max":
          err.message = "ME2433";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_loanline_balance: Joi.number().required(),
}).options({ allowUnknown: true });

export default async ({ data, where }) => {
  if (!data) return null;
  // console.log("===========>loanLine", data);
  try {
    await schema.validate(data);
  }
  catch (err) {
    // console.log(err);
    throw new ValidationError(err.details[0].message, ERROR_DETAILS[err.details[0].message]);
  }
  let loanLine = {
    o_c_loanline_type          : data?.o_c_loanline_type,
	  o_c_loanline_cardno        : data?.o_c_loanline_cardno,
	  o_c_loanline_advamount     : data?.o_c_loanline_advamount,
	  o_c_loanline_starteddate   : moment(data?.o_c_loanline_starteddate),
	  o_c_loanline_expdate       : data?.o_c_loanline_expdate,
	  o_c_loanline_currencycode  : data?.o_c_loanline_currencycode,
	  o_c_loanline_sectorcode    : data?.o_c_loanline_sectorcode,
	  o_c_loanline_loaninterest  : data?.o_c_loanline_loaninterest,
	  o_c_loanline_timestoloan   : data?.o_c_loanline_timestoloan,
	  o_c_loanline_extdate       : data?.o_c_loanline_extdate,
	  o_c_loanline_interestinperc: data?.o_c_loanline_interestinperc,
	  o_c_loanline_commissionperc: data?.o_c_loanline_commissionperc,
	  o_c_loanline_fee           : data?.o_c_loanline_fee,
	  o_c_loanline_loanclasscode : data?.o_c_loanline_loanclasscode,
	  o_c_loanline_balance       : data?.o_c_loanline_balance,
	  o_c_loanline_isapproved    : data?.o_c_loanline_isapproved,
    ...where,
  };
  return loanLine;
};