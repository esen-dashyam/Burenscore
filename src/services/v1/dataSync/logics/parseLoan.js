import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS, ERROR_DETAILS, VALUE_CODES } from "../../../../constants";
import Joi from "joi";
import { max } from "joi/lib/types/array";
import APPENDIX_K from "../../../../constants/APPENDIX_K";
import APPENDIX_EO from "../../../../constants/APPENDIX_EO";

const schema = Joi.object({
  o_c_loan_provideLoanSize: Joi.number().max(999999999999999.99).precision(2).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2352";
          break;
        case "number.max":
          err.message = "ME2353";
          break;
        case "number.base":
          err.message = "ME2354";
          break;
        case "any.empty":
          err.message = "ME2352";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_loan_balance: Joi.number().max(999999999999999.99).precision(2).required().error(errors => {
    errors.forEach(err => {
      // console.log("===============================================================", err.type);
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
  o_c_loan_loanProvenance: Joi.string().valid(Object.keys(APPENDIX_K)).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2356";
          break;
        case "any.empty":
          err.message = "ME2356";
          break;
        case "any.valid":
          err.message = "ME2358";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  // o_c_loan_starteddate: Joi.string()
  //   .regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required().error(errors => {
  //     errors.forEach(err => {
  //       console.log("==================a=============", err.type);
  //       switch (err.type){
  //         case "any.required":
  //           err.message = "ME2359";
  //           break;
  //         case "any.empty":
  //           err.message = "ME2359";
  //           break;
  //         case "string.regex.base":
  //           err.message = "ME2360";
  //           break;
  //         default :
  //           break;
  //       }
  //     });
  //     return errors;
  //   }),
  o_c_loan_starteddate: Joi.string()
    .regex(/(^(((\d\d)(([02468][048])|([13579][26]))-02-29)|(((\d\d)(\d\d)))-((((0\d)|(1[0-2]))-((0\d)|(1\d)|(2[0-8])))|((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30)))))\s(([01]\d|2[0-3]):([0-5]\d):([0-5]\d))$)/).required().error(errors => {
      errors.forEach(err => {
        // console.log("==================a=============", err.type);
        switch (err.type){
          case "any.required":
            err.message = "ME2359";
            break;
          case "any.empty":
            err.message = "ME2359";
            break;
          case "string.regex.base":
            err.message = "ME2360";
            break;
          default :
            break;
        }
      });
      return errors;
    }),
  o_c_loan_expdate: Joi.string()
    .regex(/^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/).required().error(errors => {
      errors.forEach(err => {
        // console.log("==========================", err.type);
        switch (err.type){
          case "any.required":
            err.message = "ME2361";
            break;
          case "any.empty":
            err.message = "ME2361";
            break;
          case "string.regex.base":
            err.message = "ME2362";
            break;
          default :
            break;
        }
      });
      return errors;
    }),
  o_c_loan_currencycode: Joi.string().valid(Object.keys(VALUE_CODES).map(item=>VALUE_CODES[item])).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2363";
          break;
        case "any.empty":
          err.message = "ME2365";
          break;
        case "any.valid":
          err.message = "ME2365";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_loan_sectorcode: Joi.string().valid(Object.keys(VALUE_CODES).map(item=>VALUE_CODES[item])).optional().allow([null, ""]).error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME3040";
          break;
        case "any.valid":
          err.message = "ME3043";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_loan_interestinperc: Joi.number().max(999999.99).precision(2).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2366";
          break;
        case "any.empty":
          err.message = "ME2366";
          break;
        case "number.max":
          err.message = "ME2367";
          break;
        case "number.base":
          err.message = "ME2368";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_loan_commissionperc: Joi.number().max(999999999999.99).precision(2).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2370";
          break;
        case "any.empty":
          err.message = "ME2370";
          break;
        case "number.base":
          err.message = "ME2372";
          break;
        case "number.max":
          err.message = "ME2371";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_loan_fee: Joi.number().max(999999999999).precision(2).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2374";
          break;
        case "any.empty":
          err.message = "ME2374";
          break;
        case "number.base":
          err.message = "ME2376";
          break;
        case "number.max":
          err.message = "ME2375";
          break;
        default :
          break;
      }
    });
    return errors;
  }),
  o_c_loan_loanclasscode: Joi.string().valid(Object.keys(APPENDIX_EO).map(item=>APPENDIX_EO[item])).required().error(errors => {
    errors.forEach(err => {
      switch (err.type){
        case "any.required":
          err.message = "ME2380";
          break;
        case "any.empty":
          err.message = "ME2382";
          break;
        case "any.valid":
          err.message = "ME2382";
          break;
        case "string.max":
          err.message = "ME2381";
          break;
        default:
          break;
      }
    });
    return errors;
  }),
  // o_c_loan_loanintype: Joi.string().required().error(errors => {
  //   errors.forEach(err => {
  //     switch (err.type){
  //       case "any.required":
  //         err.message = "11111";
  //         break;
  //       case "any.empty":
  //         err.message = "M12310";
  //         break;
  //       case "string.min":
  //         err.message = "7";
  //         break;
  //       case "string.max":

  //         err.message = "20";
  //         break;
  //       default :
  //         break;
  //     }
  //   });
  //   return errors;
  // }),
  // o_c_loantransactions    : Joi.object({
  //   o_c_loan_loancharttype: Joi.string().required(),
  //   o_c_loandetails       : Joi.object({
  //     o_c_loandetail: Joi.array().items(Joi.object({
  //       o_c_loandetail_datetopay  : Joi.date().required(),
  //       o_c_loandetail_amounttopay: Joi.number().required(),
  //     })),
  //     o_c_loanperformances: Joi.object({
  //       o_c_loanperformance: Joi.array().items(Joi.object({
  //         o_c_loandetail_datetopay       : Joi.date().required(),
  //         o_c_loanperformance_amounttopay: Joi.number().required(),
  //       })),
  //       o_c_loaninterestdetails: Joi.object({
  //         o_c_loaninterestdetail: Joi.array().items(Joi.object({
  //           o_c_loaninterestdetail_datetopay  : Joi.date().required(),
  //           o_c_loaninterestdetail_amounttopay: Joi.number().required(),
  //         })),
  //         o_c_loaninterestperformances: Joi.object({
  //           o_c_loaninterestperformance: Joi.array().items(Joi.object({
  //             o_c_loaninterestperformance_datetopay  : Joi.date().required(),
  //             o_c_loaninterestperformance_amounttopay: Joi.date().required(),
  //           }))
  //         })
  //       })
  //     })
  //   })
  // }).required()
}).options({ allowUnknown: true });

export default async ({ data, where }) => {
  if (!data) return null;

  // console.log("===========>LEAONINFO", data);
  try {
    await schema.validate(data);
  }
  catch (err) {
    // console.log(err);
    throw new ValidationError(err.details[0].message, ERROR_DETAILS[err.details[0].message]);
  }
  let id = uuidv4();
  let mrtnos = [];
  let relnos = [];
  if (Array.isArray(data?.o_c_loanmrtnos?.o_c_loanmrtno)){
    data.o_c_loanmrtnos.o_c_loanmrtno.forEach(item => {
      mrtnos.push({
        ...where,
        relation_id: id,
        type       : "LOAN",
        mrtno      : item
      });
    });
  } else if (data?.o_c_loanmrtnos?.o_c_loanmrtno){
    mrtnos.push({
      ...where,
      relation_id: id,
      type       : "LOAN",
      mrtno      : data?.o_c_loanmrtnos?.o_c_loanmrtno
    });
  }
  if (Array.isArray(data?.o_c_loanrelnos?.o_c_loanrelno)){
    data.o_c_loanrelnos.o_c_loanrelno.forEach(item => {
      relnos.push({
        ...where,
        relation_id: id,
        type       : "LOAN",
        relno      : item
      });
    });
  } else if (data?.o_c_loanrelnos?.o_c_loanrelno)
    relnos.push({
      ...where,
      relation_id: id,
      type       : "LOAN",
      relno      : data?.o_c_loanrelnos?.o_c_loanrelno
    });

  let loanInfo = {
    id                        : id,
    o_c_provideloansize       : data?.o_c_loan_provideLoanSize,
    o_c_loanmrtnos            : mrtnos,
    o_c_loanrelnos            : relnos,
    o_c_loan_loanprovenance   : data?.o_c_loan_loanProvenance,
    o_c_loan_balance          : data?.o_c_loan_balance,
    o_c_loan_starteddate      : moment(data?.o_c_loan_starteddate),
    o_c_loan_expdate          : data?.o_c_loan_expdate,
    o_c_loan_currencycode     : data?.o_c_loan_currencycode,
    o_c_loan_sectorcode       : data?.o_c_loan_sectorcode,
    o_c_loan_interestinperc   : data?.o_c_loan_interestinperc,
    o_c_loan_commissionperc   : data?.o_c_loan_commissionperc,
    o_c_loan_fee              : data?.o_c_loan_fee,
    o_c_loan_extdate          : data?.o_c_loan_extdate,
    o_c_updatedexpdate        : data?.o_c_updatedexpdate,
    o_c_loan_loanclasscode    : data?.o_c_loan_loanclasscode,
    o_c_loan_isapproved       : data?.o_c_loan_isapproved,
    o_c_loan_loanintype       : data?.o_c_loan_loanintype,
    o_c_loan_loancharttype    : data?.o_c_loantransactions?.o_c_loan_loancharttype,
    o_c_loan_interestcharttype: data?.o_c_loantransactions?.o_c_loan_interestcharttype,
    ...where,
  };
  // console.log("TRANSACTIONS", data?.o_c_loantransactions);
  let TRANSACTIONS = [];
  await data?.o_c_loantransactions?.o_c_loandetails?.o_c_loandetail?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "DETAIL",
      relation_type: "LOAN",
      datetopay    : moment(item?.o_c_loandetail_datetopay),
      amounttopay  : item?.o_c_loandetail_amounttopay,
      relation_id  : loanInfo?.id,
    });
  });
  await data?.o_c_loantransactions?.o_c_loanperformances?.o_c_loanperformance?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "PERFORMANCE",
      relation_type: "LOAN",
      datetopay    : moment(item?.o_c_loanperformance_datetopay),
      amounttopay  : item?.o_c_loanperformance_amounttopay,
      relation_id  : loanInfo?.id,
    });
  });
  await data?.o_c_loantransactions?.o_c_loaninterestdetails?.o_c_loaninterestdetail?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "INTEREST_DETAIL",
      relation_type: "LOAN",
      datetopay    : moment(item?.o_c_loaninterestdetail_datetopay),
      amounttopay  : item?.o_c_loaninterestdetail_amounttopay,
      relation_id  : loanInfo?.id,
    });
  });
  await data?.o_c_loantransactions?.o_c_loaninterestperformances?.o_c_loaninterestperformance?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "INTEREST_PERFORMANCE",
      relation_type: "LOAN",
      datetopay    : moment(item?.o_c_loaninterestperformance_datetopay),
      amounttopay  : item?.o_c_loaninterestperformance_amounttopay,
      relation_id  : loanInfo?.id,
    });
  });

  let neoInfo = {
    relation_id             : loanInfo.id,
    relation_type           : "LOAN",
    orgmeasure              : data.loan_neoinfo?.c_loan_orgmeasure,
    measuredate             : data.loan_neoinfo?.c_loan_measuredate,
    measuredescription      : data.loan_neoinfo?.c_loan_measuredescription,
    causetostartcase        : data.loan_neoinfo?.c_loan_causetostartcase,
    datetstartcase          : data.loan_neoinfo?.c_loan_datetstartcase,
    registertopolice        : data.loan_neoinfo?.o_c_loan_registertopolice,
    registertopolicedate    : moment(data.loan_neoinfo?.o_c_loan_registertopolicedate),
    timesinpolice           : data.loan_neoinfo?.o_c_loan_timesinpolice,
    registertoprocuror      : data.loan_neoinfo?.o_c_loan_registertoprocuror,
    registertoprocurordate  : data.loan_neoinfo?.o_c_loan_registertoprocurordate,
    timesinprocuror         : data.loan_neoinfo?.o_c_loan_timesinprocuror,
    registertocourt         : data.loan_neoinfo?.o_c_loan_registertocourt,
    registertocourtdate     : data.loan_neoinfo?.o_c_loan_registertocourtdate,
    timesincourt            : data.loan_neoinfo?.o_c_loan_timesincourt,
    shiftocourt2            : data.loan_neoinfo?.o_c_loan_shiftocourt2,
    shifttocourt2date       : data.loan_neoinfo?.o_c_loan_shifttocourt2date,
    timesincourt2           : data.loan_neoinfo?.o_c_loan_timesincourt2,
    shiftocourtdecision     : data.loan_neoinfo?.o_c_loan_shiftocourtdecision,
    shifttocourtdecisiondate: data.loan_neoinfo?.o_c_loan_shifttocourtdecisiondate,
    ignoredcrime            : data.loan_neoinfo?.o_c_loan_ignoredcrime,
    ignoreddate             : data.loan_neoinfo?.o_c_loan_ignoreddate,
    courtorderno            : data.loan_neoinfo?.o_c_loan_courtorderno,
    ...where
  };

  loanInfo.transactions = TRANSACTIONS;
  loanInfo.neoInfo = neoInfo;

  return loanInfo;
};