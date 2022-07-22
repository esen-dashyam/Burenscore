import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { APPENDIX, ERROR_CODES, ERROR_DETAILS, VALUE_CODES } from "../../../../constants";
import Joi from "joi";
const checkDuplicate = (array, key) => {
  let duplicate = false;
  if (!array) return duplicate;
  if (array.length > 2){
    array.forEach((item, index) => {
      if (array.find((el, i) => el[key] === item[key] && index !== i))
        duplicate = true;
    });
  }
  return duplicate;
};
const neoSchema = Joi.object({
  orgmeasure                   : Joi.string().max(500).optional().allow([null, ""]),
  measuredate                  : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]),
  measuredescription           : Joi.string().max(500).optional().allow([null, ""]),
  causetostartcase             : Joi.string().valid(Object.keys(APPENDIX.APPENDIX_O)).optional().allow([null, ""]),
  datetstartcase               : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]),
  registertopolice             : Joi.number().min(0).max(1).allow([null, ""]),
  registertopolicedate         : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]),
  timesinpolice                : Joi.number().allow([null, ""]),
  registertoprocuror           : Joi.number().min(0).max(1).allow([null, ""]),
  registertoprocurordate       : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]),
  timesinprocuror              : Joi.number().allow([null, ""]),
  registertocourt              : Joi.number().min(0).max(1).allow([null, ""]),
  registertocourtdate          : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]),
  timesincourt                 : Joi.number().allow([null, ""]),
  shiftocourt2                 : Joi.number().min(0).max(1).allow([null, ""]),
  shiftocourtdecision          : Joi.number().min(0).max(1).allow([null, ""]),
  shifttocourtdecisiondate     : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]),
  ignoredcrime                 : Joi.number().min(0).max(1).allow([null, ""]),
  ignoreddate                  : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]),
  courtorderno                 : Joi.string().max(50).allow([null, ""]),
  o_c_leasing_shifttocourt2date: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]),
}).options({ allowUnknown: true });
const schema = Joi.object({
  o_c_leasing_advamount     : Joi.number().max(999999999999999).precision(2).required(),
  o_c_leasing_balance       : Joi.number().max(999999999999999).precision(2).required(),
  o_c_leasing_starteddate   : Joi.string().regex(/(^(((\d\d)(([02468][048])|([13579][26]))-02-29)|(((\d\d)(\d\d)))-((((0\d)|(1[0-2]))-((0\d)|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))\s(([01]\d|2[0-3]):([0-5]\d):([0-5]\d))$)/).required(),
  o_c_leasing_expdate       : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
  o_c_leasing_currencycode  : Joi.string().valid(Object.keys(VALUE_CODES).map(item => VALUE_CODES[item])).required(),
  o_c_leasing_interestinperc: Joi.number().max(999999.99).precision(2).required(),
  o_c_leasing_commissionperc: Joi.number().max(999999999999.99).precision(2).required().required(),
  o_c_leasing_fee           : Joi.number().max(999999999999.99).precision(2).required(),
  o_c_leasing_updatedexpdate: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).allow([null, ""]),
  o_c_leasing_loanclasscode : Joi.string().valid(Object.keys(APPENDIX.APPENDIX_EO)).required(),
  o_c_leasing_isapproved    : Joi.number().integer().required(),
  o_c_leasingtransactions   : Joi.object({
    o_c_leasing_loancharttype    : Joi.string().valid(Object.keys(APPENDIX.APPENDIX_HAGAS_I)).required(),
    o_c_leasing_interestcharttype: Joi.string().valid(Object.keys(APPENDIX.APPENDIX_HAGAS_I)).required().required(),
    o_c_leasingdetails           : Joi.object({
      o_c_leasingdetail: Joi.array().items(Joi.object({
        o_c_leasingdetail_datetopay  : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
        o_c_leasingdetail_amounttopay: Joi.number().precision(2).positive().required(),
      }))
    }),
    o_c_leasingperformances: Joi.object({
      o_c_leasingperformance: Joi.array().items(Joi.object({
        o_c_leasingperformance_datetopay  : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
        o_c_leasingperformance_amounttopay: Joi.number().precision(2).positive().required()
      }))
    }),
    o_c_leasinginterestdetails: Joi.object({
      o_c_leasinginterestdetail: Joi.array().items(Joi.object({
        o_c_leasinginterestdetail_datetopay  : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
        o_c_leasinginterestdetail_amounttopay: Joi.number().precision(2).positive().required()
      }))
    }),
    o_c_leasinginterestperformances: Joi.object({
      o_c_leasinginterestperformance: Joi.array().items(Joi.object({
        o_c_leasinginterestperformance_datetopay  : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
        o_c_leasinginterestperformance_amounttopay: Joi.number().precision(2).positive().required(),
      }))
    })
  }),
}).options({ allowUnknown: true });

export default async ({ data, where }) => {
  if (!data) return null;
  try {
    await schema.validate(data);
    let duplicate = checkDuplicate(data?.o_c_leasingtransactions?.o_c_leasingdetails?.o_c_leasingdetail, "o_c_leasingdetail_datetopay");
    if (duplicate) throw new ValidationError("ME3686", ERROR_DETAILS.ME3686);
    duplicate = checkDuplicate(data?.o_c_leasingtransactions?.o_c_leasingperformances?.o_c_leasingperformance, "o_c_leasingperformance_datetopay");
    if (duplicate) throw new ValidationError("ME3688", ERROR_DETAILS.ME3688);
    duplicate = checkDuplicate(data?.o_c_leasingtransactions?.o_c_leasinginterestdetails?.o_c_leasinginterestdetail, "o_c_leasinginterestdetail_datetopay");
    if (duplicate) throw new ValidationError("ME3687", ERROR_DETAILS.ME3687);
    duplicate = checkDuplicate(data?.o_c_leasingtransactions?.o_c_leasinginterestperformances?.o_c_leasinginterestperformance, "o_c_leasinginterestperformance_datetopay");
    if (duplicate) throw new ValidationError("ME3685", ERROR_DETAILS.ME3685);
  }
  catch (err) {
    console.log(err);
    if (err.code){
      throw new ValidationError(err.code, err.message);
    }
    else {throw new ValidationError(ERROR_CODES[err.details[0].context.key][err.details[0].type], ERROR_DETAILS[ERROR_CODES[err.details[0].context.key][err.details[0].type]]);}
  }
  let id = uuidv4();
  let mrtnos = [];
  let relnos = [];
  if (Array.isArray(data?.o_c_leasingmrtnos?.o_c_leasingmrtno)){
    data.o_c_leasingmrtnos.o_c_leasingmrtno.forEach(item => {
      mrtnos.push({
        ...where,
        relation_id: id,
        type       : "LEASING",
        mrtno      : item
      });
    });
  } else if (data?.o_c_leasingmrtnos?.o_c_leasingmrtno){
    mrtnos.push({
      ...where,
      relation_id: id,
      type       : "LEASING",
      mrtno      : data?.o_c_leasingmrtnos?.o_c_leasingmrtno
    });
  }
  console.log("MRT==========>", mrtnos);
  if (Array.isArray(data.o_c_leasingrelnos?.o_c_leasingrelno)){
    data.o_c_leasingrelnos.o_c_leasingrelno.forEach(item => {
      relnos.push({
        ...where,
        relation_id: id,
        type       : "LEASING",
        relno      : item
      });
    });
  } else if (data?.o_c_leasingrelnos?.o_c_leasingrelno)
    relnos.push({
      ...where,
      relation_id: id,
      type       : "LEASING",
      relno      : data?.o_c_leasingrelnos?.o_c_leasingrelno
    });
  console.log("==========>", relnos);
  let leasingInfo = {
    id                           : id,
    o_c_leasing_advamount        : data?.o_c_leasing_advamount,
    o_c_leasingmrtnos            : mrtnos,
    o_c_leasingrelnos            : relnos,
    o_c_leasing_balance          : data?.o_c_leasing_balance,
    o_c_leasing_starteddate      : data?.o_c_leasing_starteddate,
    o_c_leasing_expdate          : data?.o_c_leasing_expdate,
    o_c_leasing_currencycode     : data?.o_c_leasing_currencycode,
    o_c_leasing_interestinperc   : data?.o_c_leasing_interestinperc,
    o_c_leasing_commissionperc   : data?.o_c_leasing_commissionperc,
    o_c_leasing_fee              : data?.o_c_leasing_fee,
    o_c_leasing_updatedexpdate   : data?.o_c_leasing_updatedexpdate,
    o_c_leasing_loanclasscode    : data?.o_c_leasing_loanclasscode,
    o_c_leasing_isapproved       : data?.o_c_leasing_isapproved,
    o_c_leasing_loancharttype    : data?.o_c_leasingtransactions?.o_c_leasing_loancharttype,
    o_c_leasing_interestcharttype: data?.o_c_leasingtransactions?.o_c_leasing_interestcharttype,
    ...where,
  };

  let TRANSACTIONS = [];
  await data?.o_c_leasingtransactions?.o_c_leasingdetails?.o_c_leasingdetail?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "DETAIL",
      relation_type: "LEASING",
      datetopay    : item?.o_c_leasingdetail_datetopay,
      amounttopay  : item?.o_c_leasingdetail_amounttopay,
      relation_id  : leasingInfo?.id,
    });
  });
  await data?.o_c_leasingtransactions?.o_c_leasingperformances?.o_c_leasingperformance?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "PERFORMANCE",
      relation_type: "LEASING",
      datetopay    : item?.o_c_leasingperformance_datetopay,
      amounttopay  : item?.o_c_leasingperformance_amounttopay,
      relation_id  : leasingInfo?.id,
    });
  });
  await data?.o_c_leasingtransactions?.o_c_leasinginterestdetails?.o_c_leasinginterestdetail?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "INTEREST_DETAIL",
      relation_type: "LEASING",
      datetopay    : item?.o_c_leasinginterestdetail_datetopay,
      amounttopay  : item?.o_c_leasinginterestdetail_amounttopay,
      relation_id  : leasingInfo?.id,
    });
  });
  await data?.o_c_leasingtransactions?.o_c_leasinginterestperformances?.o_c_leasinginterestperformance?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "INTEREST_PERFORMANCE",
      relation_type: "LEASING",
      datetopay    : item?.o_c_leasinginterestperformance_datetopay,
      amounttopay  : item?.o_c_leasinginterestperformance_amounttopay,
      relation_id  : leasingInfo?.id,
    });
  });

  let neoInfo = null;
  if (data?.leasing_neoinfo){
    neoInfo = {
      relation_id             : leasingInfo?.id,
      relation_type           : "LEASING",
      orgmeasure              : data?.leasing_neoinfo?.c_leasing_orgmeasure,
      measuredate             : data?.leasing_neoinfo?.c_leasing_measuredate,
      measuredescription      : data?.leasing_neoinfo?.c_leasing_measuredescription,
      causetostartcase        : data?.leasing_neoinfo?.c_leasing_causetostartcase,
      datetstartcase          : data?.leasing_neoinfo?.c_leasing_datetstartcase,
      registertopolice        : data?.leasing_neoinfo?.o_c_leasing_registertopolice,
      registertopolicedate    : data?.leasing_neoinfo?.o_c_leasing_registertopolicedate,
      timesinpolice           : data?.leasing_neoinfo?.o_c_leasing_timesinpolice,
      registertoprocuror      : data?.leasing_neoinfo?.o_c_leasing_registertoprocuror,
      registertoprocurordate  : data?.leasing_neoinfo?.o_c_leasing_registertoprocurordate,
      timesinprocuror         : data?.leasing_neoinfo?.o_c_leasing_timesinprocuror,
      registertocourt         : data?.leasing_neoinfo?.o_c_leasing_registertocourt,
      registertocourtdate     : data?.leasing_neoinfo?.o_c_leasing_registertocourtdate,
      timesincourt            : data?.leasing_neoinfo?.o_c_leasing_timesincourt,
      shiftocourt2            : data?.leasing_neoinfo?.o_c_leasing_shiftocourt2,
      shifttocourt2date       : data?.leasing_neoinfo?.o_c_leasing_shifttocourt2date,
      timesincourt2           : data?.leasing_neoinfo?.o_c_leasing_timesincourt2,
      shiftocourtdecision     : data?.leasing_neoinfo?.o_c_leasing_shiftocourtdecision,
      shifttocourtdecisiondate: data?.leasing_neoinfo?.o_c_leasing_shifttocourtdecisiondate,
      ignoredcrime            : data?.leasing_neoinfo?.o_c_leasing_ignoredcrime,
      ignoreddate             : data?.leasing_neoinfo?.o_c_leasing_ignoreddate,
      courtorderno            : data?.leasing_neoinfo?.o_c_leasing_courtorderno,
      ...where
    };
    try {
      await neoSchema.validate(neoInfo);
    }
    catch (err) {
      console.log(err);
      throw new ValidationError(ERROR_CODES[err.details[0].context.key][err.details[0].type], ERROR_DETAILS[ERROR_CODES[err.details[0].context.key][err.details[0].type]]);
    }
  }
  leasingInfo.transactions = TRANSACTIONS;
  leasingInfo.neoInfo = neoInfo;

  return leasingInfo;
};
