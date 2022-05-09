import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { APPENDIX, ERROR_DETAILS, ERROR_CODES } from "../../../../constants";
import Joi from "joi";

const schema = Joi.object({
  o_c_onus_advamount      : Joi.number().required(),
  o_c_onus_balance        : Joi.number().required(),
  o_c_onus_rightopeneddate: Joi.string()
    .regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
  o_c_onus_starteddate: Joi.string()
    .regex(/(^(((\d\d)(([02468][048])|([13579][26]))-02-29)|(((\d\d)(\d\d)))-((((0\d)|(1[0-2]))-((0\d)|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))\s(([01]\d|2[0-3]):([0-5]\d):([0-5]\d))$)/
    ).required(),
  o_c_onus_paymentfinaldate: Joi.string()
    .regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
  o_c_onus_expdate: Joi.string()
    .regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
  o_c_onus_interestinperc: Joi.number().required(),
  o_c_onus_commissionperc: Joi.number().required(),
  o_c_onus_fee           : Joi.number().required(),
  o_c_onus_loanclasscode : Joi.string().max(16).required(),
  o_c_onustransactions   : Joi.object({
    o_c_onus_loancharttype    : Joi.string().valid(Object.keys(APPENDIX.APPENDIX_HAGAS_I)).required(),
    o_c_onus_interestcharttype: Joi.string().valid(Object.keys(APPENDIX.APPENDIX_HAGAS_I)).required(),
    o_c_onusdetails           : Joi.object({
      o_c_onusdetail: Joi.array().items(Joi.object({
        o_c_onusdetail_datetopay  : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
        o_c_onusdetail_amounttopay: Joi.number().precision(2).positive().required(),
      })),
    }),
    o_c_onusperformances: Joi.object({
      o_c_onusperformance: Joi.array().items(Joi.object({
        o_c_onusperformance_datetopay  : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
        o_c_onusperformance_amounttopay: Joi.number().precision(2).positive().required(),
      })),
    }),
    o_c_onusinterestdetails: Joi.object({
      o_c_onusinterestdetail: Joi.array().items(Joi.object({
        o_c_onusinterestdetail_datetopay  : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
        o_c_onusinterestdetail_amounttopay: Joi.number().precision(2).positive().required(),
      })),
    }),
    o_c_onusinterestperformances: Joi.object({
      o_c_onusinterestperformance: Joi.array().items(Joi.object({
        o_c_onusinterestperformance_datetopay  : Joi.string().regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required(),
        o_c_onusinterestperformance_amounttopay: Joi.number().precision(2).positive().required(),
      }))
    })
  })
}).options({ allowUnknown: true });

export default async ({ data, where }) => {
  if (!data) return null;
  try {
    await schema.validate(data);
  }
  catch (err) {
    throw new ValidationError(ERROR_CODES[err.details[0].context.key][err.details[0].type], ERROR_DETAILS[ERROR_CODES[err.details[0].context.key][err.details[0].type]]);
  }
  let id = uuidv4();
  let mrtnos = [];
  let relnos = [];
  if (Array.isArray(data.o_c_onusmrtnos.o_c_onusmrtno)){
    data.o_c_onusmrtnos.o_c_onusmrtno.forEach(item => {
      mrtnos.push({
        ...where,
        relation_id: id,
        type       : "ONUS",
        mrtno      : item
      });
    });
  } else if (data.o_c_onusmrtnos.o_c_onusmrtno)
    mrtnos.push({
      ...where,
      relation_id: id,
      type       : "ONUS",
      mrtno      : data.o_c_onusmrtnos.o_c_onusmrtno
    });
  // console.log("==========>", mrtnos);
  if (Array.isArray(data.o_c_onusrelnos.o_c_onusrelno)){
    data.o_c_onusrelnos.o_c_onusrelno.forEach(item => {
      relnos.push({
        ...where,
        relation_id: id,
        type       : "ONUS",
        relno      : item
      });
    });
  } else if (data.o_c_onusrelnos.o_c_onusrelno)
    relnos.push({
      ...where,
      relation_id: id,
      type       : "ONUS",
      relno      : data.o_c_onusrelnos.o_c_onusrelno
    });
  // console.log("==========>", relnos);

  let onusInfo = {
    id                        : id,
    o_c_onus_advamount        : data?.o_c_onus_advamount,
    o_c_onus_balance          : data?.o_c_onus_balance,
    o_c_onus_rightopeneddate  : data?.o_c_onus_rightopeneddate,
    o_c_onus_starteddate      : moment(data?.o_c_onus_starteddate),
    o_c_onusmrtnos            : mrtnos,
    o_c_onusrelnos            : relnos,
    o_c_onus_paymentfinaldate : data?.o_c_onus_paymentfinaldate,
    o_c_onus_expdate          : data?.o_c_onus_expdate,
    o_c_onus_currencycode     : data?.o_c_onus_currencycode,
    o_c_onus_interestinperc3  : data?.o_c_onus_interestinperc,
    o_c_onus_commissionperc   : data?.o_c_onus_commissionperc,
    o_c_onus_fee              : data?.o_c_onus_fee,
    o_c_onus_loanclasscode    : data?.o_c_onus_loanclasscode,
    o_c_onus_isapproved       : data?.o_c_onus_isapproved,
    o_c_onus_loancharttype    : data?.o_c_onustransactions.c_onus_loancharttype,
    o_c_onus_interestcharttype: data?.o_c_onustransactions.c_onus_interestcharttype,
    ...where,
  };

  let TRANSACTIONS = [];
  await data?.o_c_onustransactions?.o_c_onusdetails?.o_c_onusdetail?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "DETAIL",
      relation_type: "ONUS",
      datetopay    : moment(item?.o_c_onusdetail_datetopay),
      amounttopay  : item?.o_c_onusdetail_amounttopay,
      relation_id  : onusInfo?.id,
    });
  });
  await data?.o_c_onustransactions?.o_c_onusperformances?.o_c_onusperformance?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "PERFORMANCE",
      relation_type: "ONUS",
      datetopay    : moment(item?.o_c_onusperformance_datetopay),
      amounttopay  : item?.o_c_onusperformance_amounttopay,
      relation_id  : onusInfo?.id,
    });
  });
  await data?.o_c_onustransactions?.o_c_onusinterestdetails?.o_c_onusinterestdetail?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "INTEREST_DETAIL",
      relation_type: "ONUS",
      datetopay    : moment(item?.o_c_onusinterestdetail_datetopay),
      amounttopay  : item?.o_c_onusinterestdetail_amounttopay,
      relation_id  : onusInfo?.id,
    });
  });
  await data?.o_c_onustransactions?.o_c_onusinterestperformances?.o_c_onusinterestperformance?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "INTEREST_PERFORMANCE",
      relation_type: "ONUS",
      datetopay    : moment(item?.o_c_onusinterestperformance_datetopay),
      amounttopay  : item?.o_c_onusinterestperformance_amounttopay,
      relation_id  : onusInfo?.id,
    });
  });
  let neoInfo = {
    relation_id             : onusInfo.id,
    relation_type           : "ONUS",
    orgmeasure              : data?.onus_neoinfo?.c_onus_orgmeasure,
    measuredate             : data?.onus_neoinfo?.c_onus_measuredate,
    measuredescription      : data?.onus_neoinfo?.c_onus_measuredescription,
    causetostartcase        : data?.onus_neoinfo?.c_onus_causetostartcase,
    datetstartcase          : data?.onus_neoinfo?.c_onus_datetstartcase,
    registertopolice        : data?.onus_neoinfo?.c_onus_registertopolice,
    registertopolicedate    : moment(data?.onus_neoinfo?.c_onus_registertopolicedate),
    timesinpolice           : data?.onus_neoinfo?.c_onus_timesinpolice,
    registertoprocuror      : data?.onus_neoinfo?.c_onus_registertoprocuror,
    registertoprocurordate  : data?.onus_neoinfo?.c_onus_registertoprocurordate,
    timesinprocuror         : data?.onus_neoinfo?.c_onus_timesinprocuror,
    registertocourt         : data?.onus_neoinfo?.c_onus_registertocourt,
    registertocourtdate     : data?.onus_neoinfo?.c_onus_registertocourtdate,
    timesincourt            : data?.onus_neoinfo?.c_onus_timesincourt,
    shiftocourt2            : data?.onus_neoinfo?.c_onus_shiftocourt2,
    shifttocourt2date       : data?.onus_neoinfo?.c_onus_shifttocourt2date,
    timesincourt2           : data?.onus_neoinfo?.c_onus_timesincourt2,
    shiftocourtdecision     : data?.onus_neoinfo?.c_onus_shiftocourtdecision,
    shifttocourtdecisiondate: data?.onus_neoinfo?.c_onus_shifttocourtdecisiondate,
    ignoredcrime            : data?.onus_neoinfo?.c_onus_ignoredcrime,
    ignoreddate             : data?.onus_neoinfo?.c_onus_ignoreddate,
    courtorderno            : data?.onus_neoinfo?.c_onus_courtorderno,
    ...where
  };

  onusInfo.transactions = TRANSACTIONS;
  onusInfo.neoInfo = neoInfo;

  return onusInfo;
};