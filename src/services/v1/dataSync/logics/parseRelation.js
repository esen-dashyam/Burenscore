import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS, ERROR_DETAILS } from "../../../../constants";
import Joi from "joi";

const customerSchemaObject = Joi.object({
  type                                : Joi.string().required(),
  o_c_relationcustomer_firstName      : Joi.string().required(),
  o_c_relationcustomer_lastName       : Joi.string().required(),
  o_c_relationcustomer_isforeign      : Joi.number().required(),
  o_c_relationcustomer_registerno     : Joi.string().required(),
  o_c_relationcustomer_citizenrelation: Joi.string().required(),
  o_c_relationcustomer_isfinancialonus: Joi.number().required(),
  o_c_relationcustomer_relno          : Joi.string().required(),
});
const customerSchemaArray = Joi.array().items(Joi.object({
  type                                : Joi.string().required(),
  o_c_relationcustomer_firstName      : Joi.string().required(),
  o_c_relationcustomer_lastName       : Joi.string().required(),
  o_c_relationcustomer_isforeign      : Joi.number().required(),
  o_c_relationcustomer_registerno     : Joi.string().required(),
  o_c_relationcustomer_citizenrelation: Joi.string().required(),
  o_c_relationcustomer_isfinancialonus: Joi.number().required(),
  o_c_relationcustomer_relno          : Joi.string().required(),
}));

const orgSchemaObject = Joi.object({
  type                           : Joi.string().required(),
  o_c_relationorg_orgname        : Joi.string().required(),
  o_c_relationorg_isforeign      : Joi.number().required(),
  o_c_relationorg_stateregisterno: Joi.string().required(),
  o_c_relationorg_registerno     : Joi.string().required(),
  o_c_relationorg_orgrelation    : Joi.string().required(),
  o_c_relationorg_isfinancialonus: Joi.number().required(),
  o_c_relationorg_relno          : Joi.string().required(),
});
const orgSchemaArray = Joi.array().items(Joi.object({
  type                           : Joi.string().required(),
  o_c_relationorg_orgname        : Joi.string().required(),
  o_c_relationorg_isforeign      : Joi.number().required(),
  o_c_relationorg_stateregisterno: Joi.string().required(),
  o_c_relationorg_registerno     : Joi.string().required(),
  o_c_relationorg_orgrelation    : Joi.string().required(),
  o_c_relationorg_isfinancialonus: Joi.number().required(),
  o_c_relationorg_relno          : Joi.string().required(),
}));

export default async ({ data, where, type }) => {
  if (!data) return null;
  let shareholder = [];
  console.log(data);
  if (type === "CUSTOMER"){
    console.log("data_IS_ARRAY", Array.isArray(data));
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
          o_c_relationcustomer_firstName      : item?.o_c_relationcustomer_firstName,
          o_c_relationcustomer_lastName       : item?.o_c_relationcustomer_lastName,
          o_c_relationcustomer_isforeign      : item?.o_c_relationcustomer_isforeign,
          o_c_relationcustomer_registerno     : item?.o_c_relationcustomer_registerno,
          o_c_relationcustomer_citizenrelation: item?.o_c_relationcustomer_citizenrelation,
          o_c_relationcustomer_isfinancialonus: item?.o_c_relationcustomer_isfinancialonus,
          o_c_relationcustomer_relno          : item?.o_c_relationcustomer_relno
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
        o_c_relationcustomer_firstName      : data?.o_c_relationcustomer_firstName,
        o_c_relationcustomer_lastName       : data?.o_c_relationcustomer_firstName,
        o_c_relationcustomer_isforeign      : data?.o_c_relationcustomer_isforeign,
        o_c_relationcustomer_registerno     : data?.o_c_relationcustomer_registerno,
        o_c_relationcustomer_citizenrelation: data?.o_c_relationcustomer_citizenrelation,
        o_c_relationcustomer_isfinancialonus: data?.o_c_relationcustomer_isfinancialonus,
        o_c_relationcustomer_relno          : data?.o_c_relationcustomer_relno
      });
    }
  }
  if (type === "ORG"){
    console.log("data_IS_ARRAY", Array.isArray(data));
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
          o_c_relationorg_orgname        : item?.o_c_relationorg_orgname,
          o_c_relationorg_isforeign      : item?.o_c_relationorg_isforeign,
          o_c_relationorg_registerno     : item?.o_c_relationorg_registerno,
          o_c_relationorg_stateregisterno: item?.o_c_relationorg_stateregisterno,
          o_c_relationorg_orgrelation    : item?.o_c_relationorg_orgrelation,
          o_c_relationorg_isfinancialonus: item?.o_c_relationorg_isfinancialonus,
          o_c_relationorg_relno          : item?.o_c_relationorg_relno
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
        o_c_relationorg_orgname        : data?.o_c_relationorg_orgname,
        o_c_relationorg_isforeign      : data?.o_c_relationorg_isforeign,
        o_c_relationorg_registerno     : data?.o_c_relationorg_registerno,
        o_c_relationorg_stateregisterno: data?.o_c_relationorg_stateregisterno,
        o_c_relationorg_orgrelation    : data?.o_c_relationorg_orgrelation,
        o_c_relationorg_isfinancialonus: data?.o_c_relationorg_isfinancialonus,
        o_c_relationorg_relno          : data?.o_c_relationorg_relno
      });
    }
  }

  return shareholder;
};