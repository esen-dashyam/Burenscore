import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERROR_DETAILS, ERROR_CODES } from "../../../../constants";
import Joi from "joi";

const customerSchemaObject = Joi.object({
  o_shareholder_firstname    : Joi.string().max(50).required(),
  o_shareholder_lastname     : Joi.string().required(),
  o_shareholdercus_isforeign : Joi.number().required(),
  o_shareholdercus_registerno: Joi.string().regex(/[А-Я||Ү||Ө][А-Я||Ү||Ө][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).required(),
}).options({ allowUnknown: true });
const customerSchemaArray = Joi.array().items(Joi.object({
  o_shareholder_firstname    : Joi.string().max(50).required(),
  o_shareholder_lastname     : Joi.string().required(),
  o_shareholdercus_isforeign : Joi.number().required(),
  o_shareholdercus_registerno: Joi.string().regex(/[А-Я||Ү||Ө][А-Я||Ү||Ө][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).required(),
})).options({ allowUnknown: true });

const orgSchemaObject = Joi.object({
  o_shareholder_orgname        : Joi.string().max(50).required(),
  o_shareholderorg_isforeign   : Joi.number().required(),
  o_shareholderorg_registerno  : Joi.string().regex(/[0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).required(),
  o_shareholder_stateregisterno: Joi.string().required(), // Код байхгүй
}).options({ allowUnknown: true });
const orgSchemaArray = Joi.array().items(Joi.object({
  o_shareholder_orgname        : Joi.string().max(50).required(),
  o_shareholderorg_isforeign   : Joi.number().required(),
  o_shareholderorg_registerno  : Joi.string().regex(/[0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).required(),
  o_shareholder_stateregisterno: Joi.string().required(), // Код байхгүй
})).options({ allowUnknown: true });

export default async ({ data, where, type }) => {
  if (!data) return null;
  let shareholder = [];
  if (type === "CUSTOMER"){
    if (Array.isArray(data)){
      try {
        await customerSchemaArray.validate(data);
      }
      catch (err) {
        console.log(err);
        throw new ValidationError(ERROR_CODES[err.details[0].context.key][err.details[0].type], ERROR_DETAILS[ERROR_CODES[err.details[0].context.key][err.details[0].type]]);
      }
      data.forEach(item => {
        shareholder.push({
          ...where,
          o_shareholder_firstname    : item?.o_shareholder_firstname,
          o_shareholder_lastname     : item?.o_shareholder_lastname,
          o_shareholdercus_isforeign : item?.o_shareholdercus_isforeign,
          o_shareholdercus_registerno: item?.o_shareholdercus_registerno,
        });
      });
    } else {
      try {
        await customerSchemaObject.validate(data);
      }
      catch (err) {
        console.log(err);
        // console.log("================================", err);
        throw new ValidationError(ERROR_CODES[err.details[0].context.key][err.details[0].type], ERROR_DETAILS[ERROR_CODES[err.details[0].context.key][err.details[0].type]]);
      }
      shareholder.push({
        ...where,
        o_shareholder_firstname    : data?.o_shareholder_firstname,
        o_shareholder_lastname     : data?.o_shareholder_lastname,
        o_shareholdercus_isforeign : data?.o_shareholdercus_isforeign,
        o_shareholdercus_registerno: data?.o_shareholdercus_registerno,
      });
    }
  }
  if (type === "ORG"){
    if (Array.isArray(data)){
      try {
        await orgSchemaArray.validate(data);
      }
      catch (err) {
        console.log(err);
        // console.log("================================", err);
        throw new ValidationError(ERROR_CODES[err.details[0].context.key][err.details[0].type], ERROR_DETAILS[ERROR_CODES[err.details[0].context.key][err.details[0].type]]);
      }
      data.forEach(item => {
        shareholder.push({
          ...where,
          o_shareholder_orgname        : item?.o_shareholder_orgname,
          o_shareholderorg_isforeign   : item?.o_shareholderorg_isforeign,
          o_shareholderorg_registerno  : item?.o_shareholderorg_registerno,
          o_shareholder_stateregisterno: item?.o_shareholder_stateregisterno,
        });
      });
    } else {
      try {
        await orgSchemaObject.validate(data);
      }
      catch (err) {
        console.log(err);
        // console.log("================================", err);
        throw new ValidationError(ERROR_CODES[err.details[0].context.key][err.details[0].type], ERROR_DETAILS[ERROR_CODES[err.details[0].context.key][err.details[0].type]]);
      }
      shareholder.push({
        ...where,
        o_shareholder_orgname        : data?.o_shareholder_orgname,
        o_shareholderorg_isforeign   : data?.o_shareholderorg_isforeign,
        o_shareholderorg_registerno  : data?.o_shareholderorg_registerno,
        o_shareholder_stateregisterno: data?.o_shareholder_stateregisterno,
      });
    }
  }

  return shareholder;
};