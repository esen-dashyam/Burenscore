import { v4 as uuidv4 } from "uuid";

export default async (customerInfo) => {
  let customer = {
    id                             : uuidv4(),
    o_c_customercode               : customerInfo?.o_c_customercode,
    o_c_loandescription            : customerInfo?.o_c_loandescription,
    o_c_bank_code                  : customerInfo?.o_c_bankCode,
    o_c_branchcode                 : customerInfo?.o_c_branchcode,
    isorganization                 : customerInfo?.isorganization,
    o_c_customername               : customerInfo?.o_c_customername,
    c_lastname                     : customerInfo?.c_lastname,
    o_c_isforeign                  : customerInfo?.o_c_isforeign,
    o_c_birthdate                  : customerInfo?.o_c_birthdate,
    o_c_zipcode                    : customerInfo?.o_c_zipcode,
    o_c_address                    : customerInfo?.o_c_address,
    o_c_registerno                 : customerInfo?.o_c_registerno,
    o_c_stateregister_passportorno : customerInfo?.o_c_stateregister_passportorno,
    o_c_numofemployee              : customerInfo?.o_c_numofemployee,
    c_familynumofmembers           : customerInfo?.c_familynumofmembers,
    c_familynumofunemployed        : customerInfo?.c_familynumofunemployed,
    c_occupation                   : customerInfo?.c_occupation,
    o_fitchrating                  : customerInfo?.o_orgrate?.o_fitchrating,
    o_sandp_rating                 : customerInfo?.o_orgrate?.o_sandp_rating,
    o_moodysrating                 : customerInfo?.o_orgrate?.o_moodysrating,
    o_companytypecode              : customerInfo?.o_companytypecode,
    o_c_president_family_firstname : customerInfo?.o_c_president_family_firstname,
    o_c_president_family_lastname  : customerInfo?.o_c_president_family_lastname,
    o_c_president_family_isforeign : customerInfo?.o_c_president_family_isforeign,
    o_c_president_family_registerno: customerInfo?.o_c_president_family_registerno,
    o_noofshareholders             : customerInfo?.o_noofshareholders,
  };
  return customer;
};