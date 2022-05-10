import moment from "moment";
import Joi from "joi";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERROR_DETAILS, ERROR_CODES } from "../../../../constants";
const schema = Joi.object({
  c_business: Joi.object({
    c_b_totalsale       : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_b_totalcost       : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_b_totalprofit     : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_b_operatingexpense: Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_b_operatingincome : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_b_otherincome     : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_b_otherexpense    : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_b_profitbeforetax : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_b_tax             : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_b_netprofit       : Joi.number().precision(2).positive().optional().allow([null, ""])
  }).optional().allow([null, ""]),
  c_family: Joi.object({
    c_g_salary        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_g_otherincome   : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_g_totalincome   : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_g_foodexpense   : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_g_expensetolease: Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_g_commexpense   : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_g_otherexpense  : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_g_totalexpense  : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_g_netincome     : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_g_saving        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_g_totalsaving   : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_g_savinghistory : Joi.number().precision(2).positive().optional().allow([null, ""])
  }).optional().allow([null, ""]),
  c_capital: Joi.object({
    c_p_totalasset       : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_p_assettype        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_p_assetcost        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_p_assetdepreciation: Joi.number().precision(2).positive().optional().allow([null, ""]),
    c_p_assetownership   : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_c_onus_information : Joi.number().precision(2).positive().optional().allow([null, ""]),
  }).optional().allow([null, ""]),
  o_m_Report: Joi.object({
    o_m_operatingmoneyflow      : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mu_profitbeforetaxinterest: Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mu_deppressionexpense     : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mu_tax                    : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mu_materialprocurement    : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_m_financemoneyflow        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_ms_receivablechange       : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_ms_shorttimeinvestchange  : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_ms_loanonaccountchange    : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_ms_bankloanchange         : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_ms_longtermsource         : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_ms_interestexpense        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_ms_ownerproperty          : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_ms_earningforshare        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_m_investmoneyflow         : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mh_building               : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mh_equipment              : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mh_furniture              : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mh_othertangible          : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mh_otherintangible        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mh_accumdepression        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_m_totalmoneyflow          : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_m_cashbalance             : Joi.number().precision(2).positive().optional().allow([null, ""])
  }).optional().allow([null, ""]),
  o_Report: Joi.object({
    o_sale                   : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_saleproductcost        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_totalincome            : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_operatingexpense       : Joi.number().precision(2).positive().optional().allow([null, ""]),
    ou_salary                : Joi.number().precision(2).positive().optional().allow([null, ""]),
    ou_leaseexploitexpense   : Joi.number().precision(2).positive().optional().allow([null, ""]),
    ou_advertiseexpense      : Joi.number().precision(2).positive().optional().allow([null, ""]),
    ou_fuelcommexpense       : Joi.number().precision(2).positive().optional().allow([null, ""]),
    ou_insuranceexpense      : Joi.number().precision(2).positive().optional().allow([null, ""]),
    ou_depreciationexpense   : Joi.number().precision(2).positive().optional().allow([null, ""]),
    ou_otherexpense          : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_minoroperincomeexpense : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_minoroperincome        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_minoroperexpense       : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_profitbeforetaxinterest: Joi.number().precision(2).positive().optional().allow([null, ""]),
    oh_interestexpense       : Joi.number().precision(2).positive().optional().allow([null, ""]),
    oh_tax                   : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_netprofit              : Joi.number().precision(2).positive().optional().allow([null, ""])
  }).optional().allow([null, ""]),
  o_t_Report: Joi.object({
    o_t_circulatoryasset        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_te_cash                   : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_te_receivable             : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_te_material               : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_te_shortitmeinvest        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_te_otherasset             : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_t_noncirculatoryasset     : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_tu_building               : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_tu_equipment              : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_tu_furniture              : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_tu_othertangible          : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_tu_otherintangible        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_tu_accumdeppression       : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_t_totalasset              : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_t_shorttimeloan           : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_tb_loanonaccount          : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_tb_bankloan               : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_tb_othershorttime         : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_t_longtimeloan            : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_t_ownerproperty           : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_tz_companyfund            : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_tz_other                  : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_tz_accumprofit            : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_t_debtownerproperty       : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_m_Report                  : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_m_operatingmoneyflow      : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mu_profitbeforetaxinterest: Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mu_deppressionexpense     : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mu_tax                    : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mu_materialprocurement    : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_m_financemoneyflow        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_ms_receivablechange       : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_ms_shorttimeinvestchange  : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_ms_loanonaccountchange    : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_ms_bankloanchange         : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_ms_longtermsource         : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_ms_interestexpense        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_ms_ownerproperty          : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_ms_earningforshare        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_m_investmoneyflow         : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mh_building               : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mh_equipment              : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mh_furniture              : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mh_othertangible          : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mh_otherintangible        : Joi.number().precision(2).positive().optional().allow([null, ""]),
    o_mh_accumdepression        : Joi.number().precision(2).positive().optional().allow([null, ""]),
  }).optional().allow([null, ""]),
}).options({ allowUnknown: true });

export default async ({ data, where }) => {
  if (!data) return null;
  try {
    await schema.validate(data);
  } catch (err){
    // console.log(err);
    throw new ValidationError(ERROR_CODES[err.details[0].context.key][err.details[0].type], ERROR_DETAILS[ERROR_CODES[err.details[0].context.key][err.details[0].type]]);
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

