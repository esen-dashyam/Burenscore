import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS } from "../../../../constants";
import Joi from "joi";
const schema = Joi.object({
  o_bond_advamount: Joi.string().required(),
  o_c_bondmrtnos  : Joi.object({
    o_c_bondmrtno: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string()))
  }).optional().allow([null, ""]),
  o_c_bondrelnos: Joi.object({
    o_c_bondrelno: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string()))
  }).optional().allow([null, ""]),
  o_bond_starteddate   : Joi.date().required(),
  o_bond_expdate       : Joi.date().required(),
  o_bond_currencycode  : Joi.string().required(),
  o_bond_type          : Joi.string().required(),
  o_bond_bondmarket    : Joi.string().allow([null, ""]),
  o_bond_numberofbonds : Joi.number().required(),
  o_bond_bondunitprice : Joi.number().required(),
  o_bond_interestinperc: Joi.number().required(),
  o_bond_balance       : Joi.number().required(),
  o_bond_isapproved    : Joi.number().optional().allow([null, ""])
});

export default async ({ data, where }) => {
  try {
    await schema.validate(data);
  }
  catch (err) {
    console.log(err);
    throw new ValidationError(ERRORS.BOND_PARSE_ERROR);
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
  } else {
    mrtnos.push({
      ...where,
      relation_id: id,
      type       : "BOND",
      mrtno      : data.o_c_bondmrtnos.o_c_bondmrtno
    });
  }
  // console.log("==========>", mrtnos);
  if (Array.isArray(data.o_c_bondrelnos.o_c_bondrelno)){
    data.o_c_bondrelnos.o_c_bondrelno.forEach(item => {
      relnos.push({
        ...where,
        relation_id: id,
        type       : "BOND",
        relno      : item
      });
    });
  } else {
    relnos.push({
      ...where,
      relation_id: id,
      type       : "BOND",
      relno      : data.o_c_bondrelnos.o_c_bondrelno
    });
  }
  // console.log("==========>", relnos);


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