import { db } from "@goodtechsoft/sequelize-postgres";
import { fall } from "../../../../utils";

export default async (data, session) => {
  const { where } = data;
  let rows = [];
  let relnos = [];
  let filters = {};
  if (where.o_c_registerno.length <= 8){
    filters.o_c_relationorg_registerno = where.o_c_registerno;
    filters.o_c_relationorg_orgrelation = "03";
    let relationOrg = await db.findAll(db.OCRelationorg, { where: filters }, session);
    if (relationOrg?.length > 0) {
      relnos = await db.findAll(db.Relno, { where: {
        relno           : relationOrg.map(item => item.o_c_relationcustomer_relno),
        o_c_customercode: relationOrg.map(item => item.o_c_customercode),
        o_c_bank_code   : relationOrg.map(item => item.o_c_bank_code),
        o_c_registerno  : relationOrg.map(item => item.o_c_registerno),
      } }, session);
      customer = relationOrg[0];
  } else {
    filters.o_c_relationcustomer_registerno = where.o_c_registerno;
    filters.o_c_relationcustomer_citizenrelation = "04";
    let relationCustomers = await db.findAll(db.OCRelationcustomer, { where: filters }, session);
    if (relationCustomers?.length > 0){
      relnos = await db.findAll(db.Relno, { where: {
        relno           : relationCustomers.map(item => item.o_c_relationcustomer_relno),
        o_c_customercode: relationCustomers.map(item => item.o_c_customercode),
        o_c_bank_code   : relationCustomers.map(item => item.o_c_bank_code),
        o_c_registerno  : relationCustomers.map(item => item.o_c_registerno),
      } }, session);
      customer = relationCustomers[0];
  }

  let falls = relnos.map(item => {
    return async () => {
      switch (item.type) {
        case "LOAN": {
          let value = await db.find(db.OCLoanInformation, { where: { id: item.relation_id } }, session);
          if (value){
            rows.push({
              ...value.dataValues,
              type: item.type
            });
          }
          break;
        }
        case "LEASING": {
          let value = await db.find(db.OCLeasing, { where: { id: item.relation_id } }, session);
          if (value){
            rows.push({
              ...value.dataValues,
              type: item.type
            });
          }
          break;
        }
        case "ACCREDIT": {
          let value = await db.find(db.OCAccredit, { where: { id: item.relation_id } }, session);
          // console.log("ACCREDIT=================================>", value);
          if (value){
            rows.push({
              ...value.dataValues,
              type: item.type
            });
          }
          break;
        }
        case "ONUS": {
          let value = await db.find(db.OCOnusInformation, { where: { id: item.relation_id } }, session);
          if (value){
            rows.push({
              ...value.dataValues,
              type: item.type
            });
          }
          break;
        }
        case "BOND": {
          let value = await db.find(db.OBond, { where: { id: item.relation_id } }, session);
          if (value){
            rows.push({
              ...value.dataValues,
              type: item.type
            });
          }
          break;
        }
        case "GUARANTEE": {
          let value = await db.find(db.OCGuarantee, { where: { id: item.relation_id } }, session);
          if (value){
            rows.push({
              ...value.dataValues,
              type: item.type
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