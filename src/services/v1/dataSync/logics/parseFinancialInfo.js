import moment from "moment";
import Joi from "joi";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERROR_DETAILS } from "../../../../constants";
const schema = Joi.object({
  c_business: Joi.object({
    c_b_totalsale       : Joi.string().allow([null, "", undefined]),
    c_b_totalcost       : Joi.string().allow([null, "", undefined]),
    c_b_totalprofit     : Joi.string().allow([null, "", undefined]),
    c_b_operatingexpense: Joi.string().allow([null, "", undefined]),
    c_b_operatingincome : Joi.string().allow([null, "", undefined]),
    c_b_otherincome     : Joi.string().allow([null, "", undefined]),
    c_b_otherexpense    : Joi.string().allow([null, "", undefined]),
    c_b_profitbeforetax : Joi.string().allow([null, "", undefined]),
    c_b_tax             : Joi.string().allow([null, "", undefined]),
    c_b_netprofit       : Joi.string().allow([null, "", undefined])
  }).allow([null, "", undefined]),
  c_family: Joi.object({

  }).allow([null, "", undefined]),
  c_capital: Joi.object({

  }).allow([null, "", undefined]),
  o_m_Report: Joi.object({

  }).allow([null, "", undefined]),
  o_Report: Joi.object({

  }).allow([null, "", undefined]),
  o_t_Report: Joi.object({

  }).allow([null, "", undefined]),
}).options({ allowUnknown: true });

export default async ({ data, where }) => {
  if (!data) return null;
  try {
    await schema.validate(data);
  } catch (err){
    console.log(err);
    throw new ValidationError(err.details[0].message, ERROR_DETAILS[err.details[0].message]);
  }
  let financialInfo = {
    business: {
      ...data?.c_business,
      ...where
    },
    family: {
      ...data?.c_family,
      ...where
    },
    capital: {
      ...data?.c_capital,
      ...where,
    },
    o_m_report: {
      ...data?.o_m_Report,
      ...where
    },
    o_report: {
      ...data?.o_Report,
      ...where
    },
    o_t_report: {
      ...data?.o_t_Report,
      ...where
    }
  };
  return financialInfo;
};