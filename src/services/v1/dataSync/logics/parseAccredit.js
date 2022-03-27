import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export default async ({ data, where }) => {
  let id = uuidv4();
  let mrtnos = [];
  let relnos = [];
  if (Array.isArray(data.o_c_accreditmrtnos.o_c_accreditmrtno)){
    data.o_c_accreditmrtnos.o_c_accreditmrtno.forEach(item => {
      mrtnos.push({
        ...where,
        relation_id: id,
        type       : "ACCREDIT",
        mrtno      : item
      });
    });
  } else {
    mrtnos.push({
      ...where,
      relation_id: id,
      type       : "ACCREDIT",
      mrtno      : data.o_c_accreditmrtnos.o_c_accreditmrtno
    });
  }
  console.log("==========>", mrtnos);
  if (Array.isArray(data.o_c_accreditrelnos.o_c_accreditrelno)){
    data.o_c_accreditrelnos.o_c_accreditrelno.forEach(item => {
      relnos.push({
        ...where,
        relation_id: id,
        type       : "ACCREDIT",
        relno      : item
      });
    });
  } else {
    relnos.push({
      ...where,
      relation_id: id,
      type       : "ACCREDIT",
      relno      : data.o_c_accreditrelnos.o_c_accreditrelno
    });
  }
  console.log("==========>", relnos);
  let accredit = {
    id                         : id,
    o_c_accredit_advamount     : data?.o_c_accredit_advamount,
    o_c_accredit_starteddate   : moment(data?.o_c_accredit_starteddate),
    o_c_accredit_expdate       : data?.o_c_accredit_expdate,
    o_c_accredit_currencycode  : data?.o_c_accredit_currencycode,
    o_c_accredit_type          : data?.o_c_accredit_type,
    o_c_accredit_interestinperc: data?.o_c_accredit_interestinperc,
    o_c_accredit_commissionperc: data?.o_c_accredit_commissionperc,
    o_c_accredit_fee           : data?.o_c_accredit_fee,
    o_c_accredit_updatedexpdate: data?.o_c_accredit_updatedexpdate,
    o_c_accredit_extcount      : data?.o_c_accredit_extcount,
    o_c_accredit_balance       : data?.o_c_accredit_balance,
    o_c_accredit_isapproved    : data?.o_c_accredit_isapproved,
    o_c_accreditmrtnos         : mrtnos,
    o_c_accreditrelnos         : relnos,
    ...where,
  };
  return accredit;
};