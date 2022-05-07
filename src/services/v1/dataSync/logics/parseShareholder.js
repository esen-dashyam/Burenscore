import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERROR_DETAILS } from "../../../../constants";
import Joi from "joi";

const customerSchemaObject = Joi.object({
  o_shareholder_firstname: Joi.string().max(50).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3032";
          break;
        case "any.empty":
          err.message="ME3032";
          break;
        case "string.max":
          err.message = "ME3033";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_shareholder_lastname: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.max":
          err.message = "ME3034";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_shareholdercus_isforeign: Joi.number().required().error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message="ME3035";
          break;
        case "any.number":
          err.message="ME3036";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_shareholdercus_registerno: Joi.string().regex(/[А-Я||Ү||Ө][А-Я||Ү||Ө][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).required().error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message="ME3038";
          break;
        case "string.empty":
          err.message="ME3039";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
}).options({ allowUnknown: true });
const customerSchemaArray = Joi.array().items(Joi.object({
  o_shareholder_firstname: Joi.string().max(50).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3032";
          break;
        case "any.empty":
          err.message="ME3032";
          break;
        case "string.max":
          err.message = "ME3033";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_shareholder_lastname: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.max":
          err.message = "ME3034";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_shareholdercus_isforeign: Joi.number().required().error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message="ME3035";
          break;
        case "any.number":
          err.message="ME3036";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_shareholdercus_registerno: Joi.string().regex(/[А-Я||Ү||Ө][А-Я||Ү||Ө][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).required().error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message="ME3038";
          break;
        case "string.empty":
          err.message="ME3038";
          break;
        case "string.base":
          err.message="ME3039";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
})).options({ allowUnknown: true });

const orgSchemaObject = Joi.object({
  o_shareholder_orgname: Joi.string().max(50).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3022";
          break;
        case "any.empty":
          err.message="ME3022";
          break;
        case "string.max":
          err.message = "ME3023";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_shareholderorg_isforeign: Joi.number().required().error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message="ME3024";
          break;
        case "number.base":
          err.message="ME3025";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_shareholderorg_registerno: Joi.string().regex(/[А-Я||Ү||Ө][А-Я||Ү||Ө][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).required().error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message="ME3027";
          break;
        case "any.empty":
          err.message="ME3027";
          break;
        case "string.regex.base":
          err.message="ME3028";
          break;
        case "string.max":
          err.message="ME3029";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_shareholder_stateregisterno: Joi.string().required(), // Код байхгүй
}).options({ allowUnknown: true });
const orgSchemaArray = Joi.array().items(Joi.object({
  o_shareholder_orgname: Joi.string().max(50).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3022";
          break;
        case "any.empty":
          err.message="ME3022";
          break;
        case "string.max":
          err.message = "ME3023";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_shareholderorg_isforeign: Joi.number().required().error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message="ME3024";
          break;
        case "number.base":
          err.message="ME3025";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  o_shareholderorg_registerno: Joi.string().max(16).required().error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message="ME3027";
          break;
        case "string.base":
          err.message="ME3028";
          break;
        case "number.max":
          err.message="ME3029";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
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
        // console.log("================================", err);
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
        // console.log("================================", err);
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
        // console.log("================================", err);
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
        // console.log("================================", err);
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