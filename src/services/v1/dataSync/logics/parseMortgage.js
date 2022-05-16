import moment from "moment";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERROR_DETAILS, ERROR_CODES } from "../../../../constants";
import Joi from "joi";
const schemaArray = Joi.array().items(Joi.object({
  o_c_mrtno          : Joi.number().precision(2).positive().required(),
  o_c_mrtno_internal : Joi.number().required(),
  o_c_mrtcode        : Joi.number().required(),
  o_c_mrtdescription : Joi.string().max(150).required(),
  o_c_is_real_estate : Joi.number().required(),
  o_c_dateofvaluation: Joi.string().optional().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).allow([null, ""]),
  o_c_mrtvalue       : Joi.number().precision(2).positive().required(),
  o_c_mrtmaxlimit    : Joi.number().precision(2).positive().required(),
  o_c_customer       : Joi.object({
    o_c_customer_firstname : Joi.string().max(50).required(),
    o_c_customer_lastname  : Joi.string().max(50).required(),
    o_c_customer_isforeign : Joi.number().required(),
    o_c_customer_registerno: Joi.string().regex(/[А-Я||Ү||Ө][А-Я||Ү||Ө][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).required(),
  }).optional().allow([null, ""]),
  o_c_organization: Joi.object({
    o_c_organization_orgname        : Joi.string().max(50).required(),
    o_c_organization_localregistered: Joi.number().required(),
    o_c_organization_orgregisterno  : Joi.string().max(16).required(),
    o_c_organization_stateregisterno: Joi.string().max(16).optional().allow([null, ""]),
  }).optional().allow([null, ""]),
  o_c_registeredtoauthority: Joi.object({
    o_c_registeredtoauthority: Joi.string().optional().allow([null, ""]),
    o_c_mrtstateregisterno   : Joi.string().max(16).required(),
    o_c_mrtcertificateno     : Joi.string().max(16).required(),
    o_c_mrtconfirmeddate     : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
  }).optional().allow([null, ""]),
  o_c_authorityofimmovable: Joi.object({
    o_c_mrtorgname          : Joi.string().required(),
    o_c_mrtregistereddatefim: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
    o_c_mrtregisterno       : Joi.string().max(20).required(),
    o_c_mrtcertificatenofim : Joi.string().max(20).required(),
  }).optional().allow([null, ""]),
  o_c_causetoshifttos: Joi.object({
    o_c_causetoshiftto: Joi.string().optional().allow([null, ""]),
    o_c_courtorderdate: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).allow([null, ""]),
    o_c_courtorderno  : Joi.string().max(50).optional().allow([null, ""]),
  }).optional().allow([null, ""])
})).options({ allowUnknown: true });
const schemaObject = Joi.object({
  o_c_mrtno          : Joi.number().precision(2).positive().required(),
  o_c_mrtno_internal : Joi.number().required(),
  o_c_mrtcode        : Joi.number().required(),
  o_c_mrtdescription : Joi.string().max(150).required(),
  o_c_is_real_estate : Joi.number().required(),
  o_c_dateofvaluation: Joi.string().optional().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).allow([null, ""]),
  o_c_mrtvalue       : Joi.number().precision(2).positive().required(),
  o_c_mrtmaxlimit    : Joi.number().precision(2).positive().required(),
  o_c_customer       : Joi.object({
    o_c_customer_firstname : Joi.string().max(50).required(),
    o_c_customer_lastname  : Joi.string().max(50).required(),
    o_c_customer_isforeign : Joi.number().required(),
    o_c_customer_registerno: Joi.string().regex(/[А-Я||Ү||Ө][А-Я||Ү||Ө][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).required(),
  }).optional().allow([null, ""]),
  o_c_organization: Joi.object({
    o_c_organization_orgname        : Joi.string().max(50).required(),
    o_c_organization_localregistered: Joi.number().required(),
    o_c_organization_orgregisterno  : Joi.string().max(16).required(),
    o_c_organization_stateregisterno: Joi.string().max(16).optional().allow([null, ""]),
  }).optional().allow([null, ""]),
  o_c_registeredtoauthority: Joi.object({
    o_c_registeredtoauthority: Joi.string().optional().allow([null, ""]),
    o_c_mrtstateregisterno   : Joi.string().max(16).required(),
    o_c_mrtcertificateno     : Joi.string().max(16).required(),
    o_c_mrtconfirmeddate     : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
  }).optional().allow([null, ""]),
  o_c_authorityofimmovable: Joi.object({
    o_c_mrtorgname          : Joi.string().required(),
    o_c_mrtregistereddatefim: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
    o_c_mrtregisterno       : Joi.string().max(20).required(),
    o_c_mrtcertificatenofim : Joi.string().max(20).required(),
  }).optional().allow([null, ""]),
  o_c_causetoshifttos: Joi.object({
    o_c_causetoshiftto: Joi.string().optional().allow([null, ""]),
    o_c_courtorderdate: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).allow([null, ""]),
    o_c_courtorderno  : Joi.string().max(50).optional().allow([null, ""]),
  }).optional().allow([null, ""])
}).options({ allowUnknown: true });

