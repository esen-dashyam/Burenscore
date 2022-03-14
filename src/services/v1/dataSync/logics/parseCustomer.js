import { CAROUSEL_TYPES, COOPERATION_TYPES } from "../../../../constants";
import { getCouponMessage } from "../../../../3dparty/Rakuten";
import { fall } from "../../../../utils";
import config from "../../../../config";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";


export default async (customerInfo) => {
  let customer =   {
    o_c_customercode:customerInfo.o_c_customercode,
    o_c_loandescription:customerInfo.o_c_loandescription,
    o_c_bank_code:customerInfo.
    o_c_branchcode:customerInfo.
    is_aco_c_isorganizationtive:customerInfo. 
    o_c_customername:customerInfo. 
    c_lastname:customerInfo. 
    o_c_isforeign:customerInfo. 
    o_c_birthdate:customerInfo. 
    o_c_zipcode:customerInfo. 
    o_c_address:customerInfo. 
    o_c_registerno:customerInfo. 
    o_c_stateregister_passportorno:customerInfo. 
    o_c_sectorcodes:customerInfo. 
    o_c_sectorcode:customerInfo. 
    o_c_numofemployee:customerInfo. 
    c_familynumofmembers:customerInfo. 
    c_familynumofunemployed:customerInfo. 
    c_job:customerInfo. 
    c_occupation:customerInfo. 
    o_fitchrating:customerInfo. 
    o_sandp_rating:customerInfo. 
    o_moodysrating:customerInfo. 
    o_companytypecode:customerInfo. 
    o_c_president_family_firstname:customerInfo. 
    o_c_president_family_lastname:customerInfo. 
    o_c_president_family_isforeign:customerInfo. 
    o_c_president_family_registerno:customerInfo. 
    o_noofshareholders:customerInfo. 
}
  return customer;
};