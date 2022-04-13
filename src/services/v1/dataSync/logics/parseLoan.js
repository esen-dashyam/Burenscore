import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS } from "../../../../constants";
import Joi from "joi";

const schema = Joi.object({
  o_c_loan_provideLoanSize: Joi.number().required(),
  o_c_loan_balance        : Joi.number().required(),
  o_c_loan_loanProvenance : Joi.string().required(),
  o_c_loan_starteddate    : Joi.date().required(),
  o_c_loan_expdate        : Joi.date().required(),
  o_c_loan_currencycode   : Joi.string().required(),
  o_c_loan_sectorcode     : Joi.string().optional().allow([null, ""]),
  o_c_loan_interestinperc : Joi.number().required(),
  o_c_loan_commissionperc : Joi.number().required(),
  o_c_loan_fee            : Joi.number().required(),
  o_c_loan_loanclasscode  : Joi.string().required(),
  o_c_loan_loanintype     : Joi.string().required(),
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

  console.log("===========>LEAONINFO", data);
  try {
    await schema.validate(data);
  }
  catch (err) {
    console.log(err);
    throw new ValidationError(ERRORS.LOAN_PARSE_ERROR);
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
    o_c_provideloansize       : data?.o_c_provideLoanSize,
    o_c_loanmrtnos            : mrtnos,
    o_c_loanrelnos            : relnos,
    o_c_loan_loanprovenance   : data?.o_c_loan_loanprovenance,
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
  console.log("TRANSACTIONS", data?.o_c_loantransactions);
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