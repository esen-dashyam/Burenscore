import { NotfoundError } from "@goodtechsoft/micro-service/lib/errors";
import { db, Sequelize } from "@goodtechsoft/sequelize-postgres";
import { ERRORS, APPENDIX, FORMATTABLE_VARIABLES } from "../../../constants";
import moment from "moment";
import axios from "axios";

const { Op } = Sequelize;

const getCurrencies = async ({ currencyCode }) => {
  let config = {
    method : "get",
    url    : `http://monxansh.appspot.com/xansh.json?currency=${currencyCode}`,
    headers: { }
  };
  let result = await axios(config)
    .then(function (response) {
      let data = response.data.reduce((acc, iter)=> {
        return {
          ...acc,
          [iter.code]: iter.rate_float
        };
      }, {});
      return data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return result;
};

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
          [key]: value[key]
        };
      }
      if (key === "o_c_bank_code"){
        return {
          ...acc,
          [key]: APPENDIX.BANK_CODES[value[key]] || value[key],
        };
      }
      if (FORMATTABLE_VARIABLES[key]){
        return {
          ...acc,
          [key]: APPENDIX[FORMATTABLE_VARIABLES[key]][value[key]] || value[key],
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
  let TOTAL_COUNT = { NORMAL: 0, OVERDUE: 0, ABNORMAL: 0, UNCERTAIN: 0, BAD: 0, };
  let TOTAL_VALUE = { NORMAL: 0, OVERDUE: 0, ABNORMAL: 0, UNCERTAIN: 0, BAD: 0, };
  let TOTAL_NORMAL = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0, OTHER: 0 };
  let TOTAL_OVERDUE = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0, OTHER: 0 };
  let TOTAL_ABNORMAL = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0, OTHER: 0 };
  let TOTAL_UNCERTAIN = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0, OTHER: 0 };
  let TOTAL_BAD = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0, OTHER: 0 };
  let PAID_COUNT = { NORMAL: 0, OVERDUE: 0, ABNORMAL: 0, UNCERTAIN: 0, BAD: 0, };
  let UNPAID_COUNT = { NORMAL: 0, OVERDUE: 0, ABNORMAL: 0, UNCERTAIN: 0, BAD: 0, };
  let UNPAID_VALUE = { NORMAL: 0, OVERDUE: 0, ABNORMAL: 0, UNCERTAIN: 0, BAD: 0, };
  let UNPAID_NORMAL = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0, OTHER: 0 };
  let UNPAID_OVERDUE = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0, OTHER: 0 };
  let UNPAID_ABNORMAL = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0, OTHER: 0 };
  let UNPAID_UNCERTAIN = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0, OTHER: 0 };
  let UNPAID_BAD = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0, OTHER: 0 };
  let RISK_COUNT = { NORMAL: 0, OVERDUE: 0, ABNORMAL: 0, UNCERTAIN: 0, BAD: 0, };
  let RISK_VALUE = { NORMAL: 0, OVERDUE: 0, ABNORMAL: 0, UNCERTAIN: 0, BAD: 0, };
  let RISK_NORMAL = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0, OTHER: 0 };
  let RISK_OVERDUE = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0, OTHER: 0 };
  let RISK_ABNORMAL = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0, OTHER: 0 };
  let RISK_UNCERTAIN = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0, OTHER: 0 };
  let RISK_BAD = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0, OTHER: 0 };
  let PAID_LOANS = [];
  let PAID_BONDS = [];
  let PAID_LEASINGS = [];
  let PAID_ONUS = [];
  let PAID_RECEIVABLS = [];
  let PAID_LOANLINES = [];
  let UNPAID_LOANS = [];
  let UNPAID_LEASINGS = [];
  let UNPAID_ONUS = [];
  let UNPAID_RECEIVABLS = [];
  let UNPAID_LOANLINES = [];
  let UNPAID_BONDS = [];
  let CURRENCIES = {};
  let currencyFromdb = await db.find(db.Currency, {
    where: {
      date: { [Op.gte]: moment().startOf("day") },
    },
    order: [["created_at", "desc"]]
  }, session);
  if (currencyFromdb){
    let temp = currencyFromdb.values;
    CURRENCIES = JSON.parse(temp);
  } else {
    CURRENCIES = await getCurrencies({ currencyCode: "USD|RUB|CNY|DEM|GBP|JPY|CHF|ATS|CAD|FRF|HKD|EUR|ITL|KRW|THB|KZT|BGL|KPW|AUD|DKK|SEK|BEF|FIM|INR|TWD|LAK|VND|HUF|SGD|TRL|EGP|CZK|IDR|MYR|KWD" });
    await db.create(db.Currency, { date: new Date(), values: JSON.stringify(CURRENCIES) }, session);
  }
  let where = {
    o_c_registerno: register_no
  };
  let customer = await db.find(db.Customer, {
    where: where
  }, session);
  if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
  customer = formatter(customer.dataValues, db.Customer);
  let transactions = (await db.findAll(db.Transaction, { where: { ...where, type: "PERFORMANCE" }, sort: [["datetopay", "ASC"]] }, session)).reduce((acc, iter) => {
    return {
      ...acc,
      [iter.relation_id]: moment(iter.datetopay).tz("Asia/Ulaanbaatar").format("YYYY-MM-DD")
    };
  }, {});
  console.log("=====>", transactions);
  let loans = await db.findAll(db.OCLoanInformation, { where: where }, session).then(data => data.map(entry => formatter(entry.dataValues, db.OCLoanInformation)));
  let loanmrtno = await db.findAll(db.Mrtno, { where: where }, session);
  let loanmrt = (await db.findAll(db.OCMortgage, { where: { ...where, o_c_mrtno: loanmrtno.map(item => item.mrtno) } }, session)).map(mrt => ({ ...formatter(mrt.dataValues, db.OCMortgage), relation_id: loanmrtno.find(no => no.mrtno === mrt.o_c_mrtno)?.relation_id }));
  let leasings = await db.findAll(db.OCLeasing, { where: { ...where, } }, session).then(data => data.map(entry => formatter(entry.dataValues, db.OCLeasing)));
  let onus = await db.findAll(db.OCOnusInformation, { where: where }, session).then(data => data.map(entry => formatter(entry.dataValues, db.OCOnusInformation)));
  let receivables = await db.findAll(db.OCReceivable, { where: where }, session).then(data => data.map(entry => formatter(entry.dataValues, db.OCReceivable)));
  let loanLines = await db.findAll(db.OCLoanline, { where: where }, session).then(data => data.map(entry => formatter(entry.dataValues, db.OCLoanline)));
  let guarantee = await db.findAll(db.OCGuarantee, { where: where }, session).then(data => data.map(entry => formatter(entry.dataValues, db.OCGuarantee)));
  let bonds = await db.findAll(db.OBond, { where: where, }, session).then(data => data.map(entry => formatter(entry.dataValues, db.OBond)));
  let accredits = await db.findAll(db.OCAccredit, { where: where }, session).then(data => data.map(entry => formatter(entry.dataValues, db.OCAccredit)));
  loans.forEach(item => {
    if (item.payment_status === "PAID"){
      PAID_LOANS.push({
        ...item,
        o_c_loan_loanclasscode: APPENDIX.APPENDIX_EO[item.o_c_loan_loanclasscode],
        mortgage              : loanmrt.filter(mrt => mrt.relation_id === item.id),
        paid_date             : transactions[item.id] ? transactions[item.id] : item.updated_at
      });
    } else {
      UNPAID_LOANS.push({
        ...item,
        o_c_loan_loanclasscode: APPENDIX.APPENDIX_EO[item.o_c_loan_loanclasscode],
        mortgage              : loanmrt.filter(mrt => mrt.relation_id === item.id)
      });
    }
    switch (item.o_c_loan_loanclasscode) {
      case "01": {
        TOTAL_COUNT.NORMAL +=1;
        TOTAL_NORMAL[item.o_c_loan_currencycode] += item.o_c_loan_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.NORMAL +=1;
        } else {
          UNPAID_COUNT.NORMAL +=1;
          UNPAID_NORMAL[item.o_c_loan_currencycode] =+ item.o_c_loan_balance;
        }
        break;
      }
      case "02": {
        TOTAL_COUNT.OVERDUE +=1;
        TOTAL_OVERDUE[item.o_c_loan_currencycode] += item.o_c_loan_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.OVERDUE +=1;
        } else {
          UNPAID_COUNT.OVERDUE +=1;
          UNPAID_OVERDUE[item.o_c_loan_currencycode] =+ item.o_c_loan_balance;
        }
        break;
      }
      case "03": {
        TOTAL_COUNT.ABNORMAL +=1;
        TOTAL_ABNORMAL[item.o_c_loan_currencycode] += item.o_c_loan_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.ABNORMAL +=1;
        } else {
          UNPAID_COUNT.ABNORMAL +=1;
          UNPAID_ABNORMAL[item.o_c_loan_currencycode] =+ item.o_c_loan_balance;
        }
        break;
      }
      case "04": {
        TOTAL_COUNT.UNCERTAIN +=1;
        TOTAL_UNCERTAIN[item.o_c_loan_currencycode] += item.o_c_loan_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.UNCERTAIN +=1;
        } else {
          UNPAID_COUNT.UNCERTAIN +=1;
          UNPAID_UNCERTAIN[item.o_c_loan_currencycode] =+ item.o_c_loan_balance;
        }
        break;
      }
      case "05": {
        TOTAL_COUNT.BAD +=1;
        TOTAL_BAD[item.o_c_loan_currencycode] += item.o_c_loan_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.BAD +=1;
        } else {
          UNPAID_COUNT.BAD +=1;
          UNPAID_BAD[item.o_c_loan_currencycode] =+ item.o_c_loan_balance;
        }
        break;
      }
      default: {
        break;
      }
    };
  });
  leasings.forEach(item => {
    if (item.payment_status === "PAID"){
      PAID_LEASINGS.push({
        ...item,
        o_c_leasing_loanclasscode: APPENDIX.APPENDIX_EO[item.o_c_leasing_loanclasscode],
        mortgage                 : loanmrt.filter(mrt => mrt.relation_id === item.id),
        paid_date                : transactions[item.id] ? transactions[item.id] : item.updated_at
      });
    } else {
      UNPAID_LEASINGS.push({
        ...item,
        o_c_leasing_loanclasscode: APPENDIX.APPENDIX_EO[item.o_c_leasing_loanclasscode],
        mortgage                 : loanmrt.filter(mrt => mrt.relation_id === item.id)
      });
    }
    switch (item.o_c_leasing_loanclasscode) {
      case "01": {
        TOTAL_COUNT.NORMAL +=1;
        TOTAL_NORMAL[item.o_c_leasing_currencycode] += item.o_c_leasing_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.NORMAL +=1;
        } else {
          UNPAID_COUNT.NORMAL +=1;
          UNPAID_NORMAL[item.o_c_leasing_currencycode] =+ item.o_c_leasing_balance;
        }
        break;
      }
      case "02": {
        TOTAL_COUNT.OVERDUE +=1;
        TOTAL_OVERDUE[item.o_c_leasing_currencycode] += item.o_c_leasing_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.OVERDUE +=1;
        } else {
          UNPAID_COUNT.OVERDUE +=1;
          UNPAID_OVERDUE[item.o_c_leasing_currencycode] =+ item.o_c_leasing_balance;
        }
        break;
      }
      case "03": {
        TOTAL_COUNT.ABNORMAL +=1;
        TOTAL_ABNORMAL[item.o_c_leasing_currencycode] += item.o_c_leasing_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.ABNORMAL +=1;
        } else {
          UNPAID_COUNT.ABNORMAL +=1;
          UNPAID_ABNORMAL[item.o_c_leasing_currencycode] =+ item.o_c_leasing_balance;
        }
        break;
      }
      case "04": {
        TOTAL_COUNT.UNCERTAIN +=1;
        TOTAL_UNCERTAIN[item.o_c_leasing_currencycode] += item.o_c_leasing_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.UNCERTAIN +=1;
        } else {
          UNPAID_COUNT.UNCERTAIN +=1;
          UNPAID_UNCERTAIN[item.o_c_leasing_currencycode] =+ item.o_c_leasing_balance;
        }
        break;
      }
      case "05": {
        TOTAL_COUNT.BAD +=1;
        TOTAL_BAD[item.o_c_leasing_currencycode] += item.o_c_leasing_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.BAD +=1;
        } else {
          UNPAID_COUNT.BAD +=1;
          UNPAID_BAD[item.o_c_leasing_currencycode] =+ item.o_c_leasing_balance;
        }
        break;
      }
      default: {
        break;
      }
    };
  });

  onus.forEach(item => {
    if (item.payment_status === "PAID"){
      PAID_ONUS.push({
        ...item,
        o_c_onus_loanclasscode: APPENDIX.APPENDIX_EO[item.o_c_onus_loanclasscode],
        mortgage              : loanmrt.filter(mrt => mrt.relation_id === item.id),
        paid_date             : transactions[item.id] ? transactions[item.id] : item.updated_at
      });
    } else {
      UNPAID_ONUS.push({
        ...item,
        o_c_onus_loanclasscode: APPENDIX.APPENDIX_EO[item.o_c_onus_loanclasscode],
        mortgage              : loanmrt.filter(mrt => mrt.relation_id === item.id)
      });
    }
    switch (item.o_c_onus_loanclasscode) {
      case "01": {
        TOTAL_COUNT.NORMAL +=1;
        TOTAL_NORMAL[item.o_c_onus_currencycode] += item.o_c_onus_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.NORMAL +=1;
        } else {
          UNPAID_COUNT.NORMAL +=1;
          UNPAID_NORMAL[item.o_c_onus_currencycode] =+ item.o_c_onus_balance;
        }
        break;
      }
      case "02": {
        TOTAL_COUNT.OVERDUE +=1;
        TOTAL_OVERDUE[item.o_c_onus_currencycode] += item.o_c_onus_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.OVERDUE +=1;
        } else {
          UNPAID_COUNT.OVERDUE +=1;
          UNPAID_OVERDUE[item.o_c_onus_currencycode] =+ item.o_c_onus_balance;
        }
        break;
      }
      case "03": {
        TOTAL_COUNT.ABNORMAL +=1;
        TOTAL_ABNORMAL[item.o_c_onus_currencycode] += item.o_c_onus_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.ABNORMAL +=1;
        } else {
          UNPAID_COUNT.ABNORMAL +=1;
          UNPAID_ABNORMAL[item.o_c_onus_currencycode] =+ item.o_c_onus_balance;
        }
        break;
      }
      case "04": {
        TOTAL_COUNT.UNCERTAIN +=1;
        TOTAL_UNCERTAIN[item.o_c_onus_currencycode] += item.o_c_onus_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.UNCERTAIN +=1;
        } else {
          UNPAID_COUNT.UNCERTAIN +=1;
          UNPAID_UNCERTAIN[item.o_c_onus_currencycode] =+ item.o_c_onus_balance;
        }
        break;
      }
      case "05": {
        TOTAL_COUNT.BAD +=1;
        TOTAL_BAD[item.o_c_onus_currencycode] += item.o_c_onus_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.BAD +=1;
        } else {
          UNPAID_COUNT.BAD +=1;
          UNPAID_BAD[item.o_c_onus_currencycode] =+ item.o_c_onus_balance;
        }
        break;
      }
      default: {
        break;
      }
    };
  });
  receivables.forEach(item => {
    if (item.payment_status === "PAID"){
      PAID_RECEIVABLS.push({
        ...item,
        o_c_receivable_loanclasscode: APPENDIX.APPENDIX_EO[item.o_c_receivable_loanclasscode],
        paid_date                   : transactions[item.id] ? transactions[item.id] : item.updated_at
      });
    } else {
      UNPAID_RECEIVABLS.push({
        ...item,
        o_c_receivable_loanclasscode: APPENDIX.APPENDIX_EO[item.o_c_receivable_loanclasscode]
      });
    }
    switch (item.o_c_receivable_loanclasscode) {
      case "01": {
        TOTAL_COUNT.NORMAL +=1;
        TOTAL_NORMAL[item.o_c_receivable_currencycode] += item.o_c_receivable_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.NORMAL +=1;
        } else {
          UNPAID_COUNT.NORMAL +=1;
          UNPAID_NORMAL[item.o_c_receivable_currencycode] =+ item.o_c_receivable_balance;
        }
        break;
      }
      case "02": {
        TOTAL_COUNT.OVERDUE +=1;
        TOTAL_OVERDUE[item.o_c_receivable_currencycode] += item.o_c_receivable_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.OVERDUE +=1;
        } else {
          UNPAID_COUNT.OVERDUE +=1;
          UNPAID_OVERDUE[item.o_c_receivable_currencycode] =+ item.o_c_receivable_balance;
        }
        break;
      }
      case "03": {
        TOTAL_COUNT.ABNORMAL +=1;
        TOTAL_ABNORMAL[item.o_c_receivable_currencycode] += item.o_c_receivable_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.ABNORMAL +=1;
        } else {
          UNPAID_COUNT.ABNORMAL +=1;
          UNPAID_ABNORMAL[item.o_c_receivable_currencycode] =+ item.o_c_receivable_balance;
        }
        break;
      }
      case "04": {
        TOTAL_COUNT.UNCERTAIN +=1;
        TOTAL_UNCERTAIN[item.o_c_receivable_currencycode] += item.o_c_receivable_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.UNCERTAIN +=1;
        } else {
          UNPAID_COUNT.UNCERTAIN +=1;
          UNPAID_UNCERTAIN[item.o_c_receivable_currencycode] =+ item.o_c_receivable_balance;
        }
        break;
      }
      case "05": {
        TOTAL_COUNT.BAD +=1;
        TOTAL_BAD[item.o_c_receivable_currencycode] += item.o_c_receivable_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.BAD +=1;
        } else {
          UNPAID_COUNT.BAD +=1;
          UNPAID_BAD[item.o_c_receivable_currencycode] =+ item.o_c_receivable_balance;
        }
        break;
      }
      default: {
        break;
      }
    };
  });
  loanLines.forEach(item => {
    if (item.payment_status === "PAID"){
      PAID_LOANLINES.push({
        ...item,
        o_c_loanline_loanclasscode: APPENDIX.APPENDIX_EO[item.o_c_loanline_loanclasscode]
      });
    } else {
      UNPAID_LOANLINES.push({
        ...item,
        o_c_loanline_loanclasscode: APPENDIX.APPENDIX_EO[item.o_c_loanline_loanclasscode]
      });
    }
    switch (item.o_c_loanline_loanclasscode) {
      case "01": {
        TOTAL_COUNT.NORMAL +=1;
        TOTAL_NORMAL[item.o_c_loanline_currencycode] += item.o_c_loanline_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.NORMAL +=1;
        } else {
          UNPAID_COUNT.NORMAL +=1;
          UNPAID_NORMAL[item.o_c_loanline_currencycode] =+ item.o_c_loanline_balance;
        }
        break;
      }
      case "02": {
        TOTAL_COUNT.OVERDUE +=1;
        TOTAL_OVERDUE[item.o_c_loanline_currencycode] += item.o_c_loanline_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.OVERDUE +=1;
        } else {
          UNPAID_COUNT.OVERDUE +=1;
          UNPAID_OVERDUE[item.o_c_loanline_currencycode] =+ item.o_c_loanline_balance;
        }
        break;
      }
      case "03": {
        TOTAL_COUNT.ABNORMAL +=1;
        TOTAL_ABNORMAL[item.o_c_loanline_currencycode] += item.o_c_loanline_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.ABNORMAL +=1;
        } else {
          UNPAID_COUNT.ABNORMAL +=1;
          UNPAID_ABNORMAL[item.o_c_loanline_currencycode] =+ item.o_c_loanline_balance;
        }
        break;
      }
      case "04": {
        TOTAL_COUNT.UNCERTAIN +=1;
        TOTAL_UNCERTAIN[item.o_c_loanline_currencycode] += item.o_c_loanline_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.UNCERTAIN +=1;
        } else {
          UNPAID_COUNT.UNCERTAIN +=1;
          UNPAID_UNCERTAIN[item.o_c_loanline_currencycode] =+ item.o_c_loanline_balance;
        }
        break;
      }
      case "05": {
        TOTAL_COUNT.BAD +=1;
        TOTAL_BAD[item.o_c_loanline_currencycode] += item.o_c_loanline_balance;
        if (item.payment_status === "PAID"){
          PAID_COUNT.BAD +=1;
        } else {
          UNPAID_COUNT.BAD +=1;
          UNPAID_BAD[item.o_c_loanline_currencycode] =+ item.o_c_loanline_balance;
        }
        break;
      }
      default: {
        break;
      }
    };
  });

  bonds.forEach(item => {
    TOTAL_COUNT.NORMAL +=1;
    TOTAL_NORMAL[item.o_bond_currencycode] += item.o_bond_balance;
    if (item.payment_status === "PAID"){
      PAID_BONDS.push({
        ...item,
        mortgage: loanmrt.filter(mrt => mrt.relation_id === item.id)
      });
      PAID_COUNT.NORMAL +=1;
    } else {
      UNPAID_BONDS.push({
        ...item,
        mortgage: loanmrt.filter(mrt => mrt.relation_id === item.id)
      });
      UNPAID_COUNT.NORMAL +=1;
      UNPAID_NORMAL[item.o_c_loanline_currencycode] =+ item.o_c_loanline_balance;
    }
  });

  accredits.forEach(item => {
    RISK_COUNT.NORMAL +=1;
    RISK_NORMAL[item.o_bond_currencycode] += item.o_bond_balance;
    if (item.payment_status === "PAID"){
      PAID_COUNT.NORMAL +=1;
    } else {
      UNPAID_COUNT.NORMAL +=1;
      UNPAID_NORMAL[item.o_c_loanline_currencycode] =+ item.o_c_loanline_balance;
    }
  });

  guarantee.forEach(item => {
    switch (item.o_c_guarantee_loanclasscode) {
      case "01": {
        RISK_COUNT.NORMAL +=1;
        RISK_NORMAL[item.o_c_guarantee_currencycode] += item.o_c_guarantee_balance;
        break;
      }
      case "02": {
        RISK_COUNT.OVERDUE +=1;
        RISK_OVERDUE[item.o_c_guarantee_currencycode] += item.o_c_guarantee_balance;
        break;
      }
      case "03": {
        RISK_COUNT.ABNORMAL +=1;
        RISK_ABNORMAL[item.o_c_guarantee_currencycode] += item.o_c_guarantee_balance;
        break;
      }
      case "04": {
        RISK_COUNT.UNCERTAIN +=1;
        RISK_UNCERTAIN[item.o_c_guarantee_currencycode] += item.o_c_guarantee_balance;
        break;
      }
      case "05": {
        RISK_COUNT.BAD +=1;
        RISK_BAD[item.o_c_guarantee_currencycode] += item.o_c_guarantee_balance;
        break;
      }
      default: {
        break;
      }
    };
  });
  TOTAL_VALUE.NORMAL = (TOTAL_NORMAL.MNT) + (TOTAL_NORMAL.USD * CURRENCIES.USD) + (TOTAL_NORMAL.EUR * CURRENCIES.EUR) + (TOTAL_NORMAL.CNY * CURRENCIES.CNY) + (TOTAL_NORMAL.JPY * CURRENCIES.JPY) + (TOTAL_NORMAL.RUB * CURRENCIES.RUB);
  TOTAL_VALUE.OVERDUE = (TOTAL_OVERDUE.MNT) + (TOTAL_OVERDUE.USD * CURRENCIES.USD) + (TOTAL_OVERDUE.EUR * CURRENCIES.EUR)+ (TOTAL_OVERDUE.CNY * CURRENCIES.CNY)+ (TOTAL_OVERDUE.JPY * CURRENCIES.JPY)+ (TOTAL_OVERDUE.RUB * CURRENCIES.RUB) ;
  TOTAL_VALUE.ABNORMAL = (TOTAL_ABNORMAL.MNT) + (TOTAL_ABNORMAL.USD * CURRENCIES.USD) + (TOTAL_ABNORMAL.EUR * CURRENCIES.EUR)+ (TOTAL_ABNORMAL.CNY * CURRENCIES.CNY)+ (TOTAL_ABNORMAL.JPY * CURRENCIES.JPY)+ (TOTAL_ABNORMAL.RUB * CURRENCIES.RUB);
  TOTAL_VALUE.UNCERTAIN = (TOTAL_UNCERTAIN.MNT) + (TOTAL_UNCERTAIN.USD * CURRENCIES.USD) + (TOTAL_UNCERTAIN.EUR * CURRENCIES.EUR)+ (TOTAL_UNCERTAIN.CNY * CURRENCIES.CNY)+ (TOTAL_UNCERTAIN.JPY * CURRENCIES.JPY)+ (TOTAL_UNCERTAIN.RUB * CURRENCIES.RUB);
  TOTAL_VALUE.BAD = parseFloat(TOTAL_BAD.MNT) + parseFloat(TOTAL_BAD.USD * CURRENCIES.USD) + parseFloat(TOTAL_BAD.EUR * CURRENCIES.EUR)+ (TOTAL_BAD.CNY * CURRENCIES.CNY)+ parseFloat(TOTAL_BAD.JPY * CURRENCIES.JPY)+ (TOTAL_BAD.RUB * CURRENCIES.RUB);
  TOTAL_NORMAL = { MNT: parseFloat(TOTAL_NORMAL.MNT), USD: parseFloat(TOTAL_NORMAL.USD), EUR: parseFloat(TOTAL_NORMAL.EUR), CNY: parseFloat(TOTAL_NORMAL.CNY), JPY: parseFloat(TOTAL_NORMAL.JPY), RUB: parseFloat(TOTAL_NORMAL.RUB) };
  TOTAL_OVERDUE = { MNT: parseFloat(TOTAL_OVERDUE.MNT), USD: parseFloat(TOTAL_OVERDUE.USD), EUR: parseFloat(TOTAL_OVERDUE.EUR), CNY: parseFloat(TOTAL_OVERDUE.CNY), JPY: parseFloat(TOTAL_OVERDUE.JPY), RUB: parseFloat(TOTAL_OVERDUE.RUB) };
  TOTAL_ABNORMAL = { MNT: parseFloat(TOTAL_ABNORMAL.MNT), USD: parseFloat(TOTAL_ABNORMAL.USD), EUR: parseFloat(TOTAL_ABNORMAL.EUR), CNY: parseFloat(TOTAL_ABNORMAL.CNY), JPY: parseFloat(TOTAL_ABNORMAL.JPY), RUB: parseFloat(TOTAL_ABNORMAL.RUB) };
  TOTAL_UNCERTAIN = { MNT: parseFloat(TOTAL_UNCERTAIN.MNT), USD: parseFloat(TOTAL_UNCERTAIN.USD), EUR: parseFloat(TOTAL_UNCERTAIN.EUR), CNY: parseFloat(TOTAL_UNCERTAIN.CNY), JPY: parseFloat(TOTAL_UNCERTAIN.JPY), RUB: parseFloat(TOTAL_UNCERTAIN.RUB) };
  TOTAL_BAD = { MNT: parseFloat(TOTAL_BAD.MNT), USD: parseFloat(TOTAL_BAD.USD), EUR: parseFloat(TOTAL_BAD.EUR), CNY: parseFloat(TOTAL_BAD.CNY), JPY: parseFloat(TOTAL_BAD.JPY), RUB: parseFloat(TOTAL_BAD.RUB) };
  TOTAL_VALUE = { NORMAL: parseFloat(TOTAL_VALUE.NORMAL).toFixed(2), OVERDUE: parseFloat(TOTAL_VALUE.OVERDUE).toFixed(2), ABNORMAL: parseFloat(TOTAL_VALUE.ABNORMAL).toFixed(2), UNCERTAIN: parseFloat(TOTAL_VALUE.UNCERTAIN).toFixed(2), BAD: parseFloat(TOTAL_VALUE.BAD).toFixed(2), };

  UNPAID_VALUE.NORMAL = (UNPAID_NORMAL.MNT) + (UNPAID_NORMAL.USD * CURRENCIES.USD) + (UNPAID_NORMAL.EUR * CURRENCIES.EUR) + (UNPAID_NORMAL.CNY * CURRENCIES.CNY) + (UNPAID_NORMAL.JPY * CURRENCIES.JPY) + (UNPAID_NORMAL.RUB * CURRENCIES.RUB);
  UNPAID_VALUE.OVERDUE = (UNPAID_OVERDUE.MNT) + (UNPAID_OVERDUE.USD * CURRENCIES.USD) + (UNPAID_OVERDUE.EUR * CURRENCIES.EUR)+ (UNPAID_OVERDUE.CNY * CURRENCIES.CNY)+ (UNPAID_OVERDUE.JPY * CURRENCIES.JPY)+ (UNPAID_OVERDUE.RUB * CURRENCIES.RUB) ;
  UNPAID_VALUE.ABNORMAL = (UNPAID_ABNORMAL.MNT) + (UNPAID_ABNORMAL.USD * CURRENCIES.USD) + (UNPAID_ABNORMAL.EUR * CURRENCIES.EUR)+ (UNPAID_ABNORMAL.CNY * CURRENCIES.CNY)+ (UNPAID_ABNORMAL.JPY * CURRENCIES.JPY)+ (UNPAID_ABNORMAL.RUB * CURRENCIES.RUB);
  UNPAID_VALUE.UNCERTAIN = (UNPAID_UNCERTAIN.MNT) + (UNPAID_UNCERTAIN.USD * CURRENCIES.USD) + (UNPAID_UNCERTAIN.EUR * CURRENCIES.EUR)+ (UNPAID_UNCERTAIN.CNY * CURRENCIES.CNY)+ (UNPAID_UNCERTAIN.JPY * CURRENCIES.JPY)+ (UNPAID_UNCERTAIN.RUB * CURRENCIES.RUB);
  UNPAID_VALUE.BAD = parseFloat(UNPAID_BAD.MNT) + parseFloat(UNPAID_BAD.USD * CURRENCIES.USD) + parseFloat(UNPAID_BAD.EUR * CURRENCIES.EUR)+ (UNPAID_BAD.CNY * CURRENCIES.CNY)+ parseFloat(UNPAID_BAD.JPY * CURRENCIES.JPY)+ (UNPAID_BAD.RUB * CURRENCIES.RUB);
  UNPAID_NORMAL = { MNT: parseFloat(UNPAID_NORMAL.MNT), USD: parseFloat(UNPAID_NORMAL.USD), EUR: parseFloat(UNPAID_NORMAL.EUR), CNY: parseFloat(UNPAID_NORMAL.CNY), JPY: parseFloat(UNPAID_NORMAL.JPY), RUB: parseFloat(UNPAID_NORMAL.RUB) };
  UNPAID_OVERDUE = { MNT: parseFloat(UNPAID_OVERDUE.MNT), USD: parseFloat(UNPAID_OVERDUE.USD), EUR: parseFloat(UNPAID_OVERDUE.EUR), CNY: parseFloat(UNPAID_OVERDUE.CNY), JPY: parseFloat(UNPAID_OVERDUE.JPY), RUB: parseFloat(UNPAID_OVERDUE.RUB) };
  UNPAID_ABNORMAL = { MNT: parseFloat(UNPAID_ABNORMAL.MNT), USD: parseFloat(UNPAID_ABNORMAL.USD), EUR: parseFloat(UNPAID_ABNORMAL.EUR), CNY: parseFloat(UNPAID_ABNORMAL.CNY), JPY: parseFloat(UNPAID_ABNORMAL.JPY), RUB: parseFloat(UNPAID_ABNORMAL.RUB) };
  UNPAID_UNCERTAIN = { MNT: parseFloat(UNPAID_UNCERTAIN.MNT), USD: parseFloat(UNPAID_UNCERTAIN.USD), EUR: parseFloat(UNPAID_UNCERTAIN.EUR), CNY: parseFloat(UNPAID_UNCERTAIN.CNY), JPY: parseFloat(UNPAID_UNCERTAIN.JPY), RUB: parseFloat(UNPAID_UNCERTAIN.RUB) };
  UNPAID_BAD = { MNT: parseFloat(UNPAID_BAD.MNT), USD: parseFloat(UNPAID_BAD.USD), EUR: parseFloat(UNPAID_BAD.EUR), CNY: parseFloat(UNPAID_BAD.CNY), JPY: parseFloat(UNPAID_BAD.JPY), RUB: parseFloat(UNPAID_BAD.RUB) };
  UNPAID_VALUE = { NORMAL: parseFloat(UNPAID_VALUE.NORMAL).toFixed(2), OVERDUE: parseFloat(UNPAID_VALUE.OVERDUE).toFixed(2), ABNORMAL: parseFloat(UNPAID_VALUE.ABNORMAL).toFixed(2), UNCERTAIN: parseFloat(UNPAID_VALUE.UNCERTAIN).toFixed(2), BAD: parseFloat(UNPAID_VALUE.BAD).toFixed(2), };

  RISK_VALUE.NORMAL = (RISK_NORMAL.MNT) + (RISK_NORMAL.USD * CURRENCIES.USD) + (RISK_NORMAL.EUR * CURRENCIES.EUR) + (RISK_NORMAL.CNY * CURRENCIES.CNY) + (RISK_NORMAL.JPY * CURRENCIES.JPY) + (RISK_NORMAL.RUB * CURRENCIES.RUB);
  RISK_VALUE.OVERDUE = (RISK_OVERDUE.MNT) + (RISK_OVERDUE.USD * CURRENCIES.USD) + (RISK_OVERDUE.EUR * CURRENCIES.EUR)+ (RISK_OVERDUE.CNY * CURRENCIES.CNY)+ (RISK_OVERDUE.JPY * CURRENCIES.JPY)+ (RISK_OVERDUE.RUB * CURRENCIES.RUB) ;
  RISK_VALUE.ABNORMAL = (RISK_ABNORMAL.MNT) + (RISK_ABNORMAL.USD * CURRENCIES.USD) + (RISK_ABNORMAL.EUR * CURRENCIES.EUR)+ (RISK_ABNORMAL.CNY * CURRENCIES.CNY)+ (RISK_ABNORMAL.JPY * CURRENCIES.JPY)+ (RISK_ABNORMAL.RUB * CURRENCIES.RUB);
  RISK_VALUE.UNCERTAIN = (RISK_UNCERTAIN.MNT) + (RISK_UNCERTAIN.USD * CURRENCIES.USD) + (RISK_UNCERTAIN.EUR * CURRENCIES.EUR)+ (RISK_UNCERTAIN.CNY * CURRENCIES.CNY)+ (RISK_UNCERTAIN.JPY * CURRENCIES.JPY)+ (RISK_UNCERTAIN.RUB * CURRENCIES.RUB);
  RISK_VALUE.BAD = parseFloat(RISK_BAD.MNT) + parseFloat(RISK_BAD.USD * CURRENCIES.USD) + parseFloat(RISK_BAD.EUR * CURRENCIES.EUR)+ (RISK_BAD.CNY * CURRENCIES.CNY)+ parseFloat(RISK_BAD.JPY * CURRENCIES.JPY)+ (RISK_BAD.RUB * CURRENCIES.RUB);
  RISK_NORMAL = { MNT: parseFloat(RISK_NORMAL.MNT), USD: parseFloat(RISK_NORMAL.USD), EUR: parseFloat(RISK_NORMAL.EUR), CNY: parseFloat(RISK_NORMAL.CNY), JPY: parseFloat(RISK_NORMAL.JPY), RUB: parseFloat(RISK_NORMAL.RUB) };
  RISK_OVERDUE = { MNT: parseFloat(RISK_OVERDUE.MNT), USD: parseFloat(RISK_OVERDUE.USD), EUR: parseFloat(RISK_OVERDUE.EUR), CNY: parseFloat(RISK_OVERDUE.CNY), JPY: parseFloat(RISK_OVERDUE.JPY), RUB: parseFloat(RISK_OVERDUE.RUB) };
  RISK_ABNORMAL = { MNT: parseFloat(RISK_ABNORMAL.MNT), USD: parseFloat(RISK_ABNORMAL.USD), EUR: parseFloat(RISK_ABNORMAL.EUR), CNY: parseFloat(RISK_ABNORMAL.CNY), JPY: parseFloat(RISK_ABNORMAL.JPY), RUB: parseFloat(RISK_ABNORMAL.RUB) };
  RISK_UNCERTAIN = { MNT: parseFloat(RISK_UNCERTAIN.MNT), USD: parseFloat(RISK_UNCERTAIN.USD), EUR: parseFloat(RISK_UNCERTAIN.EUR), CNY: parseFloat(RISK_UNCERTAIN.CNY), JPY: parseFloat(RISK_UNCERTAIN.JPY), RUB: parseFloat(RISK_UNCERTAIN.RUB) };
  RISK_BAD = { MNT: parseFloat(RISK_BAD.MNT), USD: parseFloat(RISK_BAD.USD), EUR: parseFloat(RISK_BAD.EUR), CNY: parseFloat(RISK_BAD.CNY), JPY: parseFloat(RISK_BAD.JPY), RUB: parseFloat(RISK_BAD.RUB) };
  RISK_VALUE = { NORMAL: parseFloat(RISK_VALUE.NORMAL).toFixed(2), OVERDUE: parseFloat(RISK_VALUE.OVERDUE).toFixed(2), ABNORMAL: parseFloat(RISK_VALUE.ABNORMAL).toFixed(2), UNCERTAIN: parseFloat(RISK_VALUE.UNCERTAIN).toFixed(2), BAD: parseFloat(RISK_VALUE.BAD).toFixed(2), };

  return {
    get_date  : moment(new Date).tz("Asia/Ulaanbaatar").format("YYYY-MM-DD HH:mm"),
    customer,
    PAID_LOANS,
    PAID_LEASINGS,
    PAID_ONUS,
    PAID_RECEIVABLS,
    PAID_LOANLINES,
    PAID_BONDS,
    UNPAID_LOANS,
    UNPAID_LEASINGS,
    UNPAID_ONUS,
    UNPAID_RECEIVABLS,
    UNPAID_LOANLINES,
    UNPAID_BONDS,
    GUARANTEES: guarantee.map(item => {
      return {
        ...formatter(item, db.OCGuarantee),
        o_c_guarantee_loanclasscode: APPENDIX.APPENDIX_EO[item.o_c_guarantee_loanclasscode],
        mortgage                   : loanmrt.filter(mrt => mrt.relation_id === item.id)
      };
    }),
    ACCREDITS: accredits.map(item => {
      return {
        ...formatter(item, db.OCAccredit),
        mortgage: loanmrt.filter(mrt => mrt.relation_id === item.id)
      };
    }),
    TOTAL_COUNT,
    TOTAL_VALUE,
    NORMAL   : TOTAL_NORMAL,
    OVERDUE  : TOTAL_OVERDUE,
    ABNORMAL : TOTAL_ABNORMAL,
    UNCERTAIN: TOTAL_UNCERTAIN,
    BAD      : TOTAL_BAD,
    UNPAID_VALUE,
    UNPAID_COUNT,
    UNPAID_NORMAL,
    UNPAID_OVERDUE,
    UNPAID_ABNORMAL,
    UNPAID_UNCERTAIN,
    UNPAID_BAD,
    PAID_COUNT,
    RISK_COUNT,
    RISK_VALUE,
    RISK_NORMAL,
    RISK_OVERDUE,
    RISK_ABNORMAL,
    RISK_UNCERTAIN,
    RISK_BAD
  };
};