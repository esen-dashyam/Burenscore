import moment from "moment";
import Joi from "joi";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERROR_DETAILS } from "../../../../constants";
const schema = Joi.object({
  c_business: Joi.object({
    c_b_totalsale       : Joi.number().precision(2).positive().optional().allow([null, ""]),
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
    c_g_salary        : Joi.string().optional().allow([null, ""]),
    c_g_otherincome   : Joi.string().optional().allow([null, ""]),
    c_g_totalincome   : Joi.string().optional().allow([null, ""]),
    c_g_foodexpense   : Joi.string().optional().allow([null, ""]),
    c_g_expensetolease: Joi.string().optional().allow([null, ""]),
    c_g_commexpense   : Joi.string().optional().allow([null, ""]),
    c_g_otherexpense  : Joi.string().optional().allow([null, ""]),
    c_g_totalexpense  : Joi.string().optional().allow([null, ""]),
    c_g_netincome     : Joi.string().optional().allow([null, ""]),
    c_g_saving        : Joi.string().optional().allow([null, ""]),
    c_g_totalsaving   : Joi.string().optional().allow([null, ""]),
    c_g_savinghistory : Joi.string().optional().allow([null, ""])
  }).optional().allow([null, ""]),
  c_capital: Joi.object({
    c_p_totalasset       : Joi.string().optional().allow([null, ""]),
    c_p_assettype        : Joi.string().optional().allow([null, ""]),
    c_p_assetcost        : Joi.string().optional().allow([null, ""]),
    c_p_assetdepreciation: Joi.string().optional().allow([null, ""]),
    c_p_assetownership   : Joi.string().optional().allow([null, ""]),
    o_c_onus_information : Joi.string().optional().allow([null, ""]),
  }).optional().allow([null, ""]),
  o_m_Report: Joi.object({
    o_m_operatingmoneyflow      : Joi.string().optional().allow([null, ""]),
    o_mu_profitbeforetaxinterest: Joi.string().optional().allow([null, ""]),
    o_mu_deppressionexpense     : Joi.string().optional().allow([null, ""]),
    o_mu_tax                    : Joi.string().optional().allow([null, ""]),
    o_mu_materialprocurement    : Joi.string().optional().allow([null, ""]),
    o_m_financemoneyflow        : Joi.string().optional().allow([null, ""]),
    o_ms_receivablechange       : Joi.string().optional().allow([null, ""]),
    o_ms_shorttimeinvestchange  : Joi.string().optional().allow([null, ""]),
    o_ms_loanonaccountchange    : Joi.string().optional().allow([null, ""]),
    o_ms_bankloanchange         : Joi.string().optional().allow([null, ""]),
    o_ms_longtermsource         : Joi.string().optional().allow([null, ""]),
    o_ms_interestexpense        : Joi.string().optional().allow([null, ""]),
    o_ms_ownerproperty          : Joi.string().optional().allow([null, ""]),
    o_ms_earningforshare        : Joi.string().optional().allow([null, ""]),
    o_m_investmoneyflow         : Joi.string().optional().allow([null, ""]),
    o_mh_building               : Joi.string().optional().allow([null, ""]),
    o_mh_equipment              : Joi.string().optional().allow([null, ""]),
    o_mh_furniture              : Joi.string().optional().allow([null, ""]),
    o_mh_othertangible          : Joi.string().optional().allow([null, ""]),
    o_mh_otherintangible        : Joi.string().optional().allow([null, ""]),
    o_mh_accumdepression        : Joi.string().optional().allow([null, ""]),
    o_m_totalmoneyflow          : Joi.string().optional().allow([null, ""]),
    o_m_cashbalance             : Joi.string().optional().allow([null, ""])
  }).optional().allow([null, ""]),
  o_Report: Joi.object({
    o_sale                   : Joi.string().optional().allow([null, ""]),
    o_saleproductcost        : Joi.string().optional().allow([null, ""]),
    o_totalincome            : Joi.string().optional().allow([null, ""]),
    o_operatingexpense       : Joi.string().optional().allow([null, ""]),
    ou_salary                : Joi.string().optional().allow([null, ""]),
    ou_leaseexploitexpense   : Joi.string().optional().allow([null, ""]),
    ou_advertiseexpense      : Joi.string().optional().allow([null, ""]),
    ou_fuelcommexpense       : Joi.string().optional().allow([null, ""]),
    ou_insuranceexpense      : Joi.string().optional().allow([null, ""]),
    ou_depreciationexpense   : Joi.string().optional().allow([null, ""]),
    ou_otherexpense          : Joi.string().optional().allow([null, ""]),
    o_minoroperincomeexpense : Joi.string().optional().allow([null, ""]),
    o_minoroperincome        : Joi.string().optional().allow([null, ""]),
    o_minoroperexpense       : Joi.string().optional().allow([null, ""]),
    o_profitbeforetaxinterest: Joi.string().optional().allow([null, ""]),
    oh_interestexpense       : Joi.string().optional().allow([null, ""]),
    oh_tax                   : Joi.string().optional().allow([null, ""]),
    o_netprofit              : Joi.string().optional().allow([null, ""])
  }).optional().allow([null, ""]),
  o_t_Report: Joi.object({
    o_t_circulatoryasset        : Joi.string().optional().allow([null, ""]),
    o_te_cash                   : Joi.string().optional().allow([null, ""]),
    o_te_receivable             : Joi.string().optional().allow([null, ""]),
    o_te_material               : Joi.string().optional().allow([null, ""]),
    o_te_shortitmeinvest        : Joi.string().optional().allow([null, ""]),
    o_te_otherasset             : Joi.string().optional().allow([null, ""]),
    o_t_noncirculatoryasset     : Joi.string().optional().allow([null, ""]),
    o_tu_building               : Joi.string().optional().allow([null, ""]),
    o_tu_equipment              : Joi.string().optional().allow([null, ""]),
    o_tu_furniture              : Joi.string().optional().allow([null, ""]),
    o_tu_othertangible          : Joi.string().optional().allow([null, ""]),
    o_tu_otherintangible        : Joi.string().optional().allow([null, ""]),
    o_tu_accumdeppression       : Joi.string().optional().allow([null, ""]),
    o_t_totalasset              : Joi.string().optional().allow([null, ""]),
    o_t_shorttimeloan           : Joi.string().optional().allow([null, ""]),
    o_tb_loanonaccount          : Joi.string().optional().allow([null, ""]),
    o_tb_bankloan               : Joi.string().optional().allow([null, ""]),
    o_tb_othershorttime         : Joi.string().optional().allow([null, ""]),
    o_t_longtimeloan            : Joi.string().optional().allow([null, ""]),
    o_t_ownerproperty           : Joi.string().optional().allow([null, ""]),
    o_tz_companyfund            : Joi.string().optional().allow([null, ""]),
    o_tz_other                  : Joi.string().optional().allow([null, ""]),
    o_tz_accumprofit            : Joi.string().optional().allow([null, ""]),
    o_t_debtownerproperty       : Joi.string().optional().allow([null, ""]),
    o_m_Report                  : Joi.string().optional().allow([null, ""]),
    o_m_operatingmoneyflow      : Joi.string().optional().allow([null, ""]),
    o_mu_profitbeforetaxinterest: Joi.string().optional().allow([null, ""]),
    o_mu_deppressionexpense     : Joi.string().optional().allow([null, ""]),
    o_mu_tax                    : Joi.string().optional().allow([null, ""]),
    o_mu_materialprocurement    : Joi.string().optional().allow([null, ""]),
    o_m_financemoneyflow        : Joi.string().optional().allow([null, ""]),
    o_ms_receivablechange       : Joi.string().optional().allow([null, ""]),
    o_ms_shorttimeinvestchange  : Joi.string().optional().allow([null, ""]),
    o_ms_loanonaccountchange    : Joi.string().optional().allow([null, ""]),
    o_ms_bankloanchange         : Joi.string().optional().allow([null, ""]),
    o_ms_longtermsource         : Joi.string().optional().allow([null, ""]),
    o_ms_interestexpense        : Joi.string().optional().allow([null, ""]),
    o_ms_ownerproperty          : Joi.string().optional().allow([null, ""]),
    o_ms_earningforshare        : Joi.string().optional().allow([null, ""]),
    o_m_investmoneyflow         : Joi.string().optional().allow([null, ""]),
    o_mh_building               : Joi.string().optional().allow([null, ""]),
    o_mh_equipment              : Joi.string().optional().allow([null, ""]),
    o_mh_furniture              : Joi.string().optional().allow([null, ""]),
    o_mh_othertangible          : Joi.string().optional().allow([null, ""]),
    o_mh_otherintangible        : Joi.string().optional().allow([null, ""]),
    o_mh_accumdepression        : Joi.string().optional().allow([null, ""]),
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