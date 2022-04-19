import { v4 as uuidv4 } from "uuid";
import Joi from "joi";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS } from "../../../../constants";
import { errors } from "@goodtechsoft/micro-service";

const schema = Joi.object({
  o_c_customercode: Joi.string().min(10).max(20).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "M12310";
          break;
          case "string.min":
          err.message = "10";
          break;
          case "string.max":
          err.message = "20";
          break;
          default :
          break;
      }
    });
    return errors;
  }),
  o_c_loandescription: Joi.string(250).allow([null, ""]).error(errors=> {
    errors.forEach(err=> {
      switch (err.type){
        case "string.max":
          err.message="ME2013-o_c_customer_information-ны loandescription таагийн утгын урт заасан хэмжээнээс хэтэрсэн байна.";
          break;
          default:
          break;
      }
    });
    return errors;
  }),
  o_c_bankCode: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3643-o_c_bankCode таагийн утга нь жагсаалтанд байхгүй байна.";
          break;
          default :
          break;
      }
    });
    return errors;
  }),
  o_c_branchcode                 : Joi.string().allow([null, ""]),
  o_c_isorganization             : Joi.number().required().error(errors=>{
    errors.forEach(err =>{
      switch (err.type){
        case "any.required":
          err.message="ME3637-'o_c_customer_information-ны isorganization таагийн байхгүй учир цааш шалгахгүй.";
          break;
          case"any.number":
          err.message="ME2019.o_c_customer_information-ны isorganization таагийн утга 0 эсвэл 1 биш байна"
          default :
          break;
      }
    });
  }),
  o_c_customername               : Joi.string(100).required().error(errors=> {
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message="ME2020-o_c_customer_information-ны customername тааг байхгүй байна";
          break;
          case"string.max":
          err.message="ME2021-o_c_customer_information-ны customername таагийн утгын урт заасан хэмжээнээс хэтэрсэн байна."
          break;
          default: 
          break;
      }
    })
  }),
  c_lastname                     : Joi.string(50).allow([null, ""]).error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "string.max":
          err.message="ME2022-o_c_customer_information-ны lastname таагийн утгын урт заасан хэмжээнээс хэтэрсэн байна"
          break;
          default:
          break;
      }
    })
  }),
  o_c_isforeign                  : Joi.number().required().error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message="ME2023-o_c_customer_information-ны isforeign тааг байхгүй байна."
          break;
          case "any.number":
          err.message="ME2024-o_c_customer_information-ны isforeign таагийн утга 0 эсвэл 1 биш байна."
          break;
          default:
          break;
      }
    })
}),
  o_c_birthdate                  : Joi.date().allow([null, ""]).error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.date":
          err.message="ME2025-o_c_customer_information-ны birthdate таагийн оруулсан утгын формат буруу байна."
          break;
          default:
          break;
      }
    })
  }),
  o_c_zipcode                    : Joi.string().allow([null, ""]),
  o_c_address                    : Joi.string(300).required().error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message="ME2028-o_c_customer_information-ны address тааг байхгүй байна."
          break;
          case "string.max":
          err.message="ME2029-o_c_customer_information-ны address таагийн утгын урт заасан хэмжээнээс хэтэрсэн байна."
          break;
          default:
          break;
      }
    })
  }),
  o_c_registerno                 : Joi.string().required(),
  o_c_stateregister_passportorno : Joi.string().allow([null, ""]),
  o_c_numofemployee              : Joi.number().allow([null, ""]),
  c_familynumofmembers           : Joi.number().allow([null, ""]),
  c_occupation                   : Joi.string().allow([null, ""]),
  o_fitchrating                  : Joi.string().allow([null, ""]),
  o_sandp_rating                 : Joi.string().allow([null, ""]),
  o_moodysrating                 : Joi.string().allow([null, ""]),
  o_companytypecode              : Joi.string().allow([null, ""]),
  o_c_president_family_firstname : Joi.string().allow([null, ""]),
  o_c_president_family_lastname  : Joi.string().allow([null, ""]),
  o_c_president_family_isforeign : Joi.number().allow([null, ""]),
  o_c_president_family_registerno: Joi.string().allow([null, ""]),
  o_noofshareholders             : Joi.number().allow([null, ""]),
  c_familynumofunemployed        : Joi.number().allow([null, ""]),
  c_job                          : Joi.string().allow([null, ""]),
}).options({ allowUnknown: true });

export default async (customerInfo) => {
  if (!customerInfo) return null;
  try {
    await schema.validate(customerInfo);
  } catch (err){
    console.log("=======================================================");
    console.log(err.details);
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