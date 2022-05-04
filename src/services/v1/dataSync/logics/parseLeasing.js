import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS, ERROR_DETAILS, VALUE_CODES } from "../../../../constants";
import Joi from "joi";
import APPENDIX_A from "../../../../constants/APPENDIX_A";
import APPENDIX_EO from "../../../../constants/APPENDIX_EO";


const schema = Joi.object({
  o_c_leasing_advamount: Joi.number().max(999999999999999).precision(2).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2352";
          break;
        case "any.empty":
          err.message = "ME2304";
          break;
        case "number.base":
          err.message = "ME2305";
          break;
        case "number.max":
          err.message = "ME2303";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_leasing_balance: Joi.number().max(999999999999999).precision(2).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3645";
          break;
        case "any.empty":
          err.message = "ME3645";
          break;
        case "number.base":
          err.message = "ME3647";
          break;
        case "number.max":
          err.message = "ME3646";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_leasing_starteddate: Joi.string()
    .regex(/(^(((\d\d)(([02468][048])|([13579][26]))-02-29)|(((\d\d)(\d\d)))-((((0\d)|(1[0-2]))-((0\d)|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))\s(([01]\d|2[0-3]):([0-5]\d):([0-5]\d))$)/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type){
          case "any.required":
            err.message = "ME2306";
            break;
          case "any.empty":
            err.message = "ME2306";
            break;
          case "string.regex.base":
            err.message = "ME2307";
            break;
          default :
            break;
        }
      });
      return errors;
    }),
  o_c_leasing_expdate: Joi.string()
    .regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type){
          case "any.required":
            err.message = "ME2308";
            break;
          case "any.empty":
            err.message = "ME2308";
            break;
          case "string.regex.base":
            err.message = "ME2309";
            break;
          default :
            break;
        }
      });
      return errors;
    }),
  o_c_leasing_currencycode: Joi.string().valid(Object.keys(VALUE_CODES).map(item=>VALUE_CODES[item])).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2312";
          break;
        case "any.empty":
          err.message = "ME2310";
          break;
        case "any.valid":
          err.message = "ME2311";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_leasing_sectorcode: Joi.string().valid(Object.keys(APPENDIX_A).map(item=>APPENDIX_A[item])).required().error(errors=>{
    errors.forEach(err=>{
      switch (err.type){
        case "any.required":
          err.message = "ME4012";
          break;
        default:
          break;
      }
    })
  }),
  o_c_leasing_interestinperc: Joi.number().max(999999.99).precision(2).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2313";
          break;
        case "any.empty":
          err.message = "ME2313";
          break;
        case "number.max":
          err.message = "ME2314";
          break;
        case "number.base":
          err.message = "ME2316";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_leasing_commissionperc: Joi.number().max(999999999999.99).precision(2).required().required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2317";
          break;
        case "any.empty":
          err.message = "ME2317";
          break;
        case "number.max":
          err.message = "ME2318";
          break;
        case "number.base":
          err.message = "ME2319";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_leasing_fee: Joi.number().max(999999999999.99).precision(2).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2321";
          break;
        case "any.empty":
          err.message = "ME2321";
          break;
        case "number.max":
          err.message = "ME2322";
          break;
        case "number.base":
          err.message = "ME2324";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_leasing_updatedexpdate: Joi.string()
    .regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required().error(errors => {
      errors.forEach(err => {
        switch (err.type){
          case "string.regex.base":
            err.message = "ME2325";
            break;
          default :
            break;
        }
      });
      return errors;
    }),
  o_c_leasing_loanclasscode: Joi.string().valid(Object.keys(APPENDIX_EO).map(item=>APPENDIX_EO[item])).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2326";
          break;
        case "any.valid":
          err.message = "ME2328";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  // o_c_leasingtransactions   : Joi.object({
  //   o_c_leasing_loancharttype    : Joi.string().required(),
  //   o_c_leasing_interestcharttype: Joi.string().required(),
  //   o_c_leasingdetails           : Joi.object({
  //     o_c_leasingdetail: Joi.array().items(Joi.object({
  //       o_c_leasingdetail_datetopay  : Joi.date().required(),
  //       o_c_leasingdetail_amounttopay: Joi.number().required(),
  //     }))
  //   }),
  //   o_c_leasingperformances: Joi.object({
  //     o_c_leasingperformance: Joi.array().items(Joi.object({
  //       o_c_leasingperformance_datetopay  : Joi.date().required(),
  //       o_c_leasingperformance_amounttopay: Joi.number().required(),
  //     }))
  //   })

  // }),
}).options({ allowUnknown: true });

