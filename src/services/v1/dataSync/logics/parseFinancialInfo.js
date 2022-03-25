import { v4 as uuidv4 } from "uuid";

export default async ({ data, where }) => {
  let financialInfo = {
    id      : uuidv4(),
    o_c_date: data?.o_c_date,
    ...where,
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