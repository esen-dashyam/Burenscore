export default async ({ data, where }) => {
  let bond = {
    o_bond_advamount     : data?.o_bond_advamount,
	  o_c_bondmrtnos       : data?.o_c_bondmrtnos?.o_c_bondmrtno,
	  o_c_bondrelnos       : data?.o_c_bondrelnos?.o_c_bondrelno,
	  o_bond_starteddate   : data?.o_bond_starteddate,
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