import moment from "moment";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERROR_DETAILS } from "../../../../constants";
import Joi from "joi";
const schemaArray = Joi.array().items(Joi.object({
  o_c_mrtno: Joi.number().precision(2).positive().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2452";
          break;
        case "any.empty":
          err.message="ME2452";
          break;
        case "number.max":
          err.message="ME2453";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtno_internal: Joi.number().required(),
  o_c_mrtcode       : Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2454";
          break;
        case "any.empty":
          err.message="ME2456";
          break;
        case "number.max":
          err.message="ME2455";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtdescription: Joi.string().max(150).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2460";
          break;
        case "any.empty":
          err.message="ME2460";
          break;
        case "string.max":
          err.message="ME2461";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_is_real_estate: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME4022";
          break;
        case "number.base":
          err.message = "ME4023";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_dateofvaluation: Joi.string().optional().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).allow([null, ""]).error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2479";
          break;
        case "any.empty":
          err.message="ME2479";
          break;
        case "string.regex.base":
          err.message="ME2480";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtvalue: Joi.number().precision(2).positive().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2485";
          break;
        case "number.base":
          err.message="ME2487";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtmaxlimit: Joi.number().precision(2).positive().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2485";
          break;
        case "any.empty":
          err.message="ME2485";
          break;
        case "number.max":
          err.message="ME2486";
          break;
        case "number.base":
          err.message="ME2487";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_customer_firstname: Joi.string().max(50).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2489";
          break;
        case "any.empty":
          err.message="ME2489";
          break;
        case "string.max":
          err.message="ME2490";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_customer_lastname: Joi.string().max(50).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.max":
          err.message="ME2491";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_customer_isforeign: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message="ME2492";
          break;
        case "any.empty":
          err.message="ME2492";
          break;
        case "number.base":
          err.message="ME2493";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_customer_registerno: Joi.string().regex(/[А-Я||Ү||Ө][А-Я||Ү||Ө][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2494";
          break;
        case "any.empty":
          err.message="ME2494";
          break;
        case "string.regex.base":
          err.message="ME2495";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_organization_orgname: Joi.string().max(50).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2496";
          break;
        case "any.empty":
          err.message="ME2496";
          break;
        case "string.max":
          err.message="ME2497";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_organization_localregistered: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2498";
          break;
        case "any.empty":
          err.message="ME2498";
          break;
        case "number.base":
          err.message="ME2499";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_organization_orgregisterno: Joi.string().max(16).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2500";
          break;
        case "any.empty":
          err.message="ME2500";
          break;
        case "number.base":
          err.message="ME2501";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_organization_stateregisterno: Joi.string().max(16).optional().allow([null, ""]).error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2502";
          break;
        case "any.empty":
          err.message="ME2502";
          break;
        case "number.base":
          err.message="ME2503";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_registeredtoauthority: Joi.string().optional().allow([null, ""]),
  o_c_mrtstateregisterno   : Joi.string().max(16).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2464";
          break;
        case "any.empty":
          err.message="ME2464";
          break;
        case "date.base":
          err.message="ME2465";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtcertificateno: Joi.string().max(16).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2466";
          break;
        case "any.empty":
          err.message="ME2466";
          break;
        case "string.max":
          err.message="ME2467";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtconfirmeddate: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2468";
          break;
        case "any.empty":
          err.message="ME2468";
          break;
        case "string.regex.base":
          err.message="ME2469";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtorgname: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2470";
          break;
        case "any.empty":
          err.message="ME2472";
          break;
        case "strig.max":
          err.message="ME2471";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtregistereddatefim: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2473";
          break;
        case "any.empty":
          err.message="ME2473";
          break;
        case "string.regex.base":
          err.message="ME2474";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtregisterno: Joi.string().max(20).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2475";
          break;
        case "any.empty":
          err.message="ME2475";
          break;
        case "string.max":
          err.message="ME2476";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtcertificatenofim: Joi.string().max(20).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2477";
          break;
        case "any.empty":
          err.message="ME2477";
          break;
        case "string.max":
          err.message="ME2478";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_causetoshiftto: Joi.string().optional().allow([null, ""]).error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.empty":
          err.message="ME2510";
          break;
        case "string.max":
          err.message="ME2509";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_courtorderdate: Joi.date().optional().allow([null, ""]).error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "date.base":
          err.message="ME2511";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_courtorderno: Joi.string().max(50).optional().allow([null, ""]).error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.max":
          err.message="ME2512";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
})).options({ allowUnknown: true });
const schemaObject = Joi.object({
  o_c_mrtno: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2452";
          break;
        case "any.empty":
          err.message="ME2452";
          break;
        case "string.max":
          err.message="ME2453";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtno_internal: Joi.number().required(),
  o_c_mrtcode       : Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2454";
          break;
        case "any.empty":
          err.message="ME2456";
          break;
        case "string.max":
          err.message="ME2455";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtdescription: Joi.string().max(150).required().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2460";
          break;
        case "any.empty":
          err.message="ME2460";
          break;
        case "string.max":
          err.message="ME2461";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_is_real_estate: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME4022";
          break;
        case "number.base":
          err.message = "ME4023";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_dateofvaluation: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]).error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2479";
          break;
        case "any.empty":
          err.message="ME2479";
          break;
        case "string.regex.base":
          err.message="ME2480";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtvalue: Joi.number().precision(2).positive().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2481";
          break;
        case "number.base":
          err.message = "ME2481";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtmaxlimit: Joi.number().precision(2).positive().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2485";
          break;
        case "number.base":
          err.message="ME2487";
          break;
        // case "number.base":
        //   err.message="ME2487";
        //   break;
        case "number.max":
          err.message="ME2486";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_customer_firstname: Joi.string().max(50).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2489";
          break;
        case "any.empty":
          err.message="ME2489";
          break;
        case "string.max":
          err.message="ME2490";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_customer_lastname: Joi.string().max(50).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.max":
          err.message="ME2491";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_customer_isforeign: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message="ME2492";
          break;
        case "any.empty":
          err.message="ME2492";
          break;
        case "number.base":
          err.message="ME2493";
          break;

        default :
          break;
      }
    });
    return errors;
  }),
  o_c_customer_registerno: Joi.string().regex(/[А-Я||Ү||Ө][А-Я||Ү||Ө][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).max(16).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2494";
          break;
        case "any.empty":
          err.message="ME2489";
          break;
        case "string.regex.base":
          err.message="ME2495";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_organization_orgname: Joi.string().max(50).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2496";
          break;
        case "any.empty":
          err.message="ME2496";
          break;
        case "string.max":
          err.message="ME2497";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_organization_localregistered: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2498";
          break;
        case "any.empty":
          err.message="ME2498";
          break;
        case "number.base":
          err.message="ME2499";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_organization_orgregisterno: Joi.string().max(16).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2500";
          break;
        case "any.empty":
          err.message="ME2500";
          break;
        case "number.base":
          err.message="ME2501";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_organization_stateregisterno: Joi.string().max(16).optional().allow([null, ""]).error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2502";
          break;
        case "any.empty":
          err.message="ME2502";
          break;
        case "number.base":
          err.message="ME2503";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_registeredtoauthority: Joi.string().optional().allow([null, ""]),
  o_c_mrtstateregisterno   : Joi.string().max(20).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2464";
          break;
        case "any.empty":
          err.message="ME2464";
          break;
        case "string.base":
          err.message="ME2465";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtcertificateno: Joi.string().max(20).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2466";
          break;
        case "any.empty":
          err.message="ME2466";
          break;
        case "string.max":
          err.message="ME2467";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtconfirmeddate: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2468";
          break;
        case "any.empty":
          err.message="ME2468";
          break;
        case "string.regex.base":
          err.message="ME2469";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtorgname: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2496";
          break;
        case "any.empty":
          err.message="ME2496";
          break;
        case "string.max":
          err.message="ME2497";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtregistereddatefim: Joi.date().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2473";
          break;
        case "any.empty":
          err.message="ME2473";
          break;
        case "date.base":
          err.message="ME2474";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtregisterno: Joi.string().max(20).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2475";
          break;
        case "any.empty":
          err.message="ME2475";
          break;
        case "string.max":
          err.message="ME2476";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_mrtcertificatenofim: Joi.string().max(20).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2477";
          break;
        case "any.empty":
          err.message="ME2477";
          break;
        case "string.max":
          err.message="ME2478";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_causetoshiftto: Joi.string().optional().allow([null, ""]).error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.empty":
          err.message="ME2510";
          break;
        case "string.max":
          err.message="ME2509";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_courtorderdate: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]).error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.regex.base":
          err.message="ME2511";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_courtorderno: Joi.string().max(50).optional().allow([null, ""]).error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.max":
          err.message="ME2512";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
}).options({ allowUnknown: true });

export default async ({ data, where }) => {
  if (!data) return null;
  let mortgages = [];
  if (Array.isArray(data)){
    try {
      await schemaArray.validate(data);
    }
    catch (err) {
      // console.log("================================", err);
      throw new ValidationError(err.details[0].message, ERROR_DETAILS[err.details[0].message]);
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
    try {
      await schemaObject.validate(data);
    }
    catch (err) {
      // console.log("================================", err);
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