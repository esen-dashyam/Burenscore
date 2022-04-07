import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS } from "../../../../constants";
import Joi from "joi";

const schema = Joi.object({
  type: Joi.string().required(),
  data: Joi.alternatives().try(Joi.array().items(Joi.object({
    type                   : Joi.string().required(),
    o_shareholder_firstname: Joi.when("type", {
      is  : "CUSTOMER",
      then: Joi.string().required()
    }).optional().allow([null, ""]),
    o_shareholder_lastname: Joi.when("type", {
      is  : "CUSTOMER",
      then: Joi.string(),
    }).optional().allow([null, ""]),
    o_shareholdercus_isforeign: Joi.when("type", {
      is  : "CUSTOMER",
      then: Joi.number().required(),
    }).optional().allow([null, ""]),
    o_shareholdercus_registerno: Joi.when("type", {
      is  : "CUSTOMER",
      then: Joi.string().required(),
    }).optional().allow([null, ""]),
  })), Joi.object({
    type                   : Joi.string().required(),
    o_shareholder_firstname: Joi.when("type", {
      is  : "CUSTOMER",
      then: Joi.string().required()
    }).optional().allow([null, ""]),
    o_shareholder_lastname: Joi.when("type", {
      is  : "CUSTOMER",
      then: Joi.string(),
    }).optional().allow([null, ""]),
    o_shareholdercus_isforeign: Joi.when("type", {
      is  : "CUSTOMER",
      then: Joi.number().required(),
    }).optional().allow([null, ""]),
    o_shareholdercus_registerno: Joi.when("type", {
      is  : "CUSTOMER",
      then: Joi.string().required(),
    }).optional().allow([null, ""]),
  }))
}).length(3);

export default async ({ data, where, type }) => {
  // console.log("===========>SHAREHOLDER", data);
  try {
    await schema.validate({
      data,
      type
    });
  }
  catch (err) {
    console.log(err);
    throw new ValidationError(ERRORS.SHAREHOLDERCUSTOMER_PARSE_ERROR);
  }
  let shareholder = [];
  // console.log(data);
  if (type === "CUSTOMER"){
    if (Array.isArray(data)){
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