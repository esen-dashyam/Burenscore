import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERROR_CODES, ERROR_DETAILS } from "../../../../constants";
import Joi from "joi";
import { db } from "@goodtechsoft/sequelize-postgres";
import { fall } from "../../../../utils";
import APPENDIX_D from "../../../../constants/APPENDIX_D";
import { v4 as uuidv4 } from "uuid";
const checkDuplicate = (array, key) => {
  let duplicate = false;
  if (array.length > 2){
    array.forEach((item, index) => {
      if (array.find((el, i) => el[key] === item[key] && index !== i))
        duplicate = true;
    });
  }
  return duplicate;
};
const customerSchemaObject = Joi.object({
  o_c_relationcustomer_firstName      : Joi.string().max(50).required(),
  o_c_relationcustomer_lastName       : Joi.string().required(),
  o_c_relationcustomer_isforeign      : Joi.number().required(),
  o_c_relationcustomer_registerno     : Joi.string().regex(/[А-Я||Ү||Ө][А-Я||Ү||Ө][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).required(),
  o_c_relationcustomer_citizenrelation: Joi.string().valid(Object.keys(APPENDIX_D)).required(),
  o_c_relationcustomer_isfinancialonus: Joi.number().required(),
  o_c_relationcustomer_relno          : Joi.string().required(),
}).options({ allowUnknown: true });
const customerSchemaArray = Joi.array().items(Joi.object({
  o_c_relationcustomer_firstName      : Joi.string().max(50).required(),
  o_c_relationcustomer_lastName       : Joi.string().required(),
  o_c_relationcustomer_isforeign      : Joi.number().required(),
  o_c_relationcustomer_registerno     : Joi.string().regex(/[А-Я||Ү||Ө][А-Я||Ү||Ө][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).required(),
  o_c_relationcustomer_citizenrelation: Joi.string().valid(Object.keys(APPENDIX_D)).required(),
  o_c_relationcustomer_isfinancialonus: Joi.number().required(),
  o_c_relationcustomer_relno          : Joi.string().required(),
})).options({ allowUnknown: true });
const orgSchemaObject = Joi.object({
  o_c_relationorg_orgname        : Joi.string().max(50).required(),
  o_c_relationorg_isforeign      : Joi.number().required(),
  o_c_relationorg_stateregisterno: Joi.string().max(16).allow([null, ""]),
  o_c_relationorg_registerno     : Joi.string().regex(/[0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).required(),
  o_c_relationorg_orgrelation    : Joi.string().required(),
  o_c_relationorg_isfinancialonus: Joi.number().required(),
  o_c_relationorg_relno          : Joi.string().required(),
}).options({ allowUnknown: true });
const orgSchemaArray = Joi.array().items(Joi.object({
  o_c_relationorg_orgname        : Joi.string().max(50).required(),
  o_c_relationorg_isforeign      : Joi.number().required(),
  o_c_relationorg_stateregisterno: Joi.string().max(16).allow([null, ""]),
  o_c_relationorg_registerno     : Joi.string().regex(/[0-9][0-9][0-9][0-9][0-9][0-9][0-9]/).required(),
  o_c_relationorg_orgrelation    : Joi.string().required(),
  o_c_relationorg_isfinancialonus: Joi.number().required(),
  o_c_relationorg_relno          : Joi.string().required(),
})).options({ allowUnknown: true });

export default async ({ data, where, type, session }) => {
  if (!data) return null;
  let shareholder = [];
  // console.log(data);
  if (type === "CUSTOMER"){
    // console.log("data_IS_ARRAY", Array.isArray(data));
    if (Array.isArray(data)){
      try {
        await customerSchemaArray.validate(data);
        let duplicate = checkDuplicate(data, "o_c_relationcustomer_relno");
        if (duplicate) throw new ValidationError(ERROR_DETAILS.ME4055);
      }
      catch (err) {
        console.log(err);
        if (err.code){
          throw new ValidationError(err.code, ERROR_DETAILS[err.code]);
        }
        throw new ValidationError(ERROR_CODES[err.details[0].context.key][err.details[0].type], ERROR_DETAILS[ERROR_CODES[err.details[0].context.key][err.details[0].type]], APPENDIX_D[err.message[0]]);

      }
      let falls = data.map(item => {
        return async () => {
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
        };
      });
      await fall(falls);
    } else {
      try {
        await customerSchemaObject.validate(data);
      }
      catch (err) {
        console.log("================================", err);
        throw new ValidationError(ERROR_CODES[err.details[0].context.key][err.details[0].type], ERROR_DETAILS[ERROR_CODES[err.details[0].context.key][err.details[0].type]], APPENDIX_D);
      }
      shareholder.push({
        ...where,
        o_c_relationcustomer_firstName      : data?.o_c_relationcustomer_firstName,
        o_c_relationcustomer_lastName       : data?.o_c_relationcustomer_lastName,
        o_c_relationcustomer_isforeign      : data?.o_c_relationcustomer_isforeign,
        o_c_relationcustomer_registerno     : data?.o_c_relationcustomer_registerno,
        o_c_relationcustomer_citizenrelation: data?.o_c_relationcustomer_citizenrelation,
        o_c_relationcustomer_isfinancialonus: data?.o_c_relationcustomer_isfinancialonus,
        o_c_relationcustomer_relno          : data?.o_c_relationcustomer_relno
      });
    }
  }
  if (type === "ORG"){
    if (Array.isArray(data)){
      try {
        await orgSchemaArray.validate(data);
        let duplicate = checkDuplicate(data, "o_c_relationorg_relno");
        if (duplicate) throw new ValidationError(ERROR_DETAILS.ME4055);
      }
      catch (err) {
        // console.log("================================", err);
        console.log(err);
        if (err.code){
          throw new ValidationError(err.code, ERROR_DETAILS[err.code]);
        }
        throw new ValidationError(err.details[0].message, ERROR_DETAILS[err.details[0].message]);
      }
      let falls = data.map(item => {
        return async () => {
          let relno = await db.find(db.OCRelationorg, {
            ...where,
            o_c_relationorg_relno: item.o_c_relationorg_relno
          }, session);
          if (relno) throw new ValidationError(ERROR_DETAILS.ME4055);

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
        };
      });
      await fall(falls);
    } else {
      try {
        await orgSchemaObject.validate(data);
      }
      catch (err) {
        console.log(err);
        // console.log("================================", err);
        throw new ValidationError(ERROR_CODES[err.details[0].context.key][err.details[0].type], ERROR_DETAILS[ERROR_CODES[err.details[0].context.key][err.details[0].type]]);
      }
      // let relno = await db.find(db.OCRelationorg, {
      //   ...where,
      //   o_c_relationorg_relno: data.o_c_relationorg_relno
      // }, session);
      // if (relno) throw new ValidationError(ERROR_DETAILS.ME4055);
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