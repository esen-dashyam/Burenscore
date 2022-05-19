import { db } from "@goodtechsoft/sequelize-postgres";
import { APPENDIX, ERRORS, FORMATTABLE_VARIABLES } from "../../../../constants";
import moment from "moment";
import { fall } from "../../../../utils";
import { NotfoundError } from "@goodtechsoft/micro-service/lib/errors";

const formatter = (value = {}, model) => {

  const attributes = model.rawAttributes;

  const mapped = Object.keys(attributes).reduce((acc, key) => {
    return {
      ...acc,
      [key]: attributes[key].type.constructor.name
    };
  }, {});

  return {
    ...Object.keys(value).reduce((acc, key) => {
      let attributeType = mapped[key];

      if (attributeType && value[key] && attributeType === "DATE") {
        return {
          ...acc,
          [key]: moment(value[key]).tz("Asia/Ulaanbaatar").format("YYYY-MM-DD")
        };
      }
      if (key === "o_c_loan_loanclasscode" || key === "o_c_leasing_loanclasscode" || key ==="o_c_onus_loanclasscode" || key === "o_c_receivable_loanclasscode" || key === "o_c_loanline_loanclasscode" || key === "o_c_guarantee_loanclasscode"){
        return {
          ...acc,
          [key]          : value[key],
          [`${key}_name`]: APPENDIX[FORMATTABLE_VARIABLES[key]][value[key]] || value[key]
        };
      }
      if (FORMATTABLE_VARIABLES[key]){
        return {
          ...acc,
          [key]: APPENDIX[FORMATTABLE_VARIABLES[key]][value[key]] || value[key],
        };
      }
      if (key === "o_c_bank_code"){
        return {
          ...acc,
          [key]        : value[key],
          o_c_bank_name: APPENDIX[FORMATTABLE_VARIABLES.o_c_bank_name][value[key]] || value[key]
        };

      }
      return {
        ...acc,
        [key]: value[key]
      };
    }, {})
  };
};

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
    // filters.o_c_relationorg_orgrelation = "03";
    let relationOrg = await db.findAll(db.OCRelationorg, { where: filters }, session);
    if (relationOrg?.length > 0) {
      relnos = await db.findAll(db.Relno, { where: {
        relno           : relationOrg.map(item => item.o_c_relationorg_relno),
        o_c_customercode: relationOrg.map(item => item.o_c_customercode),
        o_c_bank_code   : relationOrg.map(item => item.o_c_bank_code),
        o_c_registerno  : relationOrg.map(item => item.o_c_registerno),
      } }, session);
      // console.log("RELNOS=====================================>", relnos);
      customer = {
        ...relationOrg[0].dataValues,
        o_c_relationorg_orgrelation: APPENDIX.APPENDIX_G[relationOrg[0]?.o_c_relationorg_orgrelation]
      };
    } else {
      throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
    }
  } else {
    filters.o_c_relationcustomer_registerno = where.o_c_registerno;
    // filters.o_c_relationcustomer_citizenrelation = "04";
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
      customer = {
        ...relationCustomers[0].dataValues,
        o_c_relationcustomer_citizenrelation: APPENDIX.APPENDIX_D[relationCustomers[0]?.o_c_relationcustomer_citizenrelation]
      };
    } else {
      throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
    }
  }
  // o_c_customercode: {
  //   type     : DataTypes.STRING(55),
  //   allowNull: false,
  // },
  // o_c_bank_code: {
  //   type     : DataTypes.STRING(255),
  //   allowNull: false,
  // },
  // o_c_registerno: {
  //   type     : DataTypes.STRING(255),
  //   allowNull: false,
  // },
  let falls = relnos.map(item => {
    return async () => {
      switch (item.type) {
        case "LOAN": {
          // console.log("=====================================>", item.relation_id);
          let value = await db.find(db.OCLoanInformation, { where: { id: item.relation_id } }, session).then(data => formatter(data.dataValues, db.OCLoanInformation));
          if (value && value.payment_status === "PAID"){
            let customer = await db.find(db.Customer, { where: {
              o_c_customercode: value.o_c_customercode,
              o_c_bank_code   : value.o_c_bank_code,
              o_c_registerno  : value.o_c_registerno,
            } }, session);
            let mrtnos = await db.findAll(db.Mrtno, { where: { relation_id: value.id } }, session);
            let mortgage;
            if (mrtnos.length > 0){
              mortgage = await db.findAll(db.OCMortgage, { where: {
                o_c_customercode: value.o_c_customercode,
                o_c_bank_code   : value.o_c_bank_code,
                o_c_registerno  : value.o_c_registerno,
                o_c_mrtno       : mrtnos.map(item => item.mrtno) } }, session);
            }
            if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
            PAID_LOANS.push({
              ...value,
              mortgage,
              // o_c_loan_starteddate  : moment(value.o_c_loan_starteddate).format("YYYY-MM-DD"),
              // o_c_loan_expdate      : moment(value.o_c_loan_expdate).format("YYYY-MM-DD"),
              // o_c_loan_extdate      : moment(value.o_c_loan_extdate).format("YYYY-MM-DD"),
              // o_c_updatedexpdate    : moment(value.o_c_updatedexpdate).format("YYYY-MM-DD"),
              // o_c_loan_loanclasscode: APPENDIX.APPENDIX_EO[value.o_c_loan_loanclasscode],
              customer,
            });
          } else if (value){
            let customer = await db.find(db.Customer, { where: {
              o_c_customercode: value.o_c_customercode,
              o_c_bank_code   : value.o_c_bank_code,
              o_c_registerno  : value.o_c_registerno,
            } }, session);
            if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
            let mrtnos = await db.findAll(db.Mrtno, { where: { relation_id: value.id } }, session);
            let mortgage;
            if (mrtnos.length > 0){
              mortgage = await db.findAll(db.OCMortgage, { where: {
                o_c_customercode: value.o_c_customercode,
                o_c_bank_code   : value.o_c_bank_code,
                o_c_registerno  : value.o_c_registerno,
                o_c_mrtno       : mrtnos.map(item => item.mrtno) } }, session);
            }
            UNPAID_LOANS.push({
              ...value,
              // o_c_loan_starteddate  : moment(value.o_c_loan_starteddate).format("YYYY-MM-DD"),
              // o_c_loan_expdate      : moment(value.o_c_loan_expdate).format("YYYY-MM-DD"),
              // o_c_loan_extdate      : moment(value.o_c_loan_extdate).format("YYYY-MM-DD"),
              // o_c_updatedexpdate    : moment(value.o_c_updatedexpdate).format("YYYY-MM-DD"),
              // o_c_loan_loanclasscode: APPENDIX.APPENDIX_EO[value.o_c_loan_loanclasscode],
              customer,
              mortgage
            });
          }
          break;
        }
        case "LEASING": {
          let value = await db.find(db.OCLeasing, { where: { id: item.relation_id } }, session).then(data => formatter(data.dataValues, db.OCLeasing));
          if (value && value.payment_status === "PAID"){
            let customer = await db.find(db.Customer, { where: {
              o_c_customercode: value.o_c_customercode,
              o_c_bank_code   : value.o_c_bank_code,
              o_c_registerno  : value.o_c_registerno,
            } }, session);
            if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
            let mrtnos = await db.findAll(db.Mrtno, { where: { relation_id: value.id } }, session);
            let mortgage;
            if (mrtnos.length > 0){
              mortgage = await db.findAll(db.OCMortgage, { where: {
                o_c_customercode: value.o_c_customercode,
                o_c_bank_code   : value.o_c_bank_code,
                o_c_registerno  : value.o_c_registerno,
                o_c_mrtno       : mrtnos.map(item => item.mrtno) } }, session);
            }
            PAID_LEASINGS.push({
              ...value,
              // o_c_leasing_starteddate  : moment(value.o_c_leasing_starteddate).format("YYYY-MM-DD"),
              // o_c_leasing_expdate      : moment(value.o_c_leasing_starteddate).format("YYYY-MM-DD"),
              // o_c_leasing_loanclasscode: APPENDIX.APPENDIX_EO[value.o_c_leasing_loanclasscode],
              customer,
              mortgage
            });
          } else if (value) {
            let customer = await db.find(db.Customer, { where: {
              o_c_customercode: value.o_c_customercode,
              o_c_bank_code   : value.o_c_bank_code,
              o_c_registerno  : value.o_c_registerno,
            } }, session);
            if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
            let mrtnos = await db.findAll(db.Mrtno, { where: { relation_id: value.id } }, session);
            let mortgage;
            if (mrtnos.length > 0){
              mortgage = await db.findAll(db.OCMortgage, { where: {
                o_c_customercode: value.o_c_customercode,
                o_c_bank_code   : value.o_c_bank_code,
                o_c_registerno  : value.o_c_registerno,
                o_c_mrtno       : mrtnos.map(item => item.mrtno) } }, session);
            }
            UNPAID_LEASINGS.push({
              ...value,
              // o_c_leasing_starteddate  : moment(value.o_c_leasing_starteddate).format("YYYY-MM-DD"),
              // o_c_leasing_expdate      : moment(value.o_c_leasing_starteddate).format("YYYY-MM-DD"),
              // o_c_leasing_loanclasscode: APPENDIX.APPENDIX_EO[value.o_c_leasing_loanclasscode],
              customer,
              mortgage
            });
          }
          break;
        }
        case "ACCREDIT": {
          let value = await db.find(db.OCAccredit, { where: { id: item.relation_id } }, session).then(data => formatter(data.dataValues, db.OCAccredit));
          if (value){
            let customer = await db.find(db.Customer, { where: {
              o_c_customercode: value.o_c_customercode,
              o_c_bank_code   : value.o_c_bank_code,
              o_c_registerno  : value.o_c_registerno,
            } }, session);
            if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
            let mrtnos = await db.findAll(db.Mrtno, { where: { relation_id: value.id } }, session);
            let mortgage;
            if (mrtnos.length > 0){
              mortgage = await db.findAll(db.OCMortgage, { where: {
                o_c_customercode: value.o_c_customercode,
                o_c_bank_code   : value.o_c_bank_code,
                o_c_registerno  : value.o_c_registerno,
                o_c_mrtno       : mrtnos.map(item => item.mrtno) } }, session);
            }
            ACCREDITS.push({
              ...value,
              customer,
              mortgage
            });
          }
          break;
        }
        case "ONUS": {
          let value = await db.find(db.OCOnusInformation, { where: { id: item.relation_id } }, session).then(data => formatter(data.dataValues, db.OCOnusInformation));
          if (value && item.payment_status === "PAID"){
            let customer = await db.find(db.Customer, { where: {
              o_c_customercode: value.o_c_customercode,
              o_c_bank_code   : value.o_c_bank_code,
              o_c_registerno  : value.o_c_registerno,
            } }, session);
            if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
            let mrtnos = await db.findAll(db.Mrtno, { where: { relation_id: value.id } }, session);
            let mortgage;
            if (mrtnos.length > 0){
              mortgage = await db.findAll(db.OCMortgage, { where: {
                o_c_customercode: value.o_c_customercode,
                o_c_bank_code   : value.o_c_bank_code,
                o_c_registerno  : value.o_c_registerno,
                o_c_mrtno       : mrtnos.map(item => item.mrtno) } }, session);
            }
            PAID_ONUS.push({
              ...value,
              // o_c_onus_rightopeneddate : moment(value.o_c_onus_rightopeneddate).format("YYYY-MM-DD"),
              // o_c_onus_starteddate     : moment(value.o_c_onus_starteddate).format("YYYY-MM-DD"),
              // o_c_onus_paymentfinaldate: moment(value.o_c_onus_paymentfinaldate).format("YYYY-MM-DD"),
              // o_c_onus_expdate         : moment(value.o_c_onus_expdate).format("YYYY-MM-DD"),
              // o_c_onus_loanclasscode: APPENDIX.APPENDIX_EO[value.o_c_onus_loanclasscode],
              customer,
              mortgage
            });
          } else if (value) {
            let customer = await db.find(db.Customer, { where: {
              o_c_customercode: value.o_c_customercode,
              o_c_bank_code   : value.o_c_bank_code,
              o_c_registerno  : value.o_c_registerno,
            } }, session);
            if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
            let mrtnos = await db.findAll(db.Mrtno, { where: { relation_id: value.id } }, session);
            let mortgage;
            if (mrtnos.length > 0){
              mortgage = await db.findAll(db.OCMortgage, { where: {
                o_c_customercode: value.o_c_customercode,
                o_c_bank_code   : value.o_c_bank_code,
                o_c_registerno  : value.o_c_registerno,
                o_c_mrtno       : mrtnos.map(item => item.mrtno) } }, session);
            }
            UNPAID_ONUS.push({
              ...item,
              // o_c_onus_rightopeneddate : moment(value.o_c_onus_rightopeneddate).format("YYYY-MM-DD"),
              // o_c_onus_starteddate     : moment(value.o_c_onus_starteddate).format("YYYY-MM-DD"),
              // o_c_onus_paymentfinaldate: moment(value.o_c_onus_paymentfinaldate).format("YYYY-MM-DD"),
              // o_c_onus_expdate         : moment(value.o_c_onus_expdate).format("YYYY-MM-DD"),
              // o_c_onus_loanclasscode: APPENDIX.APPENDIX_EO[value.o_c_onus_loanclasscode],
              customer,
              mortgage
            });
          }
          break;
        }
        case "BOND": {
          let value = await db.find(db.OBond, { where: { id: item.relation_id } }, session).then(data => formatter(data.dataValues, db.OBond));
          if (value && value.payment_status === "PAID"){
            let customer = await db.find(db.Customer, { where: {
              o_c_customercode: value.o_c_customercode,
              o_c_bank_code   : value.o_c_bank_code,
              o_c_registerno  : value.o_c_registerno,
            } }, session);
            if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
            let mrtnos = await db.findAll(db.Mrtno, { where: { relation_id: value.id } }, session);
            let mortgage;
            if (mrtnos.length > 0){
              mortgage = await db.findAll(db.OCMortgage, { where: {
                o_c_customercode: value.o_c_customercode,
                o_c_bank_code   : value.o_c_bank_code,
                o_c_registerno  : value.o_c_registerno,
                o_c_mrtno       : mrtnos.map(item => item.mrtno) } }, session);
            }
            PAID_BONDS.push({
              ...value,
              // o_bond_starteddate: moment(value.o_bond_starteddate).format("YYYY-MM-DD"),
              // o_bond_expdate    : moment(value.o_bond_expdate).format("YYYY-MM-DD"),
              customer,
              mortgage
            });
          } else if (value){
            let customer = await db.find(db.Customer, { where: {
              o_c_customercode: value.o_c_customercode,
              o_c_bank_code   : value.o_c_bank_code,
              o_c_registerno  : value.o_c_registerno,
            } }, session);
            if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
            let mrtnos = await db.findAll(db.Mrtno, { where: { relation_id: value.id } }, session);
            let mortgage;
            if (mrtnos.length > 0){
              mortgage = await db.findAll(db.OCMortgage, { where: {
                o_c_customercode: value.o_c_customercode,
                o_c_bank_code   : value.o_c_bank_code,
                o_c_registerno  : value.o_c_registerno,
                o_c_mrtno       : mrtnos.map(item => item.mrtno) } }, session);
            }
            UNPAID_BONDS.push({
              ...value,
              // o_bond_starteddate: moment(value.o_bond_starteddate).format("YYYY-MM-DD"),
              // o_bond_expdate    : moment(value.o_bond_expdate).format("YYYY-MM-DD"),
              customer,
              mortgage
            });
          }
          break;
        }
        case "GUARANTEE": {
          let value = await db.find(db.OCGuarantee, { where: { id: item.relation_id } }, session).then(data => formatter(data.dataValues, db.OCGuarantee));
          if (value){
            let customer = await db.find(db.Customer, { where: {
              o_c_customercode: value.o_c_customercode,
              o_c_bank_code   : value.o_c_bank_code,
              o_c_registerno  : value.o_c_registerno,
            } }, session);
            if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
            let mrtnos = await db.findAll(db.Mrtno, { where: { relation_id: value.id } }, session);
            let mortgage;
            if (mrtnos.length > 0){
              mortgage = await db.findAll(db.OCMortgage, { where: {
                o_c_customercode: value.o_c_customercode,
                o_c_bank_code   : value.o_c_bank_code,
                o_c_registerno  : value.o_c_registerno,
                o_c_mrtno       : mrtnos.map(item => item.mrtno) } }, session);
            }
            GUARANTEES.push({
              ...value,
              // o_c_guarantee_loanclasscode: APPENDIX.APPENDIX_EO[item?.o_c_guarantee_loanclasscode],
              customer,
              mortgage
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