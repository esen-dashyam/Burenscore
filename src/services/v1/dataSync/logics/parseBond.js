import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS, ERROR_DETAILS, VALUE_CODES } from "../../../../constants";
import Joi from "joi";
import APPENDIX_PHI from "../../../../constants/APPENDIX_PHI";

const schema = Joi.object({
  o_bond_advamount: Joi.number().max(999999999999999).precision(2).required().error(errors => {
    errors.forEach(err => {
      // console.log("=============saaa========", err.type);
      switch (err.type){
        case "any.required":
          err.message = "ME2061";
          break;
        case "any.empty":
          err.message = "ME2063";
          break;
        case "number.base":
          err.message = "ME2065";
          break;
        case "number.max":
          err.message = "ME2064";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_bondmrtnos: Joi.object({
    o_c_bondmrtno: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string()))
  }).optional().optional().allow([null, ""]),
  o_c_bondrelnos: Joi.object({
    o_c_bondrelno: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string()))
  }).optional().optional().allow([null, ""]),
  o_bond_starteddate: Joi.string()
    .regex(/(^(((\d\d)(([02468][048])|([13579][26]))-02-29)|(((\d\d)(\d\d)))-((((0\d)|(1[0-2]))-((0\d)|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))\s(([01]\d|2[0-3]):([0-5]\d):([0-5]\d))$)/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type){
          case "any.required":
            err.message ="ME2067";
            break;
          case "string.regex.base":
            err.message = "ME2068";
            break;
          default :
            break;
        }
      });
      return errors;
    }),
  o_bond_expdate: Joi.string()
    .regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type){
          case "any.empty":
            err.message = "ME2069";
            break;
          case "string.regex.base":
            err.message = "ME2070";
            break;
          default :
            break;
        }
      });
      return errors;
    }),
  o_bond_currencycode: Joi.string().valid(Object.keys(VALUE_CODES)).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2071";
          break;
        case "any.empty":
          err.message = "ME2071";
          break;
        case "any.valid":
          err.message = "ME2073";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_bond_type: Joi.string().valid(Object.keys(APPENDIX_PHI)).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2074";
          break;
        case "any.empty":
          err.message = "ME2074";
          break;
        case "any.valid":
          err.message = "ME2076";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_bond_bondmarket: Joi.string().max(100).optional().allow([null, ""]).error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2074";
          break;
        case "string.max":
          err.message = "ME2077";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_bond_numberofbonds: Joi.number().integer().max(999999999999999).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.empty":
          err.message = "ME2078";
          break;
        case "number.max":
          err.message = "ME2077";
          break;
        case "number.base":
          err.message = "ME2079";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_bond_bondunitprice: Joi.number().max(999999999999999).precision(2).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2080";
          break;
        case "any.empty":
          err.message = "ME2080";
          break;
        case "number.max":
          err.message = "ME2081";
          break;
        case "number.base":
          err.message = "ME2083";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_bond_interestinperc: Joi.number().max(999999).precision(2).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2084";
          break;
        case "any.empty":
          err.message = "ME2084";
          break;
        case "number.max":
          err.message = "ME2085";
          break;
        case "number.base":
          err.message = "ME2086";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_bond_balance: Joi.number().max(999999999999999).precision(2).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2084";
          break;
        case "any.empty":
          err.message = "ME2084";
          break;
        case "number.max":
          err.message = "ME2085";
          break;
        case "number.base":
          err.message = "ME2086";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_bond_isapproved: Joi.number().integer().min(0).max(1).optional().optional().allow([null, ""]).error(errors=> {
    errors.forEach(err => {
      switch (err.type){
        case "number.base":
          err.message ="Тоо биш байна";
          break;
        case "number.max":
          err.message="Формат буруу байна";
          break;
        case "number.min":
          err.message="Формат буруу байна";
          break;
        case "number.integer":
          err.message="Формат буруу байна";
          break;
        default:
          break;
      }
    });
  })
});

export default async ({ data, where }) => {
  // console.log("------================+>", data);
  if (!data) return null;
  try {
    await schema.validate(data);
  }
  catch (err) {
    console.log(err);
    throw new ValidationError(err.details[0].message, ERROR_DETAILS[err.details[0].message]);
  }

  let id = uuidv4();
  let mrtnos = [];
  let relnos = [];
  if (Array.isArray(data.o_c_bondmrtnos.o_c_bondmrtno)){
    data.o_c_bondmrtnos.o_c_bondmrtno.forEach(item => {
      mrtnos.push({
        ...where,
        relation_id: id,
        type       : "BOND",
        mrtno      : item
      });
    });
  } else if (data.o_c_bondmrtnos.o_c_bondmrtno)
    mrtnos.push({
      ...where,
      relation_id: id,
      type       : "BOND",
      mrtno      : data.o_c_bondmrtnos.o_c_bondmrtno
    });

  if (Array.isArray(data.o_c_bondrelnos.o_c_bondrelno)){
    data.o_c_bondrelnos.o_c_bondrelno.forEach(item => {
      relnos.push({
        ...where,
        relation_id: id,
        type       : "BOND",
        relno      : item
      });
    });
  } else if (data.o_c_bondrelnos.o_c_bondrelno)
    relnos.push({
      ...where,
      relation_id: id,
      type       : "BOND",
      relno      : data.o_c_bondrelnos.o_c_bondrelno
    });



  let bond = {
    id                   : id,
    o_bond_advamount     : data?.o_bond_advamount,
	  o_c_bondmrtnos       : mrtnos,
	  o_c_bondrelnos       : relnos,
	  o_bond_starteddate   : moment(data?.o_bond_starteddate),
	  o_bond_expdate       : data?.o_bond_expdate,
	  o_bond_currencycode  : data?.o_bond_currencycode,
	  o_bond_type          : data?.o_bond_type,
	  o_bond_bondmarket    : data?.o_bond_bondmarket,
	  o_bond_numberofbonds : data?.o_bond_numberofbonds,
	  o_bond_bondunitprice : data?.o_bond_bondunitprice,
	  o_bond_interestinperc: data?.o_bond_interestinperc,
	  o_bond_balance       : data?.o_bond_balance,
	  o_bond_isapproved    : data?.o_bond_isapproved,
    ...where,
  };
  return bond;
};