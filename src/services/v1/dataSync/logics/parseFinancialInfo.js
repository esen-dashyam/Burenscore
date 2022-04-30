import moment from "moment";
import Joi from "joi";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERROR_DETAILS } from "../../../../constants";
const schema = Joi.object({
  c_business: Joi.object({
    c_b_totalsale       : Joi.string().optional().allow([null, ""]),
    c_b_totalcost       : Joi.string().optional().allow([null, ""]),
    c_b_totalprofit     : Joi.string().optional().allow([null, ""]),
    c_b_operatingexpense: Joi.string().optional().allow([null, ""]),
    c_b_operatingincome : Joi.string().optional().allow([null, ""]),
    c_b_otherincome     : Joi.string().optional().allow([null, ""]),
    c_b_otherexpense    : Joi.string().optional().allow([null, ""]),
    c_b_profitbeforetax : Joi.string().optional().allow([null, ""]),
    c_b_tax             : Joi.string().optional().allow([null, ""]),
    c_b_netprofit       : Joi.string().optional().allow([null, ""])
  }).optional().allow([null, ""]),
  c_family: Joi.object({

  }).optional().allow([null, ""]),
  c_capital: Joi.object({

  }).optional().allow([null, ""]),
  o_m_Report: Joi.object({

  }).optional().allow([null, ""]),
  o_Report: Joi.object({

  }).optional().allow([null, ""]),
  o_t_Report: Joi.object({

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