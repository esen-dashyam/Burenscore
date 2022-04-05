import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS } from "../../../../constants";
import Joi from "joi";

const schema = Joi.object({

});

export default async ({ data, where }) => {
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