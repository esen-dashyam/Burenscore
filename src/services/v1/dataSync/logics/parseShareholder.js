import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERROR_DETAILS } from "../../../../constants";
import Joi from "joi";

const customerSchemaObject = Joi.object({
  o_shareholder_firstname    : Joi.string().required(),
  o_shareholder_lastname     : Joi.string().required(),
  o_shareholdercus_isforeign : Joi.number().required(),
  o_shareholdercus_registerno: Joi.string().required(),
});
const customerSchemaArray = Joi.array().items(Joi.object({
  o_shareholder_firstname    : Joi.string().required(),
  o_shareholder_lastname     : Joi.string().required(),
  o_shareholdercus_isforeign : Joi.number().required(),
  o_shareholdercus_registerno: Joi.string().required(),
}));

const orgSchemaObject = Joi.object({
  o_shareholder_orgname        : Joi.string().required(),
  o_shareholderorg_isforeign   : Joi.number().required(),
  o_shareholderorg_registerno  : Joi.string().required(),
  o_shareholder_stateregisterno: Joi.string().required(),
});
const orgSchemaArray = Joi.array().items(Joi.object({
  o_shareholder_orgname        : Joi.string().required(),
  o_shareholderorg_isforeign   : Joi.number().required(),
  o_shareholderorg_registerno  : Joi.string().required(),
  o_shareholder_stateregisterno: Joi.string().required(),
}));

export default async ({ data, where, type }) => {
  if (!data) return null;
  let shareholder = [];
  if (type === "CUSTOMER"){
    if (Array.isArray(data)){
      try {
        await customerSchemaArray.validate(data);
      }
      catch (err) {
        console.log("================================", err);
        throw new ValidationError(err.details[0].message, ERROR_DETAILS[err.details[0].message]);
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
        console.log("================================", err);
        throw new ValidationError(err.details[0].message, ERROR_DETAILS[err.details[0].message]);
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
        console.log("================================", err);
        throw new ValidationError(err.details[0].message, ERROR_DETAILS[err.details[0].message]);
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
        console.log("================================", err);
        throw new ValidationError(err.details[0].message, ERROR_DETAILS[err.details[0].message]);
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