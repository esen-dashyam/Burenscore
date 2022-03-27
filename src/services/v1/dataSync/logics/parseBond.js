import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export default async ({ data, where }) => {
  let id = uuidv4();
  let mrtnos = [];
  let relnos = [];
  if (Array.isArray(data.o_c_bondmrtnos.o_c_bondmrtno)){
    data.o_c_bondmrtnos.o_c_bondmrtno.forEach(item => {
      mrtnos.push({
        ...where,
        relation_id: id,
        type       : "BOND",
        mrtno      : item
      });
    });
  } else {
    mrtnos.push({
      ...where,
      relation_id: id,
      type       : "BOND",
      mrtno      : data.o_c_bondmrtnos.o_c_bondmrtno
    });
  }
  console.log("==========>", mrtnos);
  if (Array.isArray(data.o_c_bondrelnos.o_c_bondrelno)){
    data.o_c_bondrelnos.o_c_bondrelno.forEach(item => {
      relnos.push({
        ...where,
        relation_id: id,
        type       : "BOND",
        relno      : item
      });
    });
  } else {
    relnos.push({
      ...where,
      relation_id: id,
      type       : "BOND",
      relno      : data.o_c_bondrelnos.o_c_bondrelno
    });
  }
  console.log("==========>", relnos);


  let bond = {
    id                   : id,
    o_bond_advamount     : data?.o_bond_advamount,
	  o_c_bondmrtnos       : mrtnos,
	  o_c_bondrelnos       : relnos,
	  o_bond_starteddate   : moment(data?.o_bond_starteddate),
	  o_bond_expdate       : data?.o_bond_expdate,
	  o_bond_currencycode  : data?.o_bond_currencycode,
	  o_bond_type          : data?.o_bond_type,
	  o_bond_bondmarket    : data?.o_bond_bondmarket,
	  o_bond_numberofbonds : data?.o_bond_numberofbonds,
	  o_bond_bondunitprice : data?.o_bond_bondunitprice,
	  o_bond_interestinperc: data?.o_bond_interestinperc,
	  o_bond_balance       : data?.o_bond_balance,
	  o_bond_isapproved    : data?.o_bond_isapproved,
    ...where,
  };
  return bond;
};