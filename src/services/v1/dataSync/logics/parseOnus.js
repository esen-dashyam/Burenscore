import { v4 as uuidv4 } from "uuid";

export default async ({ data, where }) => {
  let id = uuidv4();
  let onusInfo = {
    id                      : id,
    o_c_onus_advamount      : data?.o_c_onus_advamount,
    o_c_onus_balance        : data?.o_c_onus_balance,
    o_c_onus_rightopeneddate: data?.o_c_onus_rightopeneddate,
    o_c_onus_starteddate    : data?.o_c_onus_starteddate,
    o_c_onusmrtnos          : data?.o_c_onusmrtnos.o_c_onusmrtno.map(item => {
      return {
        ...where,
        relation_id: id,
        type       : "ONUS",
        mrtno      : item
      };
    }),
    o_c_onusrelnos: data?.o_c_onusrelnos.o_c_onusrelno.map(item => {
      return {
        ...where,
        relation_id: id,
        type       : "ONUS",
        relno      : item
      };
    }),
    o_c_onus_paymentfinaldate : data?.o_c_onus_paymentfinaldate,
    o_c_onus_expdate          : data?.o_c_onus_expdate,
    o_c_onus_currencycode     : data?.o_c_onus_currencycode,
    o_c_onus_interestinperc   : data?.o_c_onus_interestinperc,
    o_c_onus_commissionperc   : data?.o_c_onus_commissionperc,
    o_c_onus_fee              : data?.o_c_onus_fee,
    o_c_onus_loanclasscode    : data?.o_c_onus_loanclasscode,
    o_c_onus_isapproved       : data?.o_c_onus_isapproved,
    o_c_onus_loancharttype    : data?.o_c_onustransactions.o_c_onus_loancharttype,
    o_c_onus_interestcharttype: data?.o_c_onustransactions.o_c_onus_interestcharttype,
    ...where,
  };

  let TRANSACTIONS = [];
  await data?.o_c_onustransactions?.o_c_onusdetails?.o_c_onusdetail?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "DETAIL",
      relation_type: "ONUS",
      datetopay    : item?.o_c_onusdetail_datetopay,
      amounttopay  : item?.o_c_onusdetail_amounttopay,
      relation_id  : onusInfo?.id,
    });
  });
  await data?.o_c_onustransactions?.o_c_onusperformances?.o_c_onusperformance?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "PERFORMANCE",
      relation_type: "ONUS",
      datetopay    : item?.o_c_onusperformance_datetopay,
      amounttopay  : item?.o_c_onusperformance_amounttopay,
      relation_id  : onusInfo?.id,
    });
  });
  await data?.o_c_onustransactions?.o_c_onusinterestdetails?.o_c_onusinterestdetail?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "INTEREST_DETAIL",
      relation_type: "ONUS",
      datetopay    : item?.o_c_onusinterestdetail_datetopay,
      amounttopay  : item?.o_c_onusinterestdetail_amounttopay,
      relation_id  : onusInfo?.id,
    });
  });
  await data?.o_c_onustransactions?.o_c_onusinterestperformances?.o_c_onusinterestperformance?.forEach(item => {
    TRANSACTIONS.push({
      ...where,
      type         : "INTEREST_PERFORMANCE",
      relation_type: "ONUS",
      datetopay    : item?.o_c_onusinterestperformance_datetopay,
      amounttopay  : item?.o_c_onusinterestperformance_amounttopay,
      relation_id  : onusInfo?.id,
    });
  });
  let neoInfo = {
    relation_id       : onusInfo.id,
    relation_type     : "ONUS",
    orgmeasure        : data?.onus_neoinfo?.c_onus_orgmeasure,
    measuredate       : data?.onus_neoinfo?.c_onus_measuredate,
    measuredescription: data?.onus_neoinfo?.c_onus_measuredescription,
    causetostartcase  : data?.onus_neoinfo?.c_onus_causetostartcase,
    datetstartcase    : data?.onus_neoinfo?.c_onus_datetstartcase,
    ...where
  };

  onusInfo.transactions = TRANSACTIONS;
  onusInfo.neoInfo = neoInfo;

  return onusInfo;
};