import { v4 as uuidv4 } from "uuid";
import Joi from "joi";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERROR_DETAILS } from "../../../../constants";
import APPENDIX_Y from "../../../../constants/APPENDIX_Y";
import APPENDIX_P_FITCH from "../../../../constants/APPENDIX_P_FITCH";
import APPENDIX_R from "../../../../constants/APPENDIX_R";
import APPENDIX_C from "../../../../constants/APPENDIX_C";
import APPENDIX_J from "../../../../constants/APPENDIX_J";

const schema = Joi.object({
  o_c_customercode: Joi.string().max(16).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2011";
          break;
        case "any.empty":
          err.message="ME2011";
          break;
        case "string.max":
          err.message = "ME2012";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_loandescription: Joi.string().optional().max(250).allow([null, ""]).error(errors=> {
    errors.forEach(err=> {
      switch (err.type){
        case "string.max":
          err.message="ME2013";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_c_bankCode: Joi.string().required().max(16).error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2014";
          break;
        case "any.empty":
          err.message = "ME2014";
          break;
        case "string.max":
          err.message="ME2015";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_branchcode: Joi.string().required().max(10).error(errors=>{
    errors.forEach(err =>{
      switch (err.type){
        case "any.empty":
          err.message = "ME2016";
          break;
        case "any.required":
          err.message = "ME2016";
          break;
        case "string.max":
          err.message="ME2017";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_isorganization: Joi.number().integer().min(0).max(1).required().error(errors=>{
    errors.forEach(err =>{
      switch (err.type){
        case "any.required":
          err.message="ME2018";
          break;
        case "any.empty":
          err.message="ME2018";
          break;
        case "number.base":
          err.message="ME2019";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_customername: Joi.string().max(100).required().error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message="ME2020";
          break;
        case "any.empty":
          err.message = "ME2020";
          break;
        case "string.max":
          err.message="ME2021";
          break;
        default:
          break;
      }
    }); return errors;
  }),
  c_lastname: Joi.string().max(50).optional().allow([null, ""])
    .error(errors=>{
      errors.forEach(err=>{
        switch (err.type){
          case "any.empty":
            err.message = "ME2022";
            break;
          case "any.required":
            err.message = "ME2022";
            break;
          case "string.max":
            err.message="ME2022";
            break;
          default:
            break;
        }
      }); return errors;
    }),
  o_c_isforeign: Joi.number().integer().min(0).max(1).required().error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message="ME2023";
          break;
        case "number.base":
          err.message="ME2024";
          break;
          case "number.max":
          err.message="ME2024";
          break;
          case "number.min":
          err.message="ME2024";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_c_birthdate: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required().error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message = "ME2026";
          break;
        case "any.empty":
          err.message="ME2026";
          break;
        case "string.regex.base":
          err.message="ME2027";
          break;
        default:
          break;
      }
    });
    return errors;
  })
    .when("o_c_isforeign", {
      is  : 1,
      then: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]).error(errors=>{
        errors.forEach(err=>{
          switch (err.type){
            case "string.regex.base":
              err.message="ME2027";
              break;
            case "any.empty":
              err.message="ME2026";
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    })
    .when("o_c_isorganization", {
      is  : 1,
      then: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]).error(errors=>{
        errors.forEach(err=>{
          switch (err.type){
            case "string.regex.base":
              err.message="ME2027";
              break;
            case "any.empty":
              err.message="ME2026";
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    }).required().error(errors=>{
      errors.forEach(err=>{
        switch (err.type){
          case "any.required":
            err.message = "ME2026";
            break;
          case "string.regax.base":
            err.message="ME2027";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  o_c_zipcode: Joi.number().optional().allow([null, ""]).error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message = "ME2026";
          break;
        case "number.base":
          err.message="ME2027";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_c_address: Joi.string().max(300).required().error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message="ME2028";
          break;
        case "any.empty":
          err.message="ME2028";
          break;
        case "string.max":
          err.message="ME2029";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_c_registerno: Joi.string().required()
    .when("o_c_isorganization", {
      is  : 0,
      then: Joi.string().regex(/[А-Я||Ү||Ө][А-Я||Ү||Ө][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).required()
    })
    .when("o_c_isorganization", {
      is  : 1,
      then: Joi.string().regex(/[0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).required()
    })
    .when("is_foreign", {
      is  : 1,
      then: Joi.string().required()
    })
    .error(errors=>{
      errors.forEach(err=>{
        switch (err.type){
          case "any.required":
            err.message = "ME2030";
            break;
          case "any.empty":
            err.message="ME2030";
            break;
          case "string.regex.base ":
            err.message="ME2031";
            break;
          default:
            break;
        }
      });
      return errors;
    })
    .when("o_c_isforeign", {
      is  : 1,
      then: Joi.string().optional().allow([null, ""]).error(errors=>{
        errors.forEach(err=>{
          switch (err.type){
            case "string.regex.base":
              err.message="ME2027";
              break;
            case "any.empty":
              err.message="ME2026";
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    })
    .when("o_c_isorganization", {
      is  : 1,
      then: Joi.string().optional().allow([null, ""]).error(errors=>{
        errors.forEach(err=>{
          switch (err.type){
            case "string.regex.base":
              err.message="ME2027";
              break;
            case "any.empty":
              err.message="ME2026";
              break;
            default:
              break;
          }
        });
        return errors;
      }),
    }).required().error(errors=>{
      errors.forEach(err=>{
        switch (err.type){
          case "any.required":
            err.message = "ME2030";
            break;
          case "string.regax.base":
            err.message="ME2027";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  o_c_stateregister_passportorno: Joi.string().optional().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.empty":
          err.message = "ME2031";
          break;
        case "string.max":
          err.message="ME2032";
          break;
        default:
          break;
      }
    });
  }),
  o_c_numofemployee: Joi.number().integer().max(99999).optional().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.empty":
          err.message = "ME2032";
          break;
        case "number.max":
          err.message="ME2033";
          break;
        case "number.integer":
          err.message="ME2034";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  c_familynumofmembers: Joi.number().integer().optional().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.empty":
          err.message = "ME2034";
          break;
        case "number.base":
          err.message="ME2035";
          break;
        case "number.integer":
          err.message="ME2035";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  c_occupation: Joi.string().valid(Object.keys(APPENDIX_Y)).optional().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.empty":
          err.message = "ME2039";
          break;
        case "any.valid":
          err.message = "ME2041";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_fitchrating: Joi.string().valid(Object.keys(APPENDIX_P_FITCH)).optional().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.valid":
          err.message="ME2042";
          break;
        case "string.max":
          err.message="ME2043";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_sandp_rating: Joi.string().valid(Object.keys(APPENDIX_R)).optional().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.valid":
          err.message = "ME2045";
          break;
        case "string.max":
          err.message="ME2044";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_moodysrating: Joi.string().valid(Object.keys(APPENDIX_C)).optional().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.valid":
          err.message = "ME2046";
          break;
        case "string.max":
          err.message="ME2045";
          break;
        default:
          break;
      }
    });
  }),
  o_companytypecode: Joi.string().valid(Object.keys(APPENDIX_J).map(item=>APPENDIX_J[item])).optional().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.valid":
          err.message = "ME2047";
          break;
        case "string.max":
          err.message="ME2046";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_c_president_family_firstname: Joi.string().optional().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.empty":
          err.message = "ME2048";
          break;
        case "string.max":
          err.message="ME2049";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_c_president_family_lastname: Joi.string().optional().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.empty":
          err.message = "ME2050";
          break;
        case "string.max":
          err.message="ME2051";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_c_president_family_isforeign: Joi.number().optional().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.empty":
          err.message = "ME2054";
          break;
        case "string.max":
          err.message="ME2055";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_c_president_family_registerno: Joi.string().optional().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.empty":
          err.message = "ME2058";
          break;
        case "string.max":
          err.message="ME2059";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_noofshareholders: Joi.number().integer().optional().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "number.integer":
          err.message="ME2060"
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  c_familynumofunemployed: Joi.number().integer().optional().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "number.base":
          err.message = "ME2035";
          break;
        case "number.integer":
          err.message="ME2036";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  c_job: Joi.string().max(250).optional().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "string.max":
          err.message="ME2039";
          break;
        default:
          break;  
      }
    });
    return errors;
  }),
}).options({ allowUnknown: true });

export default async (customerInfo) => {
  if (!customerInfo) return null;
  try {
    await schema.validate(customerInfo);
  } catch (err){
    throw new ValidationError(err.details[0].message, ERROR_DETAILS[err.details[0].message]);
  }
  let customer = {
    id                             : uuidv4(),
    o_c_customercode               : customerInfo?.o_c_customercode,
    o_c_loandescription            : customerInfo?.o_c_loandescription,
    o_c_bank_code                  : customerInfo?.o_c_bankCode,
    o_c_branchcode                 : customerInfo?.o_c_branchcode,
    isorganization                 : customerInfo?.isorganization,
    o_c_customername               : customerInfo?.o_c_customername,
    c_lastname                     : customerInfo?.c_lastname,
    o_c_isforeign                  : customerInfo?.o_c_isforeign,
    o_c_birthdate                  : customerInfo?.o_c_birthdate,
    o_c_zipcode                    : customerInfo?.o_c_zipcode,
    o_c_address                    : customerInfo?.o_c_address,
    o_c_registerno                 : customerInfo?.o_c_registerno,
    o_c_stateregister_passportorno : customerInfo?.o_c_stateregister_passportorno,
    o_c_numofemployee              : customerInfo?.o_c_numofemployee,
    c_familynumofmembers           : customerInfo?.c_familynumofmembers,
    c_familynumofunemployed        : customerInfo?.c_familynumofunemployed,
    c_occupation                   : customerInfo?.c_occupation,
    o_fitchrating                  : customerInfo?.o_orgrate?.o_fitchrating,
    o_sandp_rating                 : customerInfo?.o_orgrate?.o_sandp_rating,
    o_moodysrating                 : customerInfo?.o_orgrate?.o_moodysrating,
    o_companytypecode              : customerInfo?.o_companytypecode,
    o_c_president_family_firstname : customerInfo?.o_c_president_family_firstname,
    o_c_president_family_lastname  : customerInfo?.o_c_president_family_lastname,
    o_c_president_family_isforeign : customerInfo?.o_c_president_family_isforeign,
    o_c_president_family_registerno: customerInfo?.o_c_president_family_registerno,
    o_noofshareholders             : customerInfo?.o_noofshareholders,
    c_job                          : customerInfo?.c_job,
  };

  return customer;
};