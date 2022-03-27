import moment from "moment";

export default async ({ data, where }) => {
  let guarentee = {
    o_c_guarantee_advamount     : data?.o_c_guarantee_advamount,
    o_c_guarantee_starteddate   : moment(data?.o_c_guarantee_starteddate),
    o_c_guarantee_expdate       : data?.o_c_guarantee_expdate,
    o_c_guarantee_currencycode  : data?.o_c_guarantee_currencycode,
    o_c_guarantee_type          : data?.o_c_guarantee_currencycode,
    o_c_guarantee_sectorcode    : data?.o_c_guarantee_sectorcode,
    o_c_guarantee_interestinperc: data?.o_c_guarantee_interestinperc,
    o_c_guarantee_commissionperc: data?.o_c_guarantee_commissionperc,
    o_c_guarantee_fee           : data?.o_c_guarantee_fee,
    o_c_guarantee_updatedexpdate: data?.o_c_guarantee_updatedexpdate,
    o_c_guarantee_extcount      : data?.o_c_guarantee_extcount,
    o_c_guarantee_balance       : data?.o_c_guarantee_balance,
    o_c_guarantee_loanclasscode : data?.o_c_guarantee_loanclasscode,
    o_c_guarantee_isapproved    : data?.o_c_guarantee_isapproved,
    ...where,
  };
  return guarentee;
};