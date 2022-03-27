import { method } from "@goodtechsoft/micro-service";
import Joi from "joi";
import { db, Sequelize } from "@goodtechsoft/sequelize-postgres";
import { NotfoundError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS } from "../../constants";
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
      console.log(JSON.stringify(response.data));
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


const schema = Joi.object({
  register_no: Joi.string().max(12).required(),
});
// USD|RUB|CNY|DEM|GBP|JPY|CHF|ATS|CAD|FRF|HKD|EUR|ITL|KRW|THB|KZT|BGL|KPW|AUD|DKK|SEK|BEF|FIM|INR|TWD|LAK|VND|HUF|SGD|TRL|EGP|CZK|IDR|MYR|KWD
export default method.post("/report", schema, async (req, res, session) => {
  const {
    register_no,
  } = req.body;
  let TOTAL_COUNT = { NORMAL: 0, OVERDUE: 0, ABNORMAL: 0, UNCERTAIN: 0, BAD: 0, };
  let TOTAL_VALUE = { NORMAL: 0, OVERDUE: 0, ABNORMAL: 0, UNCERTAIN: 0, BAD: 0, };
  let NORMAL = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0 };
  let OVERDUE = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0 };
  let ABNORMAL = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0 };
  let UNCERTAIN = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0 };
  let BAD = { MNT: 0, USD: 0, EUR: 0, CNY: 0, JPY: 0, RUB: 0 };
  let CURRENCIES = await getCurrencies({ currencyCode: "USD|CNY|EUR|JPY|RUB" });
  let where = {
    o_c_registerno: register_no
  };
  let customer = await db.find(db.Customer, {
    where: where
  });
  if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
  // let loansWithBalance = await db.findAll(db.OCLoanInformation, { where: { ...where, o_c_loan_balance: { [Op.gt]: 0 } } }, session);
  // let loansWithOutBalance = await db.findAll(db.OCLoanInformation, { where: { ...where, o_c_loan_balance: { [Op.eq]: 0 } } }, session);
  let loans = await db.findAll(db.OCLoanInformation, { where: where }, session);
  let leasings = await db.findAll(db.OCLeasing, { where: { ...where, } }, session);
  let onus = await db.findAll(db.OCOnusInformation, { where: where }, session);
  let receivables = await db.findAll(db.OCReceivable, { where: where }, session);
  let loanLines = await db.findAll(db.OCLoanline, { where: where }, session);
  let guarantee = await db.findAll(db.OCGuarantee, { where: where }, session);
  loans.forEach(item => {
    console.log("o_c_loan_loanclasscode:", item.o_c_loan_loanclasscode);
    switch (item.o_c_loan_loanclasscode) {
      case "01": {
        TOTAL_COUNT.NORMAL +=1;
        NORMAL[item.o_c_loan_currencycode] += item.o_c_loan_balance;
        break;
      }
      case "02": {
        TOTAL_COUNT.OVERDUE +=1;
        OVERDUE[item.o_c_loan_currencycode] += item.o_c_loan_balance;
        break;
      }
      case "03": {
        TOTAL_COUNT.ABNORMAL +=1;
        ABNORMAL[item.o_c_loan_currencycode] += item.o_c_loan_balance;
        break;
      }
      case "04": {
        TOTAL_COUNT.UNCERTAIN +=1;
        UNCERTAIN[item.o_c_loan_currencycode] += item.o_c_loan_balance;
        break;
      }
      case "05": {
        TOTAL_COUNT.BAD +=1;
        BAD[item.o_c_loan_currencycode] += item.o_c_loan_balance;
        break;
      }
      default: {
        break;
      }
    };
  });
  leasings.forEach(item => {
    console.log("o_c_leasing_loanclasscode:", item.o_c_leasing_loanclasscode);
    switch (item.o_c_leasing_loanclasscode) {
      case "01": {
        TOTAL_COUNT.NORMAL +=1;
        NORMAL[item.o_c_leasing_currencycode] += item.o_c_leasing_balance;
        break;
      }
      case "02": {
        TOTAL_COUNT.OVERDUE +=1;
        OVERDUE[item.o_c_leasing_currencycode] += item.o_c_leasing_balance;
        break;
      }
      case "03": {
        TOTAL_COUNT.ABNORMAL +=1;
        ABNORMAL[item.o_c_leasing_currencycode] += item.o_c_leasing_balance;
        break;
      }
      case "04": {
        TOTAL_COUNT.UNCERTAIN +=1;
        UNCERTAIN[item.o_c_leasing_currencycode] += item.o_c_leasing_balance;
        break;
      }
      case "05": {
        TOTAL_COUNT.BAD +=1;
        BAD[item.o_c_leasing_currencycode] += item.o_c_leasing_balance;
        break;
      }
      default: {
        break;
      }
    };
  });

  onus.forEach(item => {
    console.log("o_c_onus_loanclasscode:", item.o_c_onus_loanclasscode);
    switch (item.o_c_onus_loanclasscode) {
      case "01": {
        TOTAL_COUNT.NORMAL +=1;
        NORMAL[item.o_c_onus_currencycode] += item.o_c_onus_balance;
        break;
      }
      case "02": {
        TOTAL_COUNT.OVERDUE +=1;
        OVERDUE[item.o_c_onus_currencycode] += item.o_c_onus_balance;
        break;
      }
      case "03": {
        TOTAL_COUNT.ABNORMAL +=1;
        ABNORMAL[item.o_c_onus_currencycode] += item.o_c_onus_balance;
        break;
      }
      case "04": {
        TOTAL_COUNT.UNCERTAIN +=1;
        UNCERTAIN[item.o_c_onus_currencycode] += item.o_c_onus_balance;
        break;
      }
      case "05": {
        TOTAL_COUNT.BAD +=1;
        BAD[item.o_c_onus_currencycode] += item.o_c_onus_balance;
        break;
      }
      default: {
        break;
      }
    };
  });
  receivables.forEach(item => {
    console.log("o_c_receivable_loanclasscode:", item.o_c_receivable_loanclasscode);
    switch (item.o_c_receivable_loanclasscode) {
      case "01": {
        TOTAL_COUNT.NORMAL +=1;
        NORMAL[item.o_c_receivable_currencycode] += item.o_c_receivable_balance;
        break;
      }
      case "02": {
        TOTAL_COUNT.OVERDUE +=1;
        OVERDUE[item.o_c_receivable_currencycode] += item.o_c_receivable_balance;
        break;
      }
      case "03": {
        TOTAL_COUNT.ABNORMAL +=1;
        ABNORMAL[item.o_c_receivable_currencycode] += item.o_c_receivable_balance;
        break;
      }
      case "04": {
        TOTAL_COUNT.UNCERTAIN +=1;
        UNCERTAIN[item.o_c_receivable_currencycode] += item.o_c_receivable_balance;
        break;
      }
      case "05": {
        TOTAL_COUNT.BAD +=1;
        BAD[item.o_c_receivable_currencycode] += item.o_c_receivable_balance;
        break;
      }
      default: {
        break;
      }
    };
  });
  loanLines.forEach(item => {
    console.log("o_c_loanline_loanclasscode:", item.o_c_loanline_loanclasscode);
    switch (item.o_c_loanline_loanclasscode) {
      case "01": {
        TOTAL_COUNT.NORMAL +=1;
        NORMAL[item.o_c_loanline_currencycode] += item.o_c_loanline_balance;
        break;
      }
      case "02": {
        TOTAL_COUNT.OVERDUE +=1;
        OVERDUE[item.o_c_loanline_currencycode] += item.o_c_loanline_balance;
        break;
      }
      case "03": {
        TOTAL_COUNT.ABNORMAL +=1;
        ABNORMAL[item.o_c_loanline_currencycode] += item.o_c_loanline_balance;
        break;
      }
      case "04": {
        TOTAL_COUNT.UNCERTAIN +=1;
        UNCERTAIN[item.o_c_loanline_currencycode] += item.o_c_loanline_balance;
        break;
      }
      case "05": {
        TOTAL_COUNT.BAD +=1;
        BAD[item.o_c_loanline_currencycode] += item.o_c_loanline_balance;
        break;
      }
      default: {
        break;
      }
    };
  });
  loanLines.forEach(item => {
    console.log("o_c_loanline_loanclasscode:", item.o_c_loanline_loanclasscode);
    switch (item.o_c_loanline_loanclasscode) {
      case "01": {
        TOTAL_COUNT.NORMAL +=1;
        NORMAL[item.o_c_loanline_currencycode] += item.o_c_loanline_balance;
        break;
      }
      case "02": {
        TOTAL_COUNT.OVERDUE +=1;
        OVERDUE[item.o_c_loanline_currencycode] += item.o_c_loanline_balance;
        break;
      }
      case "03": {
        TOTAL_COUNT.ABNORMAL +=1;
        ABNORMAL[item.o_c_loanline_currencycode] += item.o_c_loanline_balance;
        break;
      }
      case "04": {
        TOTAL_COUNT.UNCERTAIN +=1;
        UNCERTAIN[item.o_c_loanline_currencycode] += item.o_c_loanline_balance;
        break;
      }
      case "05": {
        TOTAL_COUNT.BAD +=1;
        BAD[item.o_c_loanline_currencycode] += item.o_c_loanline_balance;
        break;
      }
      default: {
        break;
      }
    };
  });
  TOTAL_VALUE.NORMAL = (NORMAL.MNT) + (NORMAL.USD * CURRENCIES.USD) + (NORMAL.EUR * CURRENCIES.EUR) + (NORMAL.CNY * CURRENCIES.CNY) + (NORMAL.JPY * CURRENCIES.JPY) + (NORMAL.RUB * CURRENCIES.RUB);
  TOTAL_VALUE.OVERDUE = (OVERDUE.MNT) + (OVERDUE.USD * CURRENCIES.USD) + (OVERDUE.EUR * CURRENCIES.EUR)+ (OVERDUE.CNY * CURRENCIES.CNY)+ (OVERDUE.JPY * CURRENCIES.JPY)+ (OVERDUE.RUB * CURRENCIES.RUB) ;
  TOTAL_VALUE.ABNORMAL = (ABNORMAL.MNT) + (ABNORMAL.USD * CURRENCIES.USD) + (ABNORMAL.EUR * CURRENCIES.EUR)+ (ABNORMAL.CNY * CURRENCIES.CNY)+ (ABNORMAL.JPY * CURRENCIES.JPY)+ (ABNORMAL.RUB * CURRENCIES.RUB);
  TOTAL_VALUE.UNCERTAIN = (UNCERTAIN.MNT) + (UNCERTAIN.USD * CURRENCIES.USD) + (UNCERTAIN.EUR * CURRENCIES.EUR)+ (UNCERTAIN.CNY * CURRENCIES.CNY)+ (UNCERTAIN.JPY * CURRENCIES.JPY)+ (UNCERTAIN.RUB * CURRENCIES.RUB);
  TOTAL_VALUE.BAD = parseFloat(BAD.MNT) + parseFloat(BAD.USD * CURRENCIES.USD) + parseFloat(BAD.EUR * CURRENCIES.EUR)+ (BAD.CNY * CURRENCIES.CNY)+ parseFloat(BAD.JPY * CURRENCIES.JPY)+ (BAD.RUB * CURRENCIES.RUB);
  NORMAL = { MNT: parseFloat(NORMAL.MNT), USD: parseFloat(NORMAL.USD), EUR: parseFloat(NORMAL.EUR), CNY: parseFloat(NORMAL.CNY), JPY: parseFloat(NORMAL.JPY), RUB: parseFloat(NORMAL.RUB) };
  OVERDUE = { MNT: parseFloat(OVERDUE.MNT), USD: parseFloat(OVERDUE.USD), EUR: parseFloat(OVERDUE.EUR), CNY: parseFloat(OVERDUE.CNY), JPY: parseFloat(OVERDUE.JPY), RUB: parseFloat(OVERDUE.RUB) };
  ABNORMAL = { MNT: parseFloat(ABNORMAL.MNT), USD: parseFloat(ABNORMAL.USD), EUR: parseFloat(ABNORMAL.EUR), CNY: parseFloat(ABNORMAL.CNY), JPY: parseFloat(ABNORMAL.JPY), RUB: parseFloat(ABNORMAL.RUB) };
  UNCERTAIN = { MNT: parseFloat(UNCERTAIN.MNT), USD: parseFloat(UNCERTAIN.USD), EUR: parseFloat(UNCERTAIN.EUR), CNY: parseFloat(UNCERTAIN.CNY), JPY: parseFloat(UNCERTAIN.JPY), RUB: parseFloat(UNCERTAIN.RUB) };
  BAD = { MNT: parseFloat(BAD.MNT), USD: parseFloat(BAD.USD), EUR: parseFloat(BAD.EUR), CNY: parseFloat(BAD.CNY), JPY: parseFloat(BAD.JPY), RUB: parseFloat(BAD.RUB) };
  TOTAL_VALUE = { NORMAL: parseFloat(TOTAL_VALUE.NORMAL).toFixed(2), OVERDUE: parseFloat(TOTAL_VALUE.OVERDUE).toFixed(2), ABNORMAL: parseFloat(TOTAL_VALUE.ABNORMAL).toFixed(2), UNCERTAIN: parseFloat(TOTAL_VALUE.UNCERTAIN).toFixed(2), BAD: parseFloat(TOTAL_VALUE.BAD).toFixed(2), };
  console.log(NORMAL);
  console.log(TOTAL_VALUE);


  res.json({
    customer,
    loans,
    TOTAL_COUNT,
    TOTAL_VALUE,
    NORMAL,
    OVERDUE,
    ABNORMAL,
    UNCERTAIN,
    BAD,
  });
});