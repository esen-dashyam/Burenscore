

import { db } from "@goodtechsoft/sequelize-postgres";
import { fall } from "../../../../utils";

export default async (data, session) => {
  const { where } = data;
  let rows = [];
  let relnos = [];
  let filters = {};
  if (where.o_c_registerno.length <= 8){
    console.log("==============>", where.o_c_registerno.length);
    filters.o_c_relationorg_registerno = where.o_c_registerno;
    filters.o_c_relationorg_orgrelation = "03";
    let relationOrg = await db.findAll(db.OCRelationorg, { where: filters }, session);
    if (relationOrg.length > 0) {
      relnos = await db.findAll(db.Relno, { where: relationOrg.map(item => item.o_c_relationcustomer_relno) }, session);
      console.log("RELNOS=====================================>", relnos);
    }
  } else {
    filters.o_c_relationcustomer_registerno = where.o_c_registerno;
    filters.o_c_relationcustomer_citizenrelation = "04";
    let relationCustomers = await db.findAll(db.OCRelationcustomer, { where: filters }, session);
    if (relationCustomers.length > 0){
      relnos = await db.findAll(db.Relno, { where: relationCustomers.map(item => item.o_c_relationcustomer_relno) }, session);
      console.log("relationCustomers=====================================>", relationCustomers);
    }
  }

  let falls = relnos.map(item => {
    return async () => {
      switch (item.type) {
        case "LOAN": {
          console.log("=====================================>", item.relation_id);
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
          console.log("ACCREDIT=================================>", value);
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