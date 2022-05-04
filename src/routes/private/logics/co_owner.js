import { db } from "@goodtechsoft/sequelize-postgres";
import { APPENDIX, ERRORS } from "../../../constants";
import moment from "moment";
import { fall } from "../../../utils";
import { NotfoundError } from "@goodtechsoft/micro-service/lib/errors";

export default async (register_no, session) => {
  let filters = {};
  let relnos = [];
  let PAID_LOANS = [];
  let PAID_BONDS = [];
  let PAID_LEASINGS = [];
  let PAID_ONUS = [];
  let UNPAID_LOANS = [];
  let UNPAID_LEASINGS = [];
  let UNPAID_ONUS = [];
  let UNPAID_BONDS = [];
  let GUARANTEES = [];
  let ACCREDITS = [];
  let where = {
    o_c_registerno: register_no
  };
  let customer = {};
  if (where.o_c_registerno.length <= 8){
    // console.log("==============>", where.o_c_registerno.length);
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
      // console.log("RELNOS=====================================>", relnos);
      customer = relationOrg[0];
    } else {
      throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
    }
  } else {
    filters.o_c_relationcustomer_registerno = where.o_c_registerno;
    filters.o_c_relationcustomer_citizenrelation = "04";
    // console.log(filters);
    let relationCustomers = await db.findAll(db.OCRelationcustomer, { where: filters }, session);
    // console.log(relationCustomers);
    if (relationCustomers?.length > 0){
      relnos = await db.findAll(db.Relno, { where: {
        relno           : relationCustomers.map(item => item.o_c_relationcustomer_relno),
        o_c_customercode: relationCustomers.map(item => item.o_c_customercode),
        o_c_bank_code   : relationCustomers.map(item => item.o_c_bank_code),
        o_c_registerno  : relationCustomers.map(item => item.o_c_registerno),
      } }, session);
      // console.log("relationCustomers=====================================>", relnos);
      customer = relationCustomers[0];
    } else {
      throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
    }
  }

  let falls = relnos.map(item => {
    return async () => {
      switch (item.type) {
        case "LOAN": {
          // console.log("=====================================>", item.relation_id);
          let value = await db.find(db.OCLoanInformation, { where: { id: item.relation_id } }, session);
          if (value && value.payment_status === "PAID"){
            PAID_LOANS.push({
              ...value.dataValues,
              o_c_loan_starteddate  : moment(value.o_c_loan_starteddate).format("YYYY-MM-DD"),
              o_c_loan_expdate      : moment(value.o_c_loan_expdate).format("YYYY-MM-DD"),
              o_c_loan_extdate      : moment(value.o_c_loan_extdate).format("YYYY-MM-DD"),
              o_c_updatedexpdate    : moment(value.o_c_updatedexpdate).format("YYYY-MM-DD"),
              o_c_loan_loanclasscode: APPENDIX.APPENDIX_EO[value.o_c_loan_loanclasscode]
            });
          } else if (value){
            UNPAID_LOANS.push({
              ...value.dataValues,
              o_c_loan_starteddate  : moment(value.o_c_loan_starteddate).format("YYYY-MM-DD"),
              o_c_loan_expdate      : moment(value.o_c_loan_expdate).format("YYYY-MM-DD"),
              o_c_loan_extdate      : moment(value.o_c_loan_extdate).format("YYYY-MM-DD"),
              o_c_updatedexpdate    : moment(value.o_c_updatedexpdate).format("YYYY-MM-DD"),
              o_c_loan_loanclasscode: APPENDIX.APPENDIX_EO[value.o_c_loan_loanclasscode]
            });
          }
          break;
        }
        case "LEASING": {
          let value = await db.find(db.OCLeasing, { where: { id: item.relation_id } }, session);
          if (value && value.payment_status === "PAID"){
            PAID_LEASINGS.push({
              ...value.dataValues,
              o_c_leasing_starteddate  : moment(value.o_c_leasing_starteddate).format("YYYY-MM-DD"),
              o_c_leasing_expdate      : moment(value.o_c_leasing_starteddate).format("YYYY-MM-DD"),
              o_c_leasing_loanclasscode: APPENDIX.APPENDIX_EO[value.o_c_leasing_loanclasscode]
            });
          } else if (value) {
            UNPAID_LEASINGS.push({
              ...value.dataValues,
              o_c_leasing_starteddate  : moment(value.o_c_leasing_starteddate).format("YYYY-MM-DD"),
              o_c_leasing_expdate      : moment(value.o_c_leasing_starteddate).format("YYYY-MM-DD"),
              o_c_leasing_loanclasscode: APPENDIX.APPENDIX_EO[value.o_c_leasing_loanclasscode]
            });
          }
          break;
        }
        case "ACCREDIT": {
          let value = await db.find(db.OCAccredit, { where: { id: item.relation_id } }, session);
          console.log("ACCREDIT=================================>", value);
          ACCREDITS.push({
            ...value.dataValues
          });
          break;
        }
        case "ONUS": {
          let value = await db.find(db.OCOnusInformation, { where: { id: item.relation_id } }, session);
          if (value && item.payment_status === "PAID"){
            PAID_ONUS.push({
              ...value.dataValues,
              o_c_onus_rightopeneddate : moment(value.o_c_onus_rightopeneddate).format("YYYY-MM-DD"),
              o_c_onus_starteddate     : moment(value.o_c_onus_starteddate).format("YYYY-MM-DD"),
              o_c_onus_paymentfinaldate: moment(value.o_c_onus_paymentfinaldate).format("YYYY-MM-DD"),
              o_c_onus_expdate         : moment(value.o_c_onus_expdate).format("YYYY-MM-DD"),
              o_c_onus_loanclasscode   : APPENDIX.APPENDIX_EO[value.o_c_onus_loanclasscode]
            });
          } else if (value) {
            UNPAID_ONUS.push({
              ...item.dataValues,
              o_c_onus_rightopeneddate : moment(value.o_c_onus_rightopeneddate).format("YYYY-MM-DD"),
              o_c_onus_starteddate     : moment(value.o_c_onus_starteddate).format("YYYY-MM-DD"),
              o_c_onus_paymentfinaldate: moment(value.o_c_onus_paymentfinaldate).format("YYYY-MM-DD"),
              o_c_onus_expdate         : moment(value.o_c_onus_expdate).format("YYYY-MM-DD"),
              o_c_onus_loanclasscode   : APPENDIX.APPENDIX_EO[value.o_c_onus_loanclasscode]
            });
          }
          break;
        }
        case "BOND": {
          let value = await db.find(db.OBond, { where: { id: item.relation_id } }, session);
          if (value && value.payment_status === "PAID"){
            PAID_BONDS.push({
              ...value.dataValues,
              o_bond_starteddate: moment(value.o_bond_starteddate).format("YYYY-MM-DD"),
              o_bond_expdate    : moment(value.o_bond_expdate).format("YYYY-MM-DD")
            });
          } else if (value){
            UNPAID_BONDS.push({
              ...value.dataValues,
              o_bond_starteddate: moment(value.o_bond_starteddate).format("YYYY-MM-DD"),
              o_bond_expdate    : moment(value.o_bond_expdate).format("YYYY-MM-DD")
            });
          }
          break;
        }
        case "GUARANTEE": {
          let value = await db.find(db.OCGuarantee, { where: { id: item.relation_id } }, session);
          if (value){
            GUARANTEES.push({
              ...value.dataValues,
              o_c_guarantee_loanclasscode: APPENDIX.APPENDIX_EO[item?.o_c_guarantee_loanclasscode]
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
  return {
    get_date: moment(new Date).tz("Asia/Ulaanbaatar").format("YYYY-MM-DD HH:mm"),
    customer,
    PAID_LOANS,
    PAID_BONDS,
    PAID_LEASINGS,
    PAID_ONUS,
    UNPAID_LOANS,
    UNPAID_LEASINGS,
    UNPAID_ONUS,
    UNPAID_BONDS,
    GUARANTEES,
    ACCREDITS,
  };
};