export default async ({ data, where }) => {
  if (!data) return null;
  console.log(data.o_c_leasingtransactions.o_c_leasingdetails);
  try {
    await schema.validate(data);
  }
  catch (err) {
    console.log(err);
    throw new ValidationError(err.details[0].message, ERROR_DETAILS[err.details[0].message]);
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
  } else if (data?.o_c_leasingmrtno?.o_c_leasingmrtno)
    mrtnos.push({
      ...where,
      relation_id: id,
      type       : "LEASING",
      mrtno      : data?.o_c_leasingmrtno?.o_c_leasingmrtno
    });
  console.log("==========>", mrtnos);
  if (Array.isArray(data.o_c_leasingrelnos.o_c_leasingrelno)){
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
    o_c_leasing_starteddate      : moment(data?.o_c_leasing_starteddate),
    o_c_leasing_expdate          : data?.o_c_leasing_expdate,
    o_c_leasing_currencycode     : data?.o_c_leasing_currencycode,
    o_c_leasing_sectorcode       : data?.o_c_leasing_sectorcode,
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
      datetopay    : moment(item?.o_c_leasingdetail_datetopay),
      amounttopay  : item?.o_c_leasingdetail_amounttopay,
      relation_id  : leasingInfo?.id,
    });
  });
  await data?.o_c_leasingtransactions?.o_c_leasingperformances?.o_c_leasingperformance?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "PERFORMANCE",
      relation_type: "LEASING",
      datetopay    : moment(item?.o_c_leasingperformance_datetopay),
      amounttopay  : item?.o_c_leasingperformance_amounttopay,
      relation_id  : leasingInfo?.id,
    });
  });
  await data?.o_c_leasingtransactions?.o_c_leasinginterestdetails?.o_c_leasinginterestdetail?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "INTEREST_DETAIL",
      relation_type: "LEASING",
      datetopay    : moment(item?.o_c_leasinginterestdetail_datetopay),
      amounttopay  : item?.o_c_leasinginterestdetail_amounttopay,
      relation_id  : leasingInfo?.id,
    });
  });
  await data?.o_c_leasingtransactions?.o_c_leasinginterestperformances?.o_c_leasinginterestperformance?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "INTEREST_PERFORMANCE",
      relation_type: "LEASING",
      datetopay    : moment(item?.o_c_leasinginterestperformance_datetopay),
      amounttopay  : item?.o_c_leasinginterestperformance_amounttopay,
      relation_id  : leasingInfo?.id,
    });
  });
  let neoInfo = {
    relation_id             : leasingInfo?.id,
    relation_type           : "LEASING",
    orgmeasure              : data?.leasing_neoinfo?.c_leasing_orgmeasure,
    measuredate             : data?.leasing_neoinfo?.c_leasing_measuredate,
    measuredescription      : data?.leasing_neoinfo?.c_leasing_measuredescription,
    causetostartcase        : data?.leasing_neoinfo?.c_leasing_causetostartcase,
    datetstartcase          : data?.leasing_neoinfo?.c_leasing_datetstartcase,
    registertopolice        : data?.leasing_neoinfo?.o_c_leasing_registertopolice,
    registertopolicedate    : moment(data?.leasing_neoinfo?.o_c_leasing_registertopolicedate),
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

  leasingInfo.transactions = TRANSACTIONS;
  leasingInfo.neoInfo = neoInfo;

  return leasingInfo;
};