export default async ({ data, where }) => {
  if (!data) return null;
  let mortgages = [];
  if (Array.isArray(data)){
    try {
      await schemaArray.validate(data);
    }
    catch (err) {
      console.log(err);
      throw new ValidationError(ERROR_CODES[err.details[0].context.key][err.details[0].type], ERROR_DETAILS[ERROR_CODES[err.details[0].context.key][err.details[0].type]]);
    }
    data.forEach(item => {
      mortgages.push({
        o_c_mrtno                       : item?.o_c_mrtno,
        o_c_mrtno_internal              : item?.o_c_mrtno_internal,
        o_c_mrtcode                     : item?.o_c_mrtcode,
        o_c_mrtdescription              : item?.o_c_mrtdescription,
        o_c_is_real_estate              : item?.o_c_is_real_estate,
        o_c_dateofvaluation             : item?.o_c_dateofvaluation,
        o_c_mrtvalue                    : item?.o_c_mrtvalue,
        o_c_mrtmaxlimit                 : item?.o_c_mrtmaxlimit,
        o_c_customer_firstname          : item?.o_c_customer?.o_c_customer_firstname,
        o_c_customer_lastname           : item?.o_c_customer?.o_c_customer_lastname,
        o_c_customer_isforeign          : item?.o_c_customer?.o_c_customer_isforeign,
        o_c_customer_registerno         : item?.o_c_customer?.o_c_customer_registerno,
        o_c_organization_orgname        : item?.o_c_organization?.o_c_organization_orgname,
        o_c_organization_localregistered: item?.o_c_organization?.o_c_organization_localregistered,
        o_c_organization_orgregisterno  : item?.o_c_organization?.o_c_organization_orgregisterno,
        o_c_organization_stateregisterno: item?.o_c_organization?.o_c_organization_stateregisterno,
        o_c_registeredtoauthority       : item?.o_c_registeredtoauthority?.o_c_registeredtoauthority,
        o_c_mrtstateregisterno          : item?.o_c_registeredtoauthority?.o_c_mrtstateregisterno,
        o_c_mrtcertificateno            : item?.o_c_registeredtoauthority?.o_c_mrtcertificateno,
        o_c_mrtconfirmeddate            : item?.o_c_registeredtoauthority?.o_c_mrtconfirmeddate,
        o_c_mrtorgname                  : item?.o_c_authorityofimmovable?.o_c_mrtorgname,
        o_c_mrtregistereddatefim        : item?.o_c_authorityofimmovable?.o_c_mrtregistereddatefim,
        o_c_mrtregisterno               : item?.o_c_authorityofimmovable?.o_c_mrtregisterno,
        o_c_mrtcertificatenofim         : item?.o_c_authorityofimmovable?.o_c_mrtcertificatenofim,
        o_c_causetoshiftto              : item?.o_c_causetoshifttos?.o_c_causetoshiftto,
        o_c_courtorderdate              : item?.o_c_causetoshifttos?.o_c_courtorderdate,
        o_c_courtorderno                : item?.o_c_causetoshifttos?.o_c_courtorderno,
        ...where,
      });
    });
  } else {
    try {
      await schemaObject.validate(data);
    }
    catch (err) {
      console.log("================================", err);
      throw new ValidationError(err.details[0].message, ERROR_DETAILS[err.details[0].message]);
    }
    mortgages.push({
      o_c_mrtno                       : data?.o_c_mrtno,
      o_c_mrtno_internal              : data?.o_c_mrtno_internal,
      o_c_mrtcode                     : data?.o_c_mrtcode,
      o_c_mrtdescription              : data?.o_c_mrtdescription,
      o_c_is_real_estate              : data?.o_c_is_real_estate,
      o_c_dateofvaluation             : data?.o_c_dateofvaluation,
      o_c_mrtvalue                    : data?.o_c_mrtvalue,
      o_c_mrtmaxlimit                 : data?.o_c_mrtmaxlimit,
      o_c_customer_firstname          : data?.o_c_customer?.o_c_customer_firstname,
      o_c_customer_lastname           : data?.o_c_customer?.o_c_customer_lastname,
      o_c_customer_isforeign          : data?.o_c_customer?.o_c_customer_isforeign,
      o_c_customer_registerno         : data?.o_c_customer?.o_c_customer_registerno,
      o_c_organization_orgname        : data?.o_c_organization?.o_c_organization_orgname,
      o_c_organization_localregistered: data?.o_c_organization?.o_c_organization_localregistered,
      o_c_organization_orgregisterno  : data?.o_c_organization?.o_c_organization_orgregisterno,
      o_c_organization_stateregisterno: data?.o_c_organization?.o_c_organization_stateregisterno,
      o_c_registeredtoauthority       : data?.o_c_registeredtoauthority?.o_c_registeredtoauthority,
      o_c_mrtstateregisterno          : data?.o_c_registeredtoauthority?.o_c_mrtstateregisterno,
      o_c_mrtcertificateno            : data?.o_c_registeredtoauthority?.o_c_mrtcertificateno,
      o_c_mrtconfirmeddate            : data?.o_c_registeredtoauthority?.o_c_mrtconfirmeddate,
      o_c_mrtorgname                  : data?.o_c_authorityofimmovable?.o_c_mrtorgname,
      o_c_mrtregistereddatefim        : data?.o_c_authorityofimmovable?.o_c_mrtregistereddatefim,
      o_c_mrtregisterno               : data?.o_c_authorityofimmovable?.o_c_mrtregisterno,
      o_c_mrtcertificatenofim         : data?.o_c_authorityofimmovable?.o_c_mrtcertificatenofim,
      ...where,
    });
  }
  return mortgages;
};