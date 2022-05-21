import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { APPENDIX, ERROR_CODES, ERROR_DETAILS } from "../../../../constants";
import Joi from "joi";
import APPENDIX_O from "../../../../constants/APPENDIX_O";
import { optional } from "joi/lib/types/lazy";


const checkDuplicate = (array, key) => {
  let duplicate = false;
  if (!array) return duplicate;
  if (array.length >2){
    array.forEach((item, index) => {
      if (array.find((element, i) => element[key] === item[key] && index !== i))
        duplicate = true;
    });
  }
  return duplicate;
};

const neoSchema = Joi.object({
  orgmeasure              : Joi.string().max(500).optional().allow([null, ""]),
  measuredate             : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]),
  measuredescription      : Joi.string().max(500).optional().allow([null, ""]),
  causetostartcase        : Joi.string().valid(Object.keys(APPENDIX_O)).optional().allow([null, ""]),
  datetstartcase          : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]),
  registertopolice        : Joi.number().min(0).max(1).allow([null, ""]),
  registertopolicedate    : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]),
  timesinpolice           : Joi.number().allow([null, ""]),
  registertoprocuror      : Joi.number().min(0).max(1).allow([null, ""]),
  timesinprocuror         : Joi.number().allow([null, ""]),
  registertocourt         : Joi.number().min(0).max(1).allow([null, ""]),
  registertocourtdate     : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]),
  timesincourt            : Joi.number().allow([null, ""]),
  shiftocourt2            : Joi.number().min(0).max(1).allow([null, ""]),
  shiftocourtdecision     : Joi.string().allow([null, ""]),
  shifttocourtdecisiondate: Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]),
  ignoredcrime            : Joi.number().min(0).max(1).allow([null, ""]),
  ignoreddate             : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).optional().allow([null, ""]),
  courtorderno            : Joi.string().max(50).allow([null, ""]),
}).options({ allowUnknown: true });

const schema =Joi.object({
  o_c_receivable_balance    : Joi.number().required(),
  o_c_receivable_advamount  : Joi.number().required(),
  o_c_receivable_starteddate: Joi.string()
    .regex(/(^(((\d\d)(([02468][048])|([13579][26]))-02-29)|(((\d\d)(\d\d)))-((((0\d)|(1[0-2]))-((0\d)|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))\s(([01]\d|2[0-3]):([0-5]\d):([0-5]\d))$)/
    ).required(),
  o_c_receivable_expdate: Joi.string()
    .regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
  o_c_receivable_currencycode : Joi.string().required(),
  o_c_receivable_type         : Joi.string().required(),
  o_c_receivable_loanclasscode: Joi.string().max(16).required(),
  o_c_receivable_isapproved   : Joi.number().optional().allow([null, ""]),
  o_c_receivable_extdate      : Joi.string()
    .regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
  o_c_receivabletransactions: Joi.object({
    o_c_receivable_loancharttype    : Joi.string().valid(Object.keys(APPENDIX.APPENDIX_HAGAS_I)).required(),
    o_c_receivable_interestcharttype: Joi.string().valid(Object.keys(APPENDIX.APPENDIX_HAGAS_I)).required(),
    o_c_receivabledetails           : Joi.object({
      o_c_receivabledetail: Joi.array().items(Joi.object({
        o_c_receivabledetail_datetopay  : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
        o_c_receivabledetail_amounttopay: Joi.number().precision(2).positive().required(),
      })),
    }),
    o_c_receivableperformances: Joi.object({
      o_c_receivableperformance: Joi.array().items(Joi.object({
        o_c_receivableperformance_datetopay  : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
        o_c_receivableperformance_amounttopay: Joi.number().precision(2).positive().required(),
      })),
    }),
    o_c_receivableinterestdetails: Joi.object({
      o_c_receivableinterestdetail: Joi.array().items(Joi.object({
        o_c_receivableinterestdetail_datetopay  : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
        o_c_receivableinterestdetail_amounttopay: Joi.number().precision(2).positive().required(),
      })),
    }),
    o_c_receivableinterestperformances: Joi.object({
      o_c_receivableinterestperformance: Joi.array().items(Joi.object({
        o_c_receivableinterestperformance_datetopay  : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
        o_c_receivableinterestperformance_amounttopay: Joi.number().precision(2).positive().required(),
      }))
    })
  }).optional().allow([null, ""])
}).options({ allowUnknown: true });
export default async ({ data, where }) => {
  if (!data) return null;
  try {
    await schema.validate(data);
    let duplicate = checkDuplicate(data?.o_c_receivabletransactions?.o_c_receivabledetails?.o_c_receivabledetail, "o_c_receivabledetail_datetopay");
    if (duplicate) throw new ValidationError("ME3690", ERROR_DETAILS.ME3690);
    checkDuplicate(data?.o_c_receivabletransactions?.o_c_receivableperformances?.o_c_receivableperformance, "o_c_receivableperformance_datetopay");
    if (duplicate) throw new ValidationError("ME3692", ERROR_DETAILS.ME3692);
    checkDuplicate(data?.o_c_receivabletransactions?.o_c_receivableinterestdetails?.o_c_receivableinterestdetail, "o_c_receivableinterestdetail_datetopay");
    if (duplicate) throw new ValidationError("ME3691", ERROR_DETAILS.ME3691);
    checkDuplicate(data?.o_c_receivabletransactions?.o_c_receivableinterestperformances?.o_c_receivableinterestperformance, "o_c_receivableinterestperformance_datetopay");
    if (duplicate) throw new ValidationError("ME3693", ERROR_DETAILS.ME3693);
  }
  catch (err) {
    console.log(err);
    if (err.code){
      throw new ValidationError(err.code, err.message);
    }
    else {
      throw new ValidationError(ERROR_CODES[err.details[0].context.key][err.details[0].type], ERROR_DETAILS[ERROR_CODES[err.details[0].context.key][err.details[0].type]]);
    }
  }
  let receivableInfo = {
    id                              : uuidv4(),
	  o_c_receivable_balance          : data?.o_c_receivable_balance,
	  o_c_receivable_advamount        : data?.o_c_receivable_advamount,
	  o_c_receivable_starteddate      : data?.o_c_receivable_starteddate,
	  o_c_receivable_expdate          : data?.o_c_receivable_expdate,
	  o_c_receivable_currencycode     : data?.o_c_receivable_currencycode,
	  o_c_receivable_type             : data?.o_c_receivable_type,
	  o_c_receivable_loanclasscode    : data?.o_c_receivable_loanclasscode,
	  o_c_receivable_isapproved       : data?.o_c_receivable_isapproved,
	  o_c_receivable_extdate          : data?.o_c_receivable_extdate,
    o_c_receivable_interestcharttype: data?.o_c_receivabletransactions?.o_c_receivable_loancharttype,
    o_c_receivable_loancharttype    : data?.o_c_receivabletransactions?.o_c_receivable_interestcharttype,
    ...where,
  };

  let TRANSACTIONS = [];
  await data?.o_c_receivabletransactions?.o_c_receivabledetails?.o_c_receivabledetail?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "DETAIL",
      relation_type: "RECEIVABLE",
      datetopay    : item?.o_c_receivabledetail_datetopay,
      amounttopay  : item?.o_c_receivabledetail_amounttopay,
      relation_id  : receivableInfo?.id,
    });
  });
  await data?.o_c_receivabletransactions?.o_c_receivableperformances?.o_c_receivableperformance?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "PERFORMANCE",
      relation_type: "RECEIVABLE",
      datetopay    : item?.o_c_receivableperformance_datetopay,
      amounttopay  : item?.o_c_receivableperformance_amounttopay,
      relation_id  : receivableInfo?.id,
    });
  });
  await data?.o_c_receivabletransactions?.o_c_receivableinterestdetails?.o_c_receivableinterestdetail?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "INTEREST_DETAIL",
      relation_type: "RECEIVABLE",
      datetopay    : item?.o_c_receivableinterestdetail_datetopay,
      amounttopay  : item?.o_c_receivableinterestdetail_amounttopay,
      relation_id  : receivableInfo?.id,
    });
  });
  await data?.o_c_receivabletransactions?.o_c_receivableinterestperformances?.o_c_receivableinterestperformance?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "INTEREST_PERFORMANCE",
      relation_type: "RECEIVABLE",
      datetopay    : item?.o_c_receivableinterestperformance_datetopay,
      amounttopay  : item?.o_c_receivableinterestperformance_amounttopay,
      relation_id  : receivableInfo?.id,
    });
  });
  let neoInfo = null;
  if (data?.receivable_neoinfo){
    neoInfo = {
      relation_id             : receivableInfo.id,
      relation_type           : "RECEIVABLE",
      orgmeasure              : data?.receivable_neoinfo?.c_receivable_orgmeasure,
      measuredate             : data?.receivable_neoinfo?.c_receivable_measuredate,
      measuredescription      : data?.receivable_neoinfo?.c_receivable_measuredescription,
      causetostartcase        : data?.receivable_neoinfo?.c_receivable_causetostartcase,
      datetstartcase          : data?.receivable_neoinfo?.c_receivable_datetstartcase,
      registertopolice        : data?.receivable_neoinfo?.o_c_receivable_registertopolice,
      registertopolicedate    : data?.receivable_neoinfo?.o_c_receivable_registertopolicedate,
      timesinpolice           : data?.receivable_neoinfo?.o_c_receivable_timesinpolice,
      registertoprocuror      : data?.receivable_neoinfo?.o_c_receivable_registertoprocuror,
      registertoprocurordate  : data?.receivable_neoinfo?.o_c_receivable_registertoprocurordate,
      timesinprocuror         : data?.receivable_neoinfo?.o_c_receivable_timesinprocuror,
      registertocourt         : data?.receivable_neoinfo?.o_c_receivable_registertocourt,
      registertocourtdate     : data?.receivable_neoinfo?.o_c_receivable_registertocourtdate,
      timesincourt            : data?.receivable_neoinfo?.o_c_receivable_timesincourt,
      shiftocourt2            : data?.receivable_neoinfo?.o_c_receivable_shiftocourt2,
      shifttocourt2date       : data?.receivable_neoinfo?.o_c_receivable_shifttocourt2date,
      timesincourt2           : data?.receivable_neoinfo?.o_c_receivable_timesincourt2,
      shiftocourtdecision     : data?.receivable_neoinfo?.o_c_receivable_shiftocourtdecision,
      shifttocourtdecisiondate: data?.receivable_neoinfo?.o_c_receivable_shifttocourtdecisiondate,
      ignoredcrime            : data?.receivable_neoinfo?.o_c_receivable_ignoredcrime,
      ignoreddate             : data?.receivable_neoinfo?.o_c_receivable_ignoreddate,
      courtorderno            : data?.receivable_neoinfo?.o_c_receivable_courtorderno,
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
  receivableInfo.transactions = TRANSACTIONS;
  receivableInfo.neoInfo = neoInfo;

  return receivableInfo;
};