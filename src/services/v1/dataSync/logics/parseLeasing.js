import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS } from "../../../../constants";
import Joi from "joi";


const schema = Joi.object({
  o_c_leasing_advamount     : Joi.number().required(),
  o_c_leasing_balance       : Joi.number().required(),
  o_c_leasing_starteddate   : Joi.date().required(),
  o_c_leasing_expdate       : Joi.date().required(),
  o_c_leasing_currencycode  : Joi.string().required(),
  o_c_leasing_sectorcode    : Joi.string().required(),
  o_c_leasing_interestinperc: Joi.number().required(),
  o_c_leasing_commissionperc: Joi.number().required(),
  o_c_leasing_fee           : Joi.number().required(),
  o_c_leasing_updatedexpdate: Joi.date().required(),
  o_c_leasing_loanclasscode : Joi.string().required(),
  o_c_leasingtransactions   : Joi.object({
    o_c_leasing_loancharttype    : Joi.string().required(),
    o_c_leasing_interestcharttype: Joi.string().required(),
    o_c_leasingdetails           : Joi.object({
      o_c_leasingdetail: Joi.array().items(Joi.object({
        o_c_leasingdetail_datetopay  : Joi.date().required(),
        o_c_leasingdetail_amounttopay: Joi.number().required(),
      }))
    }),
    o_c_leasingperformances: Joi.object({
      o_c_leasingperformance: Joi.array().items(Joi.object({
        o_c_leasingperformance_datetopay  : Joi.date().required(),
        o_c_leasingperformance_amounttopay: Joi.number().required(),
      }))
    })

  }),
}).options({ allowUnknown: true });

export default async ({ data, where }) => {
  if (!data) return null;
  console.log(data.o_c_leasingtransactions.o_c_leasingdetails);
  try {
    await schema.validate(data);
  }
  catch (err) {
    console.log(err);
    throw new ValidationError(ERRORS.LEASINGINFO_PARSE_ERROR);
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
  } else {
    mrtnos.push({
      ...where,
      relation_id: id,
      type       : "LEASING",
      mrtno      : data?.o_c_leasingmrtno?.o_c_leasingmrtno
    });
  }
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
  } else {
    relnos.push({
      ...where,
      relation_id: id,
      type       : "LEASING",
      relno      : data?.o_c_leasingrelnos?.o_c_leasingrelno
    });
  }
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