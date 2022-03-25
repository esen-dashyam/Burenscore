import { v4 as uuidv4 } from "uuid";

export default async ({ data, where }) => {
  let id = uuidv4();
  let leasingInfo = {
    id                   : id,
    o_c_leasing_advamount: data?.o_c_leasing_advamount,
    o_c_leasingmrtnos    : data?.o_c_leasingmrtnos?.o_c_leasingmrtno.map(item => {
      return {
        ...where,
        relation_id: id,
        type       : "LEASING",
        mrtno      : item
      };
    }),
    o_c_leasingrelnos: data?.o_c_leasingrelnos?.o_c_leasingrelno.map(item => {
      return {
        ...where,
        relation_id: id,
        type       : "LEASING",
        relno      : item
      };
    }),
    o_c_leasing_balance          : data?.o_c_leasing_balance,
    o_c_leasing_starteddate      : data?.o_c_leasing_starteddate,
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
  let neoInfo = {
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

  leasingInfo.transactions = TRANSACTIONS;
  leasingInfo.neoInfo = neoInfo;

  return leasingInfo;
};