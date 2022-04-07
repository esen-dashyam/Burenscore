import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import moment from "moment";
import Joi from "joi";
import { ERRORS } from "../../../../constants";
const schema = Joi.object({
  o_c_loanline_type          : Joi.string().required(),
  o_c_loanline_advamount     : Joi.number().required(),
  o_c_loanline_starteddate   : Joi.date().required(),
  o_c_loanline_expdate       : Joi.date().required(),
  o_c_loanline_currencycode  : Joi.string().required(),
  o_c_loanline_sectorcode    : Joi.string().required(),
  o_c_loanline_loaninterest  : Joi.number().required(),
  o_c_loanline_timestoloan   : Joi.date().required(),
  o_c_loanline_extdate       : Joi.date().required(),
  o_c_loanline_interestinperc: Joi.number().required(),
  o_c_loanline_commissionperc: Joi.number().required(),
  o_c_loanline_fee           : Joi.number().required(),
  o_c_loanline_balance       : Joi.number().required(),
}).options({ allowUnknown: true });

export default async ({ data, where }) => {
  if (!data) return null;
  console.log("===========>loanLine", data);
  try {
    await schema.validate(data);
  }
  catch (err) {
    console.log(err);
    throw new ValidationError(ERRORS.LEONLINE_PARSE_ERROR);
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