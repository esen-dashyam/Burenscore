import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERROR_DETAILS, VALUE_CODES, ERROR_CODES } from "../../../../constants";
import Joi from "joi";
import APPENDIX_PHI from "../../../../constants/APPENDIX_PHI";

const schema = Joi.object({
  o_bond_advamount: Joi.number().max(999999999999999).precision(2).required(),
  o_c_bondmrtnos  : Joi.object({
    o_c_bondmrtno: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string()))
  }).optional().optional().allow([null, ""]),
  o_c_bondrelnos: Joi.object({
    o_c_bondrelno: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string()))
  }).optional().optional().allow([null, ""]),
  o_bond_starteddate   : Joi.string().regex(/(^(((\d\d)(([02468][048])|([13579][26]))-02-29)|(((\d\d)(\d\d)))-((((0\d)|(1[0-2]))-((0\d)|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))\s(([01]\d|2[0-3]):([0-5]\d):([0-5]\d))$)/).required(),
  o_bond_expdate       : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
  o_bond_currencycode  : Joi.string().valid(Object.keys(VALUE_CODES).map(item => VALUE_CODES[item])).required(),
  o_bond_type          : Joi.string().valid(Object.keys(APPENDIX_PHI)).required(),
  o_bond_bondmarket    : Joi.string().max(100).optional().allow([null, ""]),
  o_bond_numberofbonds : Joi.number().integer().max(999999999999999).required(),
  o_bond_bondunitprice : Joi.number().max(999999999999999).precision(2).required(),
  o_bond_interestinperc: Joi.number().max(999999).precision(2).required(),
  o_bond_balance       : Joi.number().max(999999999999999).precision(2).required(),
  o_bond_isapproved    : Joi.number().integer().min(0).max(1).optional().optional().allow([null, ""]),
}).options({ allowUnknown: true });

export default async ({ data, where }) => {
  // console.log("------================+>", data);
  if (!data) return null;
  try {
    await schema.validate(data);
  }
  catch (err) {
    console.log(err);
    throw new ValidationError(ERROR_CODES[err.details[0].context.key][err.details[0].type], ERROR_DETAILS[ERROR_CODES[err.details[0].context.key][err.details[0].type]]);
  }

  let id = uuidv4();
  let mrtnos = [];
  let relnos = [];
  if (Array.isArray(data.o_c_bondmrtnos?.o_c_bondmrtno)){
    data.o_c_bondmrtnos.o_c_bondmrtno.forEach(item => {
      mrtnos.push({
        ...where,
        relation_id: id,
        type       : "BOND",
        mrtno      : item
      });
    });
  } else if (data.o_c_bondmrtnos?.o_c_bondmrtno)
    mrtnos.push({
      ...where,
      relation_id: id,
      type       : "BOND",
      mrtno      : data.o_c_bondmrtnos.o_c_bondmrtno
    });

  if (Array.isArray(data.o_c_bondrelnos?.o_c_bondrelno)){
    data.o_c_bondrelnos.o_c_bondrelno.forEach(item => {
      relnos.push({
        ...where,
        relation_id: id,
        type       : "BOND",
        relno      : item
      });
    });
  } else if (data.o_c_bondrelnos?.o_c_bondrelno)
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
	  o_bond_starteddate   : data?.o_bond_starteddate,
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