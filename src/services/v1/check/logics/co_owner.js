import { db } from "@goodtechsoft/sequelize-postgres";
import { fall } from "../../../../utils";
import { NotfoundError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS } from "../../../../constants";

export default async (data, session) => {
  const { where } = data;
  let rows = [];
  let relnos = [];
  let filters = {};
  if (where.o_c_registerno.length <= 8){
    filters.o_c_relationorg_registerno = where.o_c_registerno;
    let relationOrg = await db.findAll(db.OCRelationorg, { where: filters }, session);
    if (relationOrg?.length > 0) {
      relnos = await db.findAll(db.Relno, { where: {
        relno           : relationOrg.map(item => item.o_c_relationorg_relno),
        o_c_customercode: relationOrg.map(item => item.o_c_customercode),
        o_c_bank_code   : relationOrg.map(item => item.o_c_bank_code),
        o_c_registerno  : relationOrg.map(item => item.o_c_registerno),
      } }, session);
    } } else {
    filters.o_c_relationcustomer_registerno = where.o_c_registerno;
    let relationCustomers = await db.findAll(db.OCRelationcustomer, { where: filters }, session);
    if (relationCustomers?.length > 0){
      relnos = await db.findAll(db.Relno, { where: {
        relno           : relationCustomers.map(item => item.o_c_relationcustomer_relno),
        o_c_customercode: relationCustomers.map(item => item.o_c_customercode),
        o_c_bank_code   : relationCustomers.map(item => item.o_c_bank_code),
        o_c_registerno  : relationCustomers.map(item => item.o_c_registerno),
      } }, session);
    }
  }
  let falls = relnos.map(item => {
    return async () => {
      switch (item.type) {
        case "LOAN": {
          let value = await db.find(db.OCLoanInformation, { where: { id: item.relation_id } }, session);
          if (value){
            let customer = await db.find(db.Customer, { where: {
              o_c_customercode: value.o_c_customercode,
              o_c_bank_code   : value.o_c_bank_code,
              o_c_registerno  : value.o_c_registerno,
            } }, session);
            if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
            rows.push({
              ...value.dataValues,
              type: item.type,
              customer
            });
          }
          break;
        }
        case "LEASING": {
          let value = await db.find(db.OCLeasing, { where: { id: item.relation_id } }, session);
          if (value){
            let customer = await db.find(db.Customer, { where: {
              o_c_customercode: value.o_c_customercode,
              o_c_bank_code   : value.o_c_bank_code,
              o_c_registerno  : value.o_c_registerno,
            } }, session);
            if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
            rows.push({
              ...value.dataValues,
              type: item.type,
              customer,
            });
          }
          break;
        }
        case "ACCREDIT": {
          let value = await db.find(db.OCAccredit, { where: { id: item.relation_id } }, session);
          if (value){
            let customer = await db.find(db.Customer, { where: {
              o_c_customercode: value.o_c_customercode,
              o_c_bank_code   : value.o_c_bank_code,
              o_c_registerno  : value.o_c_registerno,
            } }, session);
            if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
            rows.push({
              ...value.dataValues,
              type: item.type,
              customer,
            });
          }
          break;
        }
        case "ONUS": {
          let value = await db.find(db.OCOnusInformation, { where: { id: item.relation_id } }, session);
          if (value){
            let customer = await db.find(db.Customer, { where: {
              o_c_customercode: value.o_c_customercode,
              o_c_bank_code   : value.o_c_bank_code,
              o_c_registerno  : value.o_c_registerno,
            } }, session);
            if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
            rows.push({
              ...value.dataValues,
              type: item.type,
              customer,
            });
          }
          break;
        }
        case "BOND": {
          let value = await db.find(db.OBond, { where: { id: item.relation_id } }, session);
          if (value){
            let customer = await db.find(db.Customer, { where: {
              o_c_customercode: value.o_c_customercode,
              o_c_bank_code   : value.o_c_bank_code,
              o_c_registerno  : value.o_c_registerno,
            } }, session);
            if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
            rows.push({
              ...value.dataValues,
              type: item.type,
              customer,
            });
          }
          break;
        }
        case "GUARANTEE": {
          let value = await db.find(db.OCGuarantee, { where: { id: item.relation_id } }, session);
          if (value){
            let customer = await db.find(db.Customer, { where: {
              o_c_customercode: value.o_c_customercode,
              o_c_bank_code   : value.o_c_bank_code,
              o_c_registerno  : value.o_c_registerno,
            } }, session);
            if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
            rows.push({
              ...value.dataValues,
              type: item.type,
              customer,
            });
          }
          break;
        }
        default: {
          break;
        }
      };
    };
  });
  await fall(falls);

  return ({
    rows : rows,
    count: rows.length
  });

};