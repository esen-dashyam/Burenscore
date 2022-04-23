import { v4 as uuidv4 } from "uuid";
import Joi from "joi";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS } from "../../../../constants";
import { errors } from "@goodtechsoft/micro-service";

const schema = Joi.object({
  o_c_customercode: Joi.string().max(16).required().error(errors => {
    errors.forEach(err => {
      console.log("===============================================================", err.type);
      switch (err.type){
        case "any.empty":
          err.message = "ME2011";
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
  o_c_loandescription: Joi.string().allow([null, ""]).max(200).error(errors=> {
    errors.forEach(err=> {
      switch (err.type){
        case "any.empty":
          err.message = "ME2013";
          break;
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
          err.message = "ME2013";
          break;
        case "any.empty":
          err.message = "ME2013";
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
  o_c_branchcode: Joi.string().allow([null, ""]).max(10).error(errors=>{
    errors.forEach(err =>{
      console.log("===============================", err.type);
      switch (err.type){
        case "any.empty":
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
  o_c_isorganization: Joi.string().regex(/^[0-1]/).max(1).required().error(errors=>{
    errors.forEach(err =>{
      switch (err.type){
        case "string.max":
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
      console.log("------------------", err.type);
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
  c_lastname: Joi.string().allow([null, ""]).error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.empty":
          err.message = "ME2021";
          break;
        case "string.max":
          err.message="ME2022";
          break;
        default:
          break;
      }
    }); return errors;
  }),
  // o_c_isforeign: Joi.number().required().error(errors=>{
  //   errors.forEach(err=>{
  //     switch (err.type){
  //       case "any.required":
  //         err.message="ME2023";
  //         break;
  //       case "any.number":
  //         err.message="ME2024";
  //         break;
  //       default:
  //         break;
  //     }
  //   });
  //   return errors;
  // }),
  o_c_birthdate: Joi.date().allow([null, ""]).error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.date":
          err.message="ME2025";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_c_zipcode: Joi.string().allow([null, ""]),
  o_c_address: Joi.string().required().error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message="ME2028";
          break;
        case "any.empty":
          err.message = "ME2028";
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
  o_c_registerno: Joi.string().required().error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message="ME2030";
          break;
        case "any.empty":
          err.message = "ME2030";
          break;
        case "string.base":
          err.message="ME2031";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_c_stateregister_passportorno: Joi.string().allow([null, ""]).error(errors=> {
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
  o_c_numofemployee: Joi.number().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.empty":
          err.message = "ME2032";
          break;
        case "string.max":
          err.message="ME2033";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  c_familynumofmembers: Joi.number().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.empty":
          err.message = "ME2034";
          break;
        case "string.max":
          err.message="ME2035";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  c_occupation: Joi.string().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.empty":
          err.message = "ME2039";
          break;
        case "string.max":
          err.message="ME2040";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_fitchrating: Joi.string().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.empty":
          err.message = "ME2042";
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
  o_sandp_rating: Joi.string().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.empty":
          err.message = "ME2044";
          break;
        case "string.max":
          err.message="ME2045";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_moodysrating: Joi.string().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.empty":
          err.message = "ME2045";
          break;
        case "string.max":
          err.message="ME2046";
          break;
        default:
          break;
      }
    });
  }),
  o_companytypecode: Joi.string().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.empty":
          err.message = "ME2046";
          break;
        case "string.max":
          err.message="ME2047";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_c_president_family_firstname: Joi.string().allow([null, ""]).error(errors=> {
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
  o_c_president_family_lastname: Joi.string().allow([null, ""]).error(errors=> {
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
  o_c_president_family_isforeign: Joi.number().allow([null, ""]).error(errors=> {
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
  o_c_president_family_registerno: Joi.string().allow([null, ""]).error(errors=> {
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
  o_noofshareholders: Joi.number().allow([null, ""]).error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "string.max":
          err.message="ME2060";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  c_familynumofunemployed: Joi.number().allow([null, ""]),
  c_job                  : Joi.string().allow([null, ""]),
}).options({ allowUnknown: true });

export default async (customerInfo) => {
  if (!customerInfo) return null;
  try {
    await schema.validate(customerInfo);
  } catch (err){
    console.log("=======================================================");
    console.log("==============================================", err);
    console.log("=======================================================");
    throw new ValidationError(err.details[0].message);
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