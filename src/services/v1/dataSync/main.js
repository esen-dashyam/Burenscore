import { logic } from "@goodtechsoft/micro-service";
import { db } from "@goodtechsoft/sequelize-postgres";
import moment from "moment";
import { fall } from "../../../utils";
import { parseAccredit, parseBond, parseCustomer, parseFinancialInfo, parseGuarantee, parseLeasing, parseLoan, parseLoanLine, parseMortgage, parseOnus, parseReceivable, parseRelation, parseShareholder } from "./logics";

let model = {
  shareholderCustomer: db.OShareholdercustomer,
  shareholderOrg     : db.OShareholderorg,
  relationOrg        : db.OCRelationorg,
  relationCustomer   : db.OCRelationcustomer,
  mrtno              : db.Mrtno,
  relno              : db.Relno,
  transaction        : db.Transaction,
  mortgage           : db.OCMortgage,
  business           : db.CBusiness,
  family             : db.CFamily,
  capital            : db.CCapital,
  omReport           : db.OMReport,
  oReport            : db.OReport,
  otReport           : db.OTReport,
  loanInfo           : db.OCLoanInformation,
  leasingInfo        : db.OCLeasing,
  neoInfo            : db.NeoInfo,
  accreditInfo       : db.OCAccredit,
  guarantee          : db.OCGuarantee,
  loanLine           : db.OCLoanline,
  receivable         : db.OCReceivable,
  onus               : db.OCOnusInformation,
  bond               : db.OBond,
};
const insert = async (callback) => {
  try {
    await callback();
  } catch (err) {
    // console.log(err);
  }
};

const bulkUpdate = async ({ type, data, attribute, where, session }) => {
  // console.log("=============CHECKKEY===============");
  let oldData;
  let INSERT_DATA = [];
  try {
    if (attribute === "datetopay"){
      oldData = (await db.findAll(model[type], {
        where     : where,
        attributes: [attribute]
      }, session))?.map(item => moment(item[attribute]));
      // console.log("OLD_DATA_DATETOPAY:", oldData);
      data.forEach(item => {
        if (oldData.find(data => data === item.datetopay))
          INSERT_DATA.push(item);
      });
    } else {
      oldData = (await db.findAll(model[type], {
        where     : where,
        attributes: [attribute]
      }, session))?.map(item => item[attribute]);
      console.log("OLD_DATA:", oldData);
      data.forEach(item => {
        if (oldData.indexOf(item[attribute]) === -1)
          INSERT_DATA.push(item);
      });
    }
    // console.log("INSERT_DATA:", INSERT_DATA);
    if (INSERT_DATA.length > 0)
      await db.bulkCreate(model[type], INSERT_DATA, session);
  } catch (err){
    // console.log(err);
  }
};
const update = async ({ type, data, where, session }) => {
  try {
    let oldData = await db.find(model[type], {
      where: where
    }, session);
    let updatedData;
    // console.log("OLD_DATA_SINGLE", oldData);
    if (!oldData){
      updatedData = await db.create(model[type], data, session);
    } else {
      if (data.relation_id){
        delete data.relation_id;
      }
      updatedData = await db.update(oldData, { ...data, id: oldData.id }, session);
    }
    return updatedData;
  } catch (err){
    // console.log(err);
  }
};

export default logic(null, async (data, session) => {
  let customerInfo = data.o_c_customer_information;
  let shareholderCustomer = customerInfo?.o_shareholdercustomers?.o_shareholdercustomer;
  let shareholderOrg = customerInfo?.o_shareholderorgs?.o_shareholderorg;
  let relationOrg = customerInfo?.o_c_relationorgs?.o_c_relationorg;
  let relationCustomer =customerInfo?.o_c_relationcustomers?.o_c_relationcustomer;
  let financialInfo = data?.o_c_financial_information;
  let loanInfo = data?.o_c_onus_information?.o_c_loan_information;
  let leasingInfo = data?.o_c_onus_information?.o_c_leasing;
  let accreditInfo = data?.o_c_onus_information?.o_c_accredit;
  let guarenteeinfo = data?.o_c_onus_information?.o_c_guarantee;
  let loanLineinfo = data?.o_c_onus_information?.o_c_loanline;
  let receivableInfo =data?.o_c_onus_information?.o_c_receivable;
  let onusInfo = data?.o_c_onus_information?.o_c_onus;
  let bond = data?.o_c_onus_information?.o_bond;
  delete customerInfo?.$;
  delete relationCustomer?.$;
  delete guarenteeinfo?.$;
  delete onusInfo?.$;
  delete leasingInfo?.$;
  delete accreditInfo?.$;
  delete bond?.$;
  let mrtInfo = data?.o_c_mortgage_information?.o_c_mortgage; // array orj irne
  let where = {
    o_c_customercode: customerInfo?.o_c_customercode,
    o_c_bank_code   : customerInfo?.o_c_bankCode,
    o_c_registerno  : customerInfo?.o_c_registerno
  };
  let CUSTOMER = {};
  try {
    CUSTOMER.customerInfo = await parseCustomer(customerInfo);
    CUSTOMER.shareholderCustomer = await parseShareholder({ data: shareholderCustomer, where, type: "CUSTOMER" });
    CUSTOMER.shareholderOrg = await parseShareholder({ data: shareholderOrg, where, type: "ORG" });
    CUSTOMER.relationOrg = await parseRelation({ data: relationOrg, where, type: "ORG", session });
    CUSTOMER.relationCustomer = await parseRelation({ data: relationCustomer, where, type: "CUSTOMER", session });
    CUSTOMER.financialInfo = await parseFinancialInfo({ data: financialInfo, where });
    CUSTOMER.loanInfo = await parseLoan({ data: loanInfo, where });
    CUSTOMER.leasingInfo = await parseLeasing({ data: leasingInfo, where });
    CUSTOMER.accreditInfo = await parseAccredit({ data: accreditInfo, where });
    CUSTOMER.guarenteeInfo = await parseGuarantee({ data: guarenteeinfo, where });
    CUSTOMER.loanLineInfo = await parseLoanLine({ data: loanLineinfo, where });
    CUSTOMER.receivableInfo = await parseReceivable({ data: receivableInfo, where });
    CUSTOMER.onusInfo = await parseOnus({ data: onusInfo, where });
    CUSTOMER.bondInfo = await parseBond({ data: bond, where });
    CUSTOMER.mrtInfo = await parseMortgage({ data: mrtInfo, where });
  } catch (err) {
    // console.log(err);
    return ({
      error: {
        code    : err?.code,
        message : err?.message,
        customer: customerInfo?.o_c_registerno
      }
    });
  }
  let customer = null;
  customer = await db.find(db.Customer, {
    where: where
  }, session);
  if (!customer){
    await db.create(db.Customer, {
      ...CUSTOMER?.customerInfo
    }, session);
    if (CUSTOMER?.shareholderCustomer){
      await insert(() => db.bulkCreate(db.OShareholdercustomer, CUSTOMER?.shareholderCustomer, session));
    }
    if (CUSTOMER?.shareholderOrg){
      await insert(() => db.bulkCreate(db.OShareholderorg, CUSTOMER?.shareholderOrg, session));
    }
    if (CUSTOMER?.relationOrg){
      await insert(() => db.bulkCreate(db.OCRelationorg, CUSTOMER?.relationOrg, session));
    }
    if (CUSTOMER?.relationCustomer){
      await insert(() => db.bulkCreate(db.OCRelationcustomer, CUSTOMER?.relationCustomer, session));
    }
    if (CUSTOMER?.financialInfo?.business){
      await insert(() => db.create(db.CBusiness, { ...CUSTOMER?.financialInfo?.business }, session));
    }
    if (CUSTOMER?.financialInfo?.family){
      await insert(() => db.create(db.CFamily, { ...CUSTOMER?.financialInfo?.family }, session));
    }
    if (CUSTOMER?.financialInfo?.capital){
      await insert(() => db.create(db.CCapital, { ...CUSTOMER?.financialInfo?.capital }, session));
    }
    if (CUSTOMER?.financialInfo?.o_m_report){
      await insert(() => db.create(db.OMReport, { ...CUSTOMER?.financialInfo?.o_m_report }, session));
    }
    if (CUSTOMER?.financialInfo?.o_report){
      await insert(() => db.create(db.OReport, { ...CUSTOMER?.financialInfo?.o_report }, session));
    }
    if (CUSTOMER?.financialInfo?.o_t_report){
      await insert(() => db.create(db.OTReport, { ...CUSTOMER?.financialInfo?.o_t_report }, session));
    }
    // LOAN START
    if (CUSTOMER?.loanInfo){
      await insert(() => db.create(db.OCLoanInformation, { ...CUSTOMER?.loanInfo }, session));
      if (CUSTOMER?.loanInfo?.o_c_loanmrtnos && CUSTOMER?.loanInfo?.o_c_loanmrtnos.length >0)
        await insert(() => db.bulkCreate(db.Mrtno, CUSTOMER?.loanInfo?.o_c_loanmrtnos, session));
      if (CUSTOMER?.loanInfo?.o_c_loanrelnos && CUSTOMER?.loanInfo?.o_c_loanrelnos.length > 0)
        await insert(() => db.bulkCreate(db.Relno, CUSTOMER?.loanInfo?.o_c_loanrelnos, session));
      if (CUSTOMER?.loanInfo?.neoInfo)
        await insert(() => db.create(db.NeoInfo, { ...CUSTOMER?.loanInfo?.neoInfo }, session));
      if (CUSTOMER?.loanInfo?.transactions && CUSTOMER?.loanInfo?.transactions.length > 0)
        await insert(() => db.bulkCreate(db.Transaction, CUSTOMER?.loanInfo?.transactions, session));
    }
    // LOAN END
    // LEASING START
    if (CUSTOMER?.leasingInfo){
      await insert(() => db.create(db.OCLeasing, { ...CUSTOMER?.leasingInfo }, session));
      if (CUSTOMER?.leasingInfo?.neoInfo)
        await insert(() => db.create(db.NeoInfo, { ...CUSTOMER?.leasingInfo?.neoInfo }, session));
      if (CUSTOMER?.leasingInfo?.o_c_leasingmrtno && CUSTOMER?.leasingInfo?.o_c_leasingmrtno.length > 0)
        await insert(() => db.bulkCreate(db.Mrtno, CUSTOMER?.leasingInfo?.o_c_leasingmrtnos, session));
      if (CUSTOMER?.leasingInfo?.o_c_leasingrelnos && CUSTOMER?.leasingInfo?.o_c_leasingrelnos.length > 0)
        await insert(() => db.bulkCreate(db.Relno, CUSTOMER?.leasingInfo?.o_c_leasingrelnos, session));
      if (CUSTOMER?.leasingInfo?.transactions && CUSTOMER?.leasingInfo?.transactions.length >0)
        await insert(() => db.bulkCreate(db.Transaction, CUSTOMER?.leasingInfo?.transactions, session));
    }
    // LEASING END
    // ACCREDIT START
    if (CUSTOMER?.accreditInfo){
      await insert(() => db.create(db.OCAccredit, { ...CUSTOMER?.accreditInfo }, session));
      if (CUSTOMER?.accreditInfo?.o_c_accreditmrtnos && CUSTOMER?.accreditInfo?.o_c_accreditmrtnos.length > 0)
        await insert(() => db.bulkCreate(db.Mrtno, CUSTOMER?.accreditInfo?.o_c_accreditmrtnos, session));
      if (CUSTOMER?.accreditInfo?.o_c_accreditrelnos && CUSTOMER?.accreditInfo?.o_c_accreditrelnos.length)
        await insert(() => db.bulkCreate(db.Relno, CUSTOMER?.accreditInfo?.o_c_accreditrelnos, session));
    }
    // ACCREDIT END
    // GUARENTEE START
    if (CUSTOMER?.guarenteeInfo){
      await insert(() => db.create(db.OCGuarantee, { ...CUSTOMER?.guarenteeInfo }, session));
      if (CUSTOMER?.guarenteeInfo?.o_c_guaranteemrtnos && CUSTOMER?.guarenteeInfo?.o_c_guaranteemrtnos.length > 0)
        await insert(() => db.bulkCreate(db.Mrtno, CUSTOMER?.guarenteeInfo?.o_c_guaranteemrtnos, session));
      if (CUSTOMER?.guarenteeInfo?.o_c_guaranteerelnos && CUSTOMER?.guarenteeInfo?.o_c_guaranteerelnos.length > 0)
        await insert(() => db.bulkCreate(db.Relno, CUSTOMER?.guarenteeInfo?.o_c_guaranteerelnos, session));
    }
    // GUARENTEE END
    if (CUSTOMER?.loanLineInfo){
      await insert(() => db.create(db.OCLoanline, { ...CUSTOMER?.loanLineInfo }, session));
    }
    // RECEIVABLE START
    if (CUSTOMER?.receivableInfo){
      await insert(() => db.create(db.OCReceivable, { ...CUSTOMER?.receivableInfo }, session));
      if (CUSTOMER?.receivableInfo?.transactions && CUSTOMER?.receivableInfo?.transactions.length > 0)
        await insert(() => db.bulkCreate(db.Transaction, CUSTOMER?.receivableInfo?.transactions, session));
      if (CUSTOMER?.receivableInfo?.neoInfo)
        await insert(() => db.create(db.NeoInfo, { ...CUSTOMER?.receivableInfo?.neoInfo }, session));
    }
    // RECEIVABLE END
    // ONUS INFO START
    if (CUSTOMER?.onusInfo){
      await insert(() => db.create(db.OCOnusInformation, { ...CUSTOMER?.onusInfo }, session));
      if (CUSTOMER?.onusInfo?.o_c_onusmrtnos && CUSTOMER?.onusInfo?.o_c_onusmrtnos > 0)
        await insert(() => db.bulkCreate(db.Mrtno, CUSTOMER?.onusInfo?.o_c_onusmrtnos, session));
      if (CUSTOMER?.onusInfo?.o_c_onusrelnos && CUSTOMER?.onusInfo?.o_c_onusrelnos.length > 0)
        await insert(() => db.bulkCreate(db.Relno, CUSTOMER?.onusInfo?.o_c_onusrelnos, session));
      if (CUSTOMER?.onusInfo?.transactions && CUSTOMER?.onusInfo?.transactions.length > 0)
        await insert(() => db.bulkCreate(db.Transaction, CUSTOMER?.onusInfo?.transactions, session));
      if (CUSTOMER?.onusInfo?.neoInfo)
        await insert(() => db.create(db.NeoInfo, { ...CUSTOMER?.onusInfo?.neoInfo }, session));
    }
    // ONUS INFO END
    if (CUSTOMER?.bondInfo){
      await insert(() => db.create(db.OBond, { ...CUSTOMER?.bondInfo }, session));
      if (CUSTOMER?.bondInfo?.o_c_bondmrtnos && CUSTOMER?.bondInfo?.o_c_bondmrtnos.length > 0)
        await insert(() => db.bulkCreate(db.Mrtno, CUSTOMER?.bondInfo?.o_c_bondmrtnos, session));
      if (CUSTOMER?.bondInfo?.o_c_bondrelnos && CUSTOMER?.bondInfo?.o_c_bondrelnos.length > 0)
        await insert(() => db.bulkCreate(db.Relno, CUSTOMER?.bondInfo?.o_c_bondrelnos, session));
    }
    if (CUSTOMER?.mrtInfo?.length > 0){
      await insert(() => db.bulkCreate(db.OCMortgage, CUSTOMER?.mrtInfo, session));
    }
    // await Promise.all([insert(() => db.create(db.OBond, { ...CUSTOMER?.bondInfo }, session)),
    //   insert(() => db.bulkCreate(db.Mrtno, CUSTOMER?.bondInfo?.o_c_bondmrtnos, session)),
    //   insert(() => db.bulkCreate(db.Relno, CUSTOMER?.bondInfo?.o_c_bondrelnos, session)),
    //   insert(() => db.bulkCreate(db.OCMortgage, CUSTOMER?.mrtInfo, session))]);

    return ({ customer: CUSTOMER });
  }
  if (customer){

    // console.log("=====================================================CUSTOMER_EXISTS_ROUTE=====================================================");
    if (CUSTOMER?.customerInfo){
      await db.update(customer, { ...CUSTOMER?.customerInfo, id: CUSTOMER?.id }, session);
    }
    if (CUSTOMER?.shareholderCustomer){
      await bulkUpdate({ type: "shareholderCustomer", data: CUSTOMER?.shareholderCustomer, attribute: "o_shareholdercus_registerno", where, session });
    }
    if (CUSTOMER?.shareholderCustomer){
      await bulkUpdate({ type: "shareholderOrg", data: CUSTOMER?.shareholderCustomer, attribute: "o_shareholderorg_registerno", where, session });
    }
    if (CUSTOMER?.shareholderOrg){
      await bulkUpdate({ type: "relationOrg", data: CUSTOMER?.shareholderOrg, attribute: "o_c_relationorg_registerno", where, session });
    }
    if (CUSTOMER?.shareholderCustomer){
      await bulkUpdate({ type: "relationCustomer", data: CUSTOMER?.shareholderCustomer, attribute: "o_c_relationcustomer_registerno", where, session });
    }
    if (CUSTOMER?.financialInfo){
      if (CUSTOMER?.financialInfo?.business){
        await update({ type: "business", data: CUSTOMER?.financialInfo?.business, where, session });
      }
      if (CUSTOMER?.financialInfo?.family){
        await update({ type: "family", data: CUSTOMER?.financialInfo?.family, where, session });
      }
      if (CUSTOMER?.financialInfo?.capital){
        await update({ type: "capital", data: CUSTOMER?.financialInfo?.capital, where, session });
      }
      if (CUSTOMER?.financialInfo?.o_m_report){
        await update({ type: "omReport", data: CUSTOMER?.financialInfo?.o_m_report, where, session });
      }
      if (CUSTOMER?.financialInfo?.o_report){
        await update({ type: "oReport", data: CUSTOMER?.financialInfo?.o_report, where, session });
      }
      if (CUSTOMER?.financialInfo?.o_t_report){
        await update({ type: "otReport", data: CUSTOMER?.financialInfo?.o_t_report, where, session });
      }
    }
    if (CUSTOMER?.loanInfo){
      let loan = await update({ type : "loanInfo", data : { ...CUSTOMER?.loanInfo }, where: {
        ...where,
        o_c_loan_starteddate: CUSTOMER.loanInfo?.o_c_loan_starteddate
      }, session });
      if (loan) {
        if (CUSTOMER?.loanInfo?.o_c_loanmrtnos && CUSTOMER?.loanInfo?.o_c_loanmrtnos.length >0)
          await bulkUpdate({ type: "mrtno", data: CUSTOMER?.loanInfo?.o_c_loanmrtnos, attribute: "mrtno", where: { ...where, type: "LOAN", relation_id: loan.id }, session });
        if (CUSTOMER?.loanInfo?.o_c_loanrelnos && CUSTOMER?.loanInfo?.o_c_loanrelnos.length > 0)
          await bulkUpdate({ type: "relno", data: CUSTOMER?.loanInfo?.o_c_loanrelnos, attribute: "relno", where: { ...where, type: "LOAN", relation_id: loan.id }, session });
        if (CUSTOMER?.loanInfo?.neoInfo)
          await update({ type: "neoInfo", data: { ...CUSTOMER?.loanInfo?.neoInfo }, where: { ...where, registertopolicedate: CUSTOMER?.loanInfo?.neoInfo?.registertopolicedate, relation_id: loan.id, relation_type: "LOAN" }, session });
        if (CUSTOMER?.loanInfo?.transactions && CUSTOMER?.loanInfo?.transactions.length > 0)
          await bulkUpdate({ type: "transaction", data: CUSTOMER?.loanInfo?.transactions, attribute: "datetopay", where: { ...where, relation_type: "LOAN", relation_id: loan.id }, session });
      }
    }
    if (CUSTOMER?.leasingInfo){
      let leasing = await update({ type : "leasingInfo", data : { ...CUSTOMER?.leasingInfo }, where: {
        ...where,
        o_c_leasing_starteddate: CUSTOMER?.leasingInfo?.o_c_leasing_starteddate
      }, session });
      if (leasing){
        if (CUSTOMER?.leasingInfo?.neoInfo)
          await update({ type: "neoInfo", data: CUSTOMER?.leasingInfo?.neoInfo, where: { ...where, registertopolicedate: moment(CUSTOMER?.loanInfo?.neoInfo?.registertopolicedate), relation_type: "LEASING", relation_id: leasing.id }, session });
        if (CUSTOMER?.leasingInfo?.o_c_leasingmrtno && CUSTOMER?.leasingInfo?.o_c_leasingmrtno.length > 0)
          await bulkUpdate({ type: "mrtno", data: CUSTOMER?.leasingInfo?.o_c_leasingmrtnos, attribute: "mrtno", where: { ...where, type: "LEASING", relation_id: leasing.id }, session });
        if (CUSTOMER?.leasingInfo?.o_c_leasingrelnos && CUSTOMER?.leasingInfo?.o_c_leasingrelnos.length > 0)
          await bulkUpdate({ type: "relno", data: CUSTOMER?.leasingInfo?.o_c_leasingrelnos, attribute: "relno", where: { ...where, type: "LEASING", relation_id: leasing.id }, session });
        if (CUSTOMER?.leasingInfo?.transactions && CUSTOMER?.leasingInfo?.transactions.length >0)
          await bulkUpdate({ type: "transaction", data: CUSTOMER?.leasingInfo?.transactions, attribute: "datetopay", where: { ...where, relation_type: "LEASING", relation_id: leasing.id }, session });
      }
    }
    if (CUSTOMER?.accreditInfo){
      let accredit = await update({ type : "accreditInfo", data : { ...CUSTOMER?.accreditInfo }, where: {
        ...where,
        o_c_accredit_starteddate: CUSTOMER?.accreditInfo?.o_c_accredit_starteddate
      }, session });
      if (accredit){
        if (CUSTOMER?.accreditInfo?.o_c_accreditmrtnos && CUSTOMER?.accreditInfo?.o_c_accreditmrtnos.length > 0)
          await bulkUpdate({ type: "mrtno", data: CUSTOMER?.accreditInfo?.o_c_accreditmrtnos, attribute: "mrtno", where: { ...where, type: "ACCREDIT", relation_id: accredit.id }, session });
        if (CUSTOMER?.accreditInfo?.o_c_accreditrelnos && CUSTOMER?.accreditInfo?.o_c_accreditrelnos.length)
          await bulkUpdate({ type: "relno", data: CUSTOMER?.accreditInfo?.o_c_accreditrelnos, attribute: "relno", where: { ...where, type: "ACCREDIT", relation_id: accredit.id }, session });
      }
    }
    if (CUSTOMER?.guarenteeInfo){
      let gurantee = await update({ type : "guarantee", data : CUSTOMER?.guarenteeInfo, where: {
        ...where,
        o_c_guarantee_starteddate: CUSTOMER?.guarenteeInfo?.o_c_guarantee_starteddate
      }, session });
      if (gurantee){
        if (CUSTOMER?.guarenteeInfo?.o_c_guaranteemrtnos && CUSTOMER?.guarenteeInfo?.o_c_guaranteemrtnos.length > 0)
          await bulkUpdate({ type: "mrtno", data: CUSTOMER?.guarenteeInfo?.o_c_guaranteemrtnos, attribute: "mrtno", where: { ...where, type: "GUARANTEE", relation_id: gurantee.id }, session });
        if (CUSTOMER?.guarenteeInfo?.o_c_guaranteerelnos && CUSTOMER?.guarenteeInfo?.o_c_guaranteerelnos.length > 0)
          await bulkUpdate({ type: "relno", data: CUSTOMER?.guarenteeInfo?.o_c_guaranteerelnos, attribute: "relno", where: { ...where, type: "GUARANTEE", relation_id: gurantee.id }, session });
      }
    }
    if (CUSTOMER?.loanLineInfo){
      await update({ type : "loanLine", data : CUSTOMER?.loanLineInfo, where: {
        ...where,
        o_c_loanline_starteddate: CUSTOMER?.loanLineInfo?.o_c_loanline_starteddate
      }, session });
    }
    if (CUSTOMER?.receivableInfo){
      let receivable = await update({ type : "receivable", data : { ...CUSTOMER?.receivableInfo }, where: {
        ...where,
        o_c_receivable_starteddate: CUSTOMER?.receivableInfo?.o_c_receivable_starteddate
      }, session });
      if (receivable){
        if (CUSTOMER?.receivableInfo?.transactions && CUSTOMER?.receivableInfo?.transactions.length > 0)
          await bulkUpdate({ type: "transaction", data: CUSTOMER?.receivableInfo?.transactions, attribute: "datetopay", where: { ...where, relation_type: "RECEIVABLE", relation_id: receivable.id }, session });
        if (CUSTOMER?.receivableInfo?.neoInfo)
          await update({ type: "neoInfo", data: CUSTOMER?.receivableInfo?.neoInfo, where: { ...where, registertopolicedate: moment(CUSTOMER?.loanInfo?.neoInfo?.registertopolicedate), relation_type: "RECEIVABLE", relation_id: receivable.id }, session });
      }
    }
    if (CUSTOMER?.onusInfo){
      let onus = await update({ type : "onus", data : { ...CUSTOMER?.onusInfo, }, where: {
        ...where,
        o_c_onus_starteddate: CUSTOMER?.onusInfo?.o_c_onus_starteddate
      }, session });
      if (onus) {
        if (CUSTOMER?.onusInfo?.o_c_onusmrtnos && CUSTOMER?.onusInfo?.o_c_onusmrtnos > 0)
          await bulkUpdate({ type: "mrtno", data: CUSTOMER?.onusInfo?.o_c_onusmrtnos, attribute: "mrtno", where: { ...where, type: "ONUS", relation_id: onus.id }, session });
        if (CUSTOMER?.onusInfo?.o_c_onusrelnos && CUSTOMER?.onusInfo?.o_c_onusrelnos.length > 0)
          await bulkUpdate({ type: "relno", data: CUSTOMER?.onusInfo?.o_c_onusrelnos, attribute: "relno", where: { ...where, type: "ONUS", relation_id: onus.id }, session });
        if (CUSTOMER?.onusInfo?.transactions && CUSTOMER?.onusInfo?.transactions.length > 0)
          await bulkUpdate({ type: "transaction", data: CUSTOMER?.onusInfo?.transactions, attribute: "datetopay", where: { ...where, relation_type: "ONUS", relation_id: onus.id }, session });
        if (CUSTOMER?.onusInfo?.neoInfo)
          await update({ type: "neoInfo", data: CUSTOMER?.onusInfo?.neoInfo, where: { ...where, registertopolicedate: moment(CUSTOMER?.onusInfo?.neoInfo?.registertopolicedate), relation_type: "ONUS", relation_id: onus.id }, session });
      }
    }
    if (CUSTOMER?.bondInfo){
      let bond = await update({ type : "bond", data : { ...CUSTOMER?.bondInfo }, where: {
        ...where,
        o_bond_starteddate: CUSTOMER?.bondInfo?.o_bond_starteddate
      }, session });
      if (bond) {
        if (CUSTOMER?.bondInfo?.o_c_bondmrtnos && CUSTOMER?.bondInfo?.o_c_bondmrtnos.length > 0)
          await bulkUpdate({ type: "mrtno", data: CUSTOMER?.bondInfo?.o_c_bondmrtnos, attribute: "mrtno", where: { ...where, type: "BOND", relation_id: bond.id }, session });
        if (CUSTOMER?.bondInfo?.o_c_bondrelnos && CUSTOMER?.bondInfo?.o_c_bondrelnos.length > 0)
          await bulkUpdate({ type: "relno", data: CUSTOMER?.bondInfo?.o_c_bondrelnos, attribute: "relno", where: { ...where, type: "BOND", relation_id: bond.id }, session });
      }
    }
    if (CUSTOMER?.mrtInfo){
      let falls = CUSTOMER.mrtInfo.map(item => {
        return async () => {
          if (item.o_c_mrtstateregisterno){
            let mortgage = await db.find(db.OCMortgage, { where: {
              ...where,
              o_c_mrtstateregisterno: item.o_c_mrtstateregisterno,
              o_c_mrtconfirmeddate  : moment(item.o_c_mrtconfirmeddate)
            } });
            if (!mortgage){
              await db.create(db.OCMortgage, item, session);
            } else {
              await db.update(mortgage, item, session);
            }
          } else {
            let mortgage = await db.find(db.OCMortgage, { where: {
              ...where,
              o_c_mrtorgname          : item.o_c_mrtorgname,
              o_c_mrtregistereddatefim: moment(item.o_c_mrtregistereddatefim),
              o_c_mrtregisterno       : item.o_c_mrtregisterno
            } });
            if (!mortgage){
              await db.create(db.OCMortgage, item, session);
            } else {
              await db.update(mortgage, item, session);
            }
          }
          await Promise.resolve();
        };
      });
      await fall(falls);
    }

    return ({ customer: CUSTOMER });
  }


});
