import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS } from "../../../../constants";
import Joi from "joi";

const schema = Joi.object({
  o_c_accredit_advamount     : Joi.number().required(),
  o_c_accredit_starteddate   : Joi.date().required(),
  o_c_accredit_expdate       : Joi.date().required(),
  o_c_accredit_currencycode  : Joi.string().required(),
  o_c_accredit_type          : Joi.string().required(),
  o_c_accredit_interestinperc: Joi.number().required(),
  o_c_accredit_commissionperc: Joi.number().required(),
  o_c_accredit_fee           : Joi.number().required(),
  o_c_accredit_updatedexpdate: Joi.date().allow([null, ""]),
  o_c_accredit_extcount      : Joi.number().required(),
  o_c_accredit_balance       : Joi.number().required(),
  o_c_accredit_isapproved    : Joi.number().allow([null, ""]),
  o_c_accreditmrtnos         : Joi.object({
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
    throw new ValidationError(ERRORS.ACCREDIT_PARSE_ERROR);
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
  } else {
    mrtnos.push({
      ...where,
      relation_id: id,
      type       : "ACCREDIT",
      mrtno      : data.o_c_accreditmrtnos.o_c_accreditmrtno
    });
  }
  if (Array.isArray(data.o_c_accreditrelnos.o_c_accreditrelno)){
    data.o_c_accreditrelnos.o_c_accreditrelno.forEach(item => {
      relnos.push({
        ...where,
        relation_id: id,
        type       : "ACCREDIT",
        relno      : item
      });
    });
  } else {
    relnos.push({
      ...where,
      relation_id: id,
      type       : "ACCREDIT",
      relno      : data.o_c_accreditrelnos.o_c_accreditrelno
    });
  }
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