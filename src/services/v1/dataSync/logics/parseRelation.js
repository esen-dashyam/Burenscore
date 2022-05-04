import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS, ERROR_DETAILS } from "../../../../constants";
import Joi from "joi";
import { db } from "@goodtechsoft/sequelize-postgres";
import { fall } from "../../../../utils";

const customerSchemaObject = Joi.object({
  o_c_relationcustomer_firstName: Joi.string().max(50).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3382";
          break;
        case "any.empty":
          err.message="ME3382";
          break;
        case "string.max":
          err.message="ME3383";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationcustomer_lastName: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.required":
          err.message = "";
          break;
        case "any.empty":
          err.message="";
          break;
        case "string.max":
          err.message="ME3384";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationcustomer_isforeign: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.required":
          err.message = "ME3385";
          break;
        case "any.empty":
          err.message="ME3385";
          break;
        case "number.base":
          err.message="ME3386";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationcustomer_registerno: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.required":
          err.message = "ME3387";
          break;
        case "any.empty":
          err.message="ME3387";
          break;
        case "string.base":
          err.message="ME3388";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationcustomer_citizenrelation: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.required":
          err.message = "ME3389";
          break;
        case "any.empty":
          err.message="ME3391";
          break;
        case "string.max":
          err.message="ME3390";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationcustomer_isfinancialonus: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.required":
          err.message = "ME3392";
          break;
        case "any.empty":
          err.message="ME3392";
          break;
        case "number.base":
          err.message="ME3393";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationcustomer_relno: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME4057";
          break;
        case "any.empty":
          err.message="ME4057";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
}).options({ allowUnknown: true });
const customerSchemaArray = Joi.array().items(Joi.object({
  o_c_relationcustomer_firstName: Joi.string().max(50).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3382";
          break;
        case "any.empty":
          err.message="ME3382";
          break;
        case "string.max":
          err.message="ME3383";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationcustomer_lastName: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.required":
          err.message = "";
          break;
        case "any.empty":
          err.message="";
          break;
        case "string.max":
          err.message="ME3384";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationcustomer_isforeign: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.required":
          err.message = "ME3385";
          break;
        case "any.empty":
          err.message="ME3385";
          break;
        case "number.base":
          err.message="ME3386";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationcustomer_registerno: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.required":
          err.message = "ME3387";
          break;
        case "any.empty":
          err.message="ME3387";
          break;
        case "string.base":
          err.message="ME3388";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationcustomer_citizenrelation: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.required":
          err.message = "ME3389";
          break;
        case "any.empty":
          err.message="ME3391";
          break;
        case "string.max":
          err.message="ME3390";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationcustomer_isfinancialonus: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.required":
          err.message = "ME3392";
          break;
        case "any.empty":
          err.message="ME3392";
          break;
        case "number.base":
          err.message="ME3393";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationcustomer_relno: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME4057";
          break;
        case "any.empty":
          err.message="ME4057";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
})).options({ allowUnknown: true });

const orgSchemaObject = Joi.object({
  o_c_relationorg_orgname: Joi.string().max(50).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3362";
          break;
        case "any.empty":
          err.message="ME3362";
          break;
        case "string.max":
          err.message="ME3363";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationorg_isforeign: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3364";
          break;
        case "any.empty":
          err.message="ME3364";
          break;
        case "number.base":
          err.message="ME3365";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationorg_stateregisterno: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.base":
          err.message="ME3368";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationorg_registerno: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3366";
          break;
        case "any.empty":
          err.message="ME3366";
          break;
        case "string.base":
          err.message="ME3367";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationorg_orgrelation: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3369";
          break;
        case "any.empty":
          err.message="ME3371";
          break;
        case "string.max":
          err.message="ME3370";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationorg_isfinancialonus: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3372";
          break;
        case "any.empty":
          err.message="ME3372";
          break;
        case "number.base":
          err.message="ME3373";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationorg_relno: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME4057";
          break;
        case "any.empty":
          err.message="ME4057";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
}).options({ allowUnknown: true });
const orgSchemaArray = Joi.array().items(Joi.object({
  o_c_relationorg_orgname: Joi.string().max(50).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3362";
          break;
        case "any.empty":
          err.message="ME3362";
          break;
        case "string.max":
          err.message="ME3363";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationorg_isforeign: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3364";
          break;
        case "any.empty":
          err.message="ME3364";
          break;
        case "number.base":
          err.message="ME3365";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationorg_stateregisterno: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "string.base":
          err.message="ME3368";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationorg_registerno: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3366";
          break;
        case "any.empty":
          err.message="ME3366";
          break;
        case "string.base":
          err.message="ME3367";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationorg_orgrelation: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3369";
          break;
        case "any.empty":
          err.message="ME3371";
          break;
        case "string.max":
          err.message="ME3370";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationorg_isfinancialonus: Joi.number().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.requiredthrow ne":
          err.message = "ME3372";
          break;
        case "any.empty":
          err.message="ME3372";
          break;
        case "number.base":
          err.message="ME3373";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_relationorg_relno: Joi.string().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME4057";
          break;
        case "any.empty":
          err.message="ME4057";
          break;
        case "string.only":
          err.message="aaaaaaaaaaaaa";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
})).options({ allowUnknown: true });

export default async ({ data, where, type, session }) => {
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
      let falls = data.map(item => {
        return async () => {
          let relno = await db.find(db.OCRelationcustomer, {
            ...where,
            o_c_relationcustomer_relno: item.o_c_relationcustomer_relno
          }, session);
          if (relno) throw new ValidationError(ERROR_DETAILS.ME4055);
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
        throw new ValidationError(err.details[0].message, ERROR_DETAILS[err.details[0].message]);
      }
      let relno = await db.find(db.OCRelationcustomer, {
        ...where,
        o_c_relationcustomer_relno: data.o_c_relationcustomer_relno
      }, session);
      if (relno) throw new ValidationError(ERROR_DETAILS.ME4055);
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
        console.log("================================", err);
        throw new ValidationError(err.details[0].message, ERROR_DETAILS[err.details[0].message]);
      }
      let relno = await db.find(db.OCRelationorg, {
        ...where,
        o_c_relationorg_relno: data.o_c_relationorg_relno
      }, session);
      if (relno) throw new ValidationError(ERROR_DETAILS.ME4055);
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