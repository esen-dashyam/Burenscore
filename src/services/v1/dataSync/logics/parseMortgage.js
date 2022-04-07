import moment from "moment";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS } from "../../../../constants";
import Joi from "joi";

const schema = Joi.alternatives().try(Joi.array().items(Joi.object({
  o_c_mrtno                       : Joi.string().required(),
  o_c_mrtno_internal              : Joi.number().required(),
  o_c_mrtcode                     : Joi.string().required(),
  o_c_mrtdescription              : Joi.string().required(),
  o_c_is_real_estate              : Joi.number().required(),
  o_c_dateofvaluation             : Joi.string().allow([null, ""]),
  o_c_mrtvalue                    : Joi.string().required(),
  o_c_mrtmaxlimit                 : Joi.string().required(),
  o_c_customer_firstname          : Joi.string().required(),
  o_c_customer_lastname           : Joi.string().required(),
  o_c_customer_isforeign          : Joi.number().required(),
  o_c_customer_registerno         : Joi.string().required(),
  o_c_organization_orgname        : Joi.string().required(),
  o_c_organization_localregistered: Joi.number().required(),
  o_c_organization_orgregisterno  : Joi.string().required(),
  o_c_organization_stateregisterno: Joi.string().allow([null, ""]),
  o_c_registeredtoauthority       : Joi.string().allow([null, ""]),
  o_c_mrtstateregisterno          : Joi.string().required(),
  o_c_mrtcertificateno            : Joi.string().required(),
  o_c_mrtconfirmeddate            : Joi.date().required(),
  o_c_mrtorgname                  : Joi.string().required(),
  o_c_mrtregistereddatefim        : Joi.date().required(),
  o_c_mrtregisterno               : Joi.string().required(),
  o_c_mrtcertificatenofim         : Joi.string().required(),
  o_c_causetoshiftto              : Joi.string().allow([null, ""]),
  o_c_courtorderdate              : Joi.date().allow([null, ""]),
  o_c_courtorderno                : Joi.string().allow([null, ""]),
})), Joi.object({
  o_c_mrtno                       : Joi.string().required(),
  o_c_mrtno_internal              : Joi.number().required(),
  o_c_mrtcode                     : Joi.string().required(),
  o_c_mrtdescription              : Joi.string().required(),
  o_c_is_real_estate              : Joi.number().required(),
  o_c_dateofvaluation             : Joi.string().allow([null, ""]),
  o_c_mrtvalue                    : Joi.string().required(),
  o_c_mrtmaxlimit                 : Joi.string().required(),
  o_c_customer_firstname          : Joi.string(),
  o_c_customer_lastname           : Joi.string().required(),
  o_c_customer_isforeign          : Joi.number().required(),
  o_c_customer_registerno         : Joi.string().required(),
  o_c_organization_orgname        : Joi.string().required(),
  o_c_organization_localregistered: Joi.number().required(),
  o_c_organization_orgregisterno  : Joi.string().required(),
  o_c_organization_stateregisterno: Joi.string().allow([null, ""]),
  o_c_registeredtoauthority       : Joi.string().allow([null, ""]),
  o_c_mrtstateregisterno          : Joi.string().required(),
  o_c_mrtcertificateno            : Joi.string().required(),
  o_c_mrtconfirmeddate            : Joi.date().required(),
  o_c_mrtorgname                  : Joi.string().required(),
  o_c_mrtregistereddatefim        : Joi.date().required(),
  o_c_mrtregisterno               : Joi.string().required(),
  o_c_mrtcertificatenofim         : Joi.string().required(),
  o_c_causetoshiftto              : Joi.string().allow([null, ""]),
  o_c_courtorderdate              : Joi.date().allow([null, ""]),
  o_c_courtorderno                : Joi.string().allow([null, ""]),
}));

export default async ({ data, where }) => {
  console.log("===========>MRTINFO_DS", data);
  try {
    await schema.validate(data);
  }
  catch (err) {
    console.log(err);
    throw new ValidationError(ERRORS.MRTINFO_PARSE_ERROR);
  }


  // console.log(data);
  let mortgages = [];
  if (Array.isArray(data)){
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
        o_c_mrtconfirmeddate            : moment(item?.o_c_registeredtoauthority?.o_c_mrtconfirmeddate),
        o_c_mrtorgname                  : item?.o_c_authorityofimmovable?.o_c_mrtorgname,
        o_c_mrtregistereddatefim        : moment(item?.o_c_authorityofimmovable?.o_c_mrtregistereddatefim),
        o_c_mrtregisterno               : item?.o_c_authorityofimmovable?.o_c_mrtregisterno,
        o_c_mrtcertificatenofim         : item?.o_c_authorityofimmovable?.o_c_mrtcertificatenofim,
        o_c_causetoshiftto              : item?.o_c_causetoshifttos?.o_c_causetoshiftto,
        o_c_courtorderdate              : item?.o_c_causetoshifttos?.o_c_courtorderdate,
        o_c_courtorderno                : item?.o_c_causetoshifttos?.o_c_courtorderno,
        ...where,
      });
    });
  } else {
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
      o_c_mrtconfirmeddate            : moment(data?.o_c_registeredtoauthority?.o_c_mrtconfirmeddate),
      o_c_mrtorgname                  : data?.o_c_authorityofimmovable?.o_c_mrtorgname,
      o_c_mrtregistereddatefim        : moment(data?.o_c_authorityofimmovable?.o_c_mrtregistereddatefim),
      o_c_mrtregisterno               : data?.o_c_authorityofimmovable?.o_c_mrtregisterno,
      o_c_mrtcertificatenofim         : data?.o_c_authorityofimmovable?.o_c_mrtcertificatenofim,
      ...where,
    });
  }
  return mortgages;
};