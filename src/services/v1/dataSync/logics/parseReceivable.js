import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export default async ({ data, where }) => {
  let receivableInfo = {
    id                              : uuidv4(),
	  o_c_receivable_balance          : data?.o_c_receivable_balance,
	  o_c_receivable_advamount        : data?.o_c_receivable_advamount,
	  o_c_receivable_starteddate      : moment(data?.o_c_receivable_starteddate),
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
      datetopay    : moment(item?.o_c_receivabledetail_datetopay),
      amounttopay  : item?.o_c_receivabledetail_amounttopay,
      relation_id  : receivableInfo?.id,
    });
  });
  await data?.o_c_receivabletransactions?.o_c_receivableperformances?.o_c_receivableperformance?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "PERFORMANCE",
      relation_type: "RECEIVABLE",
      datetopay    : moment(item?.o_c_receivableperformance_datetopay),
      amounttopay  : item?.o_c_receivableperformance_amounttopay,
      relation_id  : receivableInfo?.id,
    });
  });
  await data?.o_c_receivabletransactions?.o_c_receivableinterestdetails?.o_c_receivableinterestdetail?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "INTEREST_DETAIL",
      relation_type: "RECEIVABLE",
      datetopay    : moment(item?.o_c_receivableinterestdetail_datetopay),
      amounttopay  : item?.o_c_receivableinterestdetail_amounttopay,
      relation_id  : receivableInfo?.id,
    });
  });
  await data?.o_c_receivabletransactions?.o_c_receivableinterestperformances?.o_c_receivableinterestperformance?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "INTEREST_PERFORMANCE",
      relation_type: "RECEIVABLE",
      datetopay    : moment(item?.o_c_receivableinterestperformance_datetopay),
      amounttopay  : item?.o_c_receivableinterestperformance_amounttopay,
      relation_id  : receivableInfo?.id,
    });
  });
  let neoInfo = {
    relation_id             : receivableInfo.id,
    relation_type           : "RECEIVABLE",
    orgmeasure              : data?.receivable_neoinfo?.c_receivable_orgmeasure,
    measuredate             : data?.receivable_neoinfo?.c_receivable_measuredate,
    measuredescription      : data?.receivable_neoinfo?.c_receivable_measuredescription,
    causetostartcase        : data?.receivable_neoinfo?.c_receivable_causetostartcase,
    datetstartcase          : data?.receivable_neoinfo?.c_receivable_datetstartcase,
    registertopolice        : data?.receivable_neoinfo?.o_c_receivable_registertopolice,
    registertopolicedate    : moment(data?.receivable_neoinfo?.o_c_receivable_registertopolicedate),
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

  receivableInfo.transactions = TRANSACTIONS;
  receivableInfo.neoInfo = neoInfo;

  return receivableInfo;
};