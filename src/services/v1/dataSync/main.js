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
  s_code             : db.SCode,
};
const insert = async (callback) => {
  try {
    await callback();
  } catch (err) {
    console.log(err);
  }
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
      if (model === db.Transaction){
        return {
          ...acc,
          [key]: value[key]
        };
      }
      if (attributeType && value[key] && attributeType === "DATE") {
        return {
          ...acc,
          [key]: moment(value[key])
        };
      }
      return {
        ...acc,
        [key]: value[key]
      };
    }, {})
  };
};
const bulkUpdate = async ({ type, data, attribute, where, session }) => {
  let oldData;
  let INSERT_DATA = [];
  try {
    if (attribute === "datetopay"){
      oldData = (await db.findAll(model[type], {
        where: where,
      }, session)).map(item => {
        return {
          ...item?.dataValues,
          datetopay: moment(item?.datetopay).format("YYYY-MM-DD")
        };
      });
      if (oldData.length <= 0){
        data.forEach(item => {
          INSERT_DATA.push({
            ...item,
            datetopay: moment(item?.datetopay)
          });
        });
      } else {
        data.forEach(iter => {
          if (!oldData.find(f=> f.datetopay === iter.datetopay && f.type === iter.type)) {
            console.log(oldData.find(f=> f.datetopay === iter.datetopay && f.type === iter.type));
            INSERT_DATA.push(iter);
          }
        });
      }
    } else {
      oldData = (await db.findAll(model[type], {
        where     : where,
        attributes: [attribute]
      }, session))?.map(item => item[attribute]);
      data.forEach(item => {
        if (oldData.indexOf(item[attribute]) === -1)
          INSERT_DATA.push({
            ...item,
          });
      });
    }
    if (INSERT_DATA.length > 0)
      await db.bulkCreate(model[type], INSERT_DATA, session);
  } catch (err){
    console.log(err);
  }
};
const update = async ({ type, data, where, session }) => {
  try {
    let oldData = await db.find(model[type], {
      where: where
    }, session);
    // console.log(data);
    // console.log("OLD_DATA========>", oldData);
    let updatedData;
    // console.log("OLD_DATA_SINGLE", oldData);
    if (!oldData){
      try {
        updatedData = await db.create(model[type], data, session);
      } catch (err){
        console.log(err);
      }
      // console.log("UPDATED_DATA======>", updatedData);
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
  let relationCustomer = customerInfo?.o_c_relationcustomers?.o_c_relationcustomer;
  let relationOrg = customerInfo?.o_c_relationorgs.o_c_relationorg;
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
    CUSTOMER.customerInfo = await parseCustomer(customerInfo, where);
    // CUSTOMER.shareholderCustomer = await parseShareholder({ data: shareholderCustomer, where, type: "CUSTOMER" });
    // CUSTOMER.shareholderOrg = await parseShareholder({ data: shareholderOrg, where, type: "ORG" });
    CUSTOMER.relationOrg = await parseRelation({ data: relationOrg, where, type: "ORG", session });
    // CUSTOMER.relationCustomer = await parseRelation({ data: relationCustomer, where, type: "CUSTOMER", session });
    // CUSTOMER.financialInfo = await parseFinancialInfo({ data: financialInfo, where });
    // CUSTOMER.loanInfo = await parseLoan({ data: loanInfo, where });
    // CUSTOMER.leasingInfo = await parseLeasing({ data: leasingInfo, where });
    // CUSTOMER.accreditInfo = await parseAccredit({ data: accreditInfo, where });
    // CUSTOMER.guarenteeInfo = await parseGuarantee({ data: guarenteeinfo, where });
    // CUSTOMER.loanLineInfo = await parseLoanLine({ data: loanLineinfo, where });
    // CUSTOMER.receivableInfo = await parseReceivable({ data: receivableInfo, where });
    // CUSTOMER.onusInfo = await parseOnus({ data: onusInfo, where });
    // CUSTOMER.bondInfo = await parseBond({ data: bond, where });
    // CUSTOMER.mrtInfo = await parseMortgage({ data: mrtInfo, where });
  } catch (err) {
    console.log(err);
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
      await insert(() => db.bulkCreate(db.OShareholdercustomer, CUSTOMER?.shareholderCustomer.map(entry => formatter(entry, db.OShareholdercustomer)), session));
    }

    if (CUSTOMER?.shareholderOrg){
      await insert(() => db.bulkCreate(db.OShareholderorg, CUSTOMER?.shareholderOrg.map(entry => formatter(entry, db.OShareholderorg)), session));
    }
    // =============================================================================
    if (CUSTOMER?.shareholderOrg?.o_shareholder_sectorcodes&& CUSTOMER?.shareholderOrg?.o_shareholder_sectorcodes.length>0){
      await insert(()=> db.bulkCreate(db.SCode, CUSTOMER?.shareholderOrg?.o_shareholder_sectorcodes, session));}
    // =====================================================================================
    if (CUSTOMER?.relationOrg){
      await insert(() => db.bulkCreate(db.OCRelationorg, CUSTOMER?.relationOrg.map(entry => formatter(entry, db.OCRelationorg)), session));
    }
    // ===================================================================================
    if (CUSTOMER?.relationOrg?.o_c_relationorg_sectorcodes&& CUSTOMER?.relationOrg?.o_c_relationorg_sectorcodes.length>0){
      await insert(()=> db.bulkCreate(db.SCode, CUSTOMER?.relationOrg?.o_c_relationorg_sectorcodes, session));}
    // =====================================================================================
    if (CUSTOMER?.relationCustomer){
      await insert(() => db.bulkCreate(db.OCRelationcustomer, CUSTOMER?.relationCustomer.map(entry => formatter(entry, db.OCRelationcustomer)), session));
    }
    if (CUSTOMER?.financialInfo?.business){
      await insert(() => db.create(db.CBusiness, formatter(CUSTOMER?.financialInfo?.business, db.CBusiness), session));
    }
    if (CUSTOMER?.financialInfo?.family){
      await insert(() => db.create(db.CFamily, { ...formatter(CUSTOMER?.financialInfo?.family, db.CFamily) }, session));
    }
    if (CUSTOMER?.financialInfo?.capital){
      await insert(() => db.create(db.CCapital, { ...formatter(CUSTOMER?.financialInfo?.capital, db.CCapital), }, session));
    }
    if (CUSTOMER?.financialInfo?.o_m_report){
      await insert(() => db.create(db.OMReport, { ...formatter(CUSTOMER?.financialInfo?.o_m_report, db.OMReport) }, session));
    }
    if (CUSTOMER?.financialInfo?.o_report){
      await insert(() => db.create(db.OReport, { ...formatter(CUSTOMER?.financialInfo?.o_report, db.OReport) }, session));
    }
    if (CUSTOMER?.financialInfo?.o_t_report){
      await insert(() => db.create(db.OTReport, { ...formatter(CUSTOMER?.financialInfo?.o_t_report, db.OTReport) }, session));
    }
    // / SCode

    if (CUSTOMER?.customerInfo?.o_c_sectorcodes && CUSTOMER?.customerInfo?.o_c_sectorcodes.length > 0) {
      await insert(() => db.bulkCreate(db.SCode, CUSTOMER?.customerInfo?.o_c_sectorcodes, session));
    }
    // Scode
    // LOAN START
    if (CUSTOMER?.loanInfo){
      await insert(() => db.create(db.OCLoanInformation, { ...formatter(CUSTOMER?.loanInfo, db.OCLoanInformation) }, session));
      if (CUSTOMER?.loanInfo?.o_c_loanmrtnos && CUSTOMER?.loanInfo?.o_c_loanmrtnos.length >0)
        await insert(() => db.bulkCreate(db.Mrtno, CUSTOMER?.loanInfo?.o_c_loanmrtnos, session));
      if (CUSTOMER?.loanInfo?.o_c_loanrelnos && CUSTOMER?.loanInfo?.o_c_loanrelnos.length > 0)
        await insert(() => db.bulkCreate(db.Relno, CUSTOMER?.loanInfo?.o_c_loanrelnos, session));
      if (CUSTOMER?.loanInfo?.neoInfo)
        await insert(() => db.create(db.NeoInfo, { ...formatter(CUSTOMER?.loanInfo?.neoInfo, db.NeoInfo) }, session));
      if (CUSTOMER?.loanInfo?.transactions && CUSTOMER?.loanInfo?.transactions.length > 0)
        await insert(() => db.bulkCreate(db.Transaction, CUSTOMER?.loanInfo?.transactions.map(entry => formatter(entry, db.Transaction)), session));
    }

    // LOAN END
    // LEASING START
    if (CUSTOMER?.leasingInfo){
      await insert(() => db.create(db.OCLeasing, { ...formatter(CUSTOMER?.leasingInfo, db.OCLeasing) }, session));
      if (CUSTOMER?.leasingInfo?.neoInfo)
        await insert(() => db.create(db.NeoInfo, { ...formatter(CUSTOMER?.leasingInfo?.neoInfo, db.NeoInfo) }, session));
      if (CUSTOMER?.leasingInfo?.o_c_leasingmrtnos && CUSTOMER?.leasingInfo?.o_c_leasingmrtnos.length > 0)
        await insert(() => db.bulkCreate(db.Mrtno, CUSTOMER?.leasingInfo?.o_c_leasingmrtnos, session));
      if (CUSTOMER?.leasingInfo?.o_c_leasingrelnos && CUSTOMER?.leasingInfo?.o_c_leasingrelnos.length > 0)
        await insert(() => db.bulkCreate(db.Relno, CUSTOMER?.leasingInfo?.o_c_leasingrelnos, session));
      if (CUSTOMER?.leasingInfo?.transactions && CUSTOMER?.leasingInfo?.transactions.length >0)
        await insert(() => db.bulkCreate(db.Transaction, CUSTOMER?.leasingInfo?.transactions.map(entry => formatter(entry, db.Transaction)), session));
    }
    // LEASING END
    // ACCREDIT START
    if (CUSTOMER?.accreditInfo){
      await insert(() => db.create(db.OCAccredit, { ...formatter(CUSTOMER?.accreditInfo, db.OCAccredit) }, session));
      if (CUSTOMER?.accreditInfo?.o_c_accreditmrtnos && CUSTOMER?.accreditInfo?.o_c_accreditmrtnos.length > 0)
        await insert(() => db.bulkCreate(db.Mrtno, CUSTOMER?.accreditInfo?.o_c_accreditmrtnos, session));
      if (CUSTOMER?.accreditInfo?.o_c_accreditrelnos && CUSTOMER?.accreditInfo?.o_c_accreditrelnos.length)
        await insert(() => db.bulkCreate(db.Relno, CUSTOMER?.accreditInfo?.o_c_accreditrelnos, session));
    }
    // ACCREDIT END
    // GUARENTEE START
    if (CUSTOMER?.guarenteeInfo){
      await insert(() => db.create(db.OCGuarantee, { ...formatter(CUSTOMER?.guarenteeInfo, db.OCGuarantee) }, session));
      if (CUSTOMER?.guarenteeInfo?.o_c_guaranteemrtnos && CUSTOMER?.guarenteeInfo?.o_c_guaranteemrtnos.length > 0)
        await insert(() => db.bulkCreate(db.Mrtno, CUSTOMER?.guarenteeInfo?.o_c_guaranteemrtnos, session));
      if (CUSTOMER?.guarenteeInfo?.o_c_guaranteerelnos && CUSTOMER?.guarenteeInfo?.o_c_guaranteerelnos.length > 0)
        await insert(() => db.bulkCreate(db.Relno, CUSTOMER?.guarenteeInfo?.o_c_guaranteerelnos, session));

      if (CUSTOMER?.guarenteeInfo?.o_c_guarantee_sectorcode && CUSTOMER?.guarenteeInfo?.o_c_guarantee_sectorcode.length > 0)
        await insert(() => db.bulkCreate(db.SCode, CUSTOMER?.guarenteeInfo?.o_c_guarantee_sectorcode, session));
    }
    // GUARENTEE END
    if (CUSTOMER?.loanLineInfo){
      await insert(() => db.create(db.OCLoanline, { ...formatter(CUSTOMER?.loanLineInfo, db.OCLoanline) }, session));

    }
    // RECEIVABLE START
    if (CUSTOMER?.receivableInfo){
      await insert(() => db.create(db.OCReceivable, { ...formatter(CUSTOMER?.receivableInfo, db.OCReceivable) }, session));
      if (CUSTOMER?.receivableInfo?.transactions && CUSTOMER?.receivableInfo?.transactions.length > 0)
        await insert(() => db.bulkCreate(db.Transaction, CUSTOMER?.receivableInfo?.transactions.map(entry => formatter(entry, db.Transaction)), session));
      if (CUSTOMER?.receivableInfo?.neoInfo)
        await insert(() => db.create(db.NeoInfo, { ...formatter(CUSTOMER?.receivableInfo?.neoInfo, db.NeoInfo) }, session));
    }
    // RECEIVABLE END
    // ONUS INFO START
    if (CUSTOMER?.onusInfo){
      await insert(() => db.create(db.OCOnusInformation, { ...formatter(CUSTOMER?.onusInfo, db.OCOnusInformation) }, session));
      if (CUSTOMER?.onusInfo?.o_c_onusmrtnos && CUSTOMER?.onusInfo?.o_c_onusmrtnos > 0)
        await insert(() => db.bulkCreate(db.Mrtno, CUSTOMER?.onusInfo?.o_c_onusmrtnos, session));
      if (CUSTOMER?.onusInfo?.o_c_onusrelnos && CUSTOMER?.onusInfo?.o_c_onusrelnos.length > 0)
        await insert(() => db.bulkCreate(db.Relno, CUSTOMER?.onusInfo?.o_c_onusrelnos, session));
      if (CUSTOMER?.onusInfo?.transactions && CUSTOMER?.onusInfo?.transactions.length > 0)
        await insert(() => db.bulkCreate(db.Transaction, CUSTOMER?.onusInfo?.transactions.map(entry => formatter(entry, db.Transaction)), session));
      if (CUSTOMER?.onusInfo?.neoInfo)
        await insert(() => db.create(db.NeoInfo, { ...formatter(CUSTOMER?.onusInfo?.neoInfo, db.NeoInfo) }, session));
    }
    // ONUS INFO END
    if (CUSTOMER?.bondInfo){
      await insert(() => db.create(db.OBond, { ...formatter(CUSTOMER?.bondInfo, db.OBond) }, session));
      if (CUSTOMER?.bondInfo?.o_c_bondmrtnos && CUSTOMER?.bondInfo?.o_c_bondmrtnos.length > 0)
        await insert(() => db.bulkCreate(db.Mrtno, CUSTOMER?.bondInfo?.o_c_bondmrtnos, session));
      if (CUSTOMER?.bondInfo?.o_c_bondrelnos && CUSTOMER?.bondInfo?.o_c_bondrelnos.length > 0)
        await insert(() => db.bulkCreate(db.Relno, CUSTOMER?.bondInfo?.o_c_bondrelnos, session));
    }
    if (CUSTOMER?.mrtInfo?.length > 0){
      await insert(() => db.create(db.OCMortgage, CUSTOMER?.mrtInfo.map(entry => formatter(entry, db.OCMortgage)), session));
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
      await db.update(customer, { ...formatter(CUSTOMER?.customerInfo, db.Customer), id: CUSTOMER?.id }, session);
    }
    if (CUSTOMER?.shareholderCustomer){
      await bulkUpdate({ type: "shareholderCustomer", data: CUSTOMER?.shareholderCustomer.map(entry => formatter(entry, db.OShareholdercustomer)), attribute: "o_shareholdercus_registerno", where, session });
    }
    if (CUSTOMER?.shareholderOrg){
      await bulkUpdate({ type: "shareholderOrg", data: CUSTOMER?.shareholderOrg.map(entry => formatter(entry, db.OShareholderorg)), attribute: "o_shareholderorg_registerno", where, session });
    }
    // // SCODE
    if (CUSTOMER?.shareholderOrg?.o_shareholder_sectorcodes && CUSTOMER?.shareholderOrg?.o_shareholder_sectorcodes.length > 0){
      await bulkUpdate({ type: "s_code", data: CUSTOMER?.shareholderOrg?.o_shareholder_sectorcodes.map(item => ({ ...item, relation_id: customer.id })), attribute: "code", where: { ...where, type: "SHAREHOLDER_ORG", relation_id: customer.id }, session });
    }

    // // SCODE
    if (CUSTOMER?.relationOrg){
      await bulkUpdate({ type: "relationOrg", data: CUSTOMER?.relationOrg.map(entry => formatter(entry, db.OCRelationorg)), attribute: "o_c_relationorg_registerno", where, session });
    }
    console.log("===============================bbb=======================", CUSTOMER?.relationOrg?.o_c_relationorg_sectorcodes);
    if (CUSTOMER?.relationOrg?.o_c_relationorg_sectorcodes && CUSTOMER?.relationOrg?.o_c_relationorg_sectorcodes.length > 0){
      await bulkUpdate({ type: "s_code", data: CUSTOMER?.relationOrg?.o_c_relationorg_sectorcodes.map(item => ({ ...item, relation_id: customer.id })), attribute: "code", where: { ...where, type: "RELATION_ORG", relation_id: customer.id }, session });
    }
    if (CUSTOMER?.relationCustomer){
      await bulkUpdate({ type: "relationCustomer", data: CUSTOMER?.relationCustomer.map(entry => formatter(entry, db.OCRelationcustomer)), attribute: "o_c_relationcustomer_registerno", where, session });
    }
    if (CUSTOMER?.financialInfo){
      if (CUSTOMER?.financialInfo?.business){
        await update({ type: "business", data: formatter(CUSTOMER?.financialInfo?.business, db.CBusiness), where, session });
      }
      if (CUSTOMER?.financialInfo?.family){
        await update({ type: "family", data: { ...formatter(CUSTOMER?.financialInfo?.family, db.CFamily) }, where, session });
      }
      if (CUSTOMER?.financialInfo?.capital){
        await update({ type: "capital", data: { ...formatter(CUSTOMER?.financialInfo?.capital, db.CCapital), }, where, session });
      }
      if (CUSTOMER?.financialInfo?.o_m_report){
        await update({ type: "omReport", data: { ...formatter(CUSTOMER?.financialInfo?.o_m_report, db.OMReport) }, where, session });
      }
      if (CUSTOMER?.financialInfo?.o_report){
        await update({ type: "oReport", data: { ...formatter(CUSTOMER?.financialInfo?.o_report, db.OReport) }, where, session });
      }
      if (CUSTOMER?.financialInfo?.o_t_report){
        await update({ type: "otReport", data: { ...formatter(CUSTOMER?.financialInfo?.o_t_report, db.OTReport) }, where, session });
      }
    }

    // / scode start
    if (CUSTOMER?.customerInfo){
      if (CUSTOMER?.customerInfo?.o_c_sectorcodes && CUSTOMER?.customerInfo?.o_c_sectorcodes.length >0)
        await bulkUpdate({ type: "s_code", data: CUSTOMER?.customerInfo?.o_c_sectorcodes.map(item => ({ ...item, relation_id: customer.id })), attribute: "code", where: { ...where, type: "CUSTOMER", relation_id: customer.id }, session });
    }
    // / scode end
    if (CUSTOMER?.loanInfo){
      let loan = await update({ type : "loanInfo", data : { ...formatter(CUSTOMER?.loanInfo, db.OCLoanInformation) }, where: {
        ...where,
        o_c_loan_starteddate: CUSTOMER.loanInfo?.o_c_loan_starteddate
      }, session });
      if (loan) {
        if (CUSTOMER?.loanInfo?.o_c_loanmrtnos && CUSTOMER?.loanInfo?.o_c_loanmrtnos.length >0)
          await bulkUpdate({ type: "mrtno", data: CUSTOMER?.loanInfo?.o_c_loanmrtnos.map(item => ({ ...item, relation_id: loan.id })), attribute: "mrtno", where: { ...where, type: "LOAN", relation_id: loan.id }, session });
        if (CUSTOMER?.loanInfo?.o_c_loanrelnos && CUSTOMER?.loanInfo?.o_c_loanrelnos.length > 0)
          await bulkUpdate({ type: "relno", data: CUSTOMER?.loanInfo?.o_c_loanrelnos.map(item => ({ ...item, relation_id: loan.id })), attribute: "relno", where: { ...where, type: "LOAN", relation_id: loan.id }, session });
        if (CUSTOMER?.loanInfo?.neoInfo)
          await update({ type: "neoInfo", data: { ...formatter(CUSTOMER?.loanInfo?.neoInfo, db.NeoInfo) }, where: { ...where, registertopolicedate: CUSTOMER?.loanInfo?.neoInfo?.registertopolicedate, relation_id: loan.id, relation_type: "LOAN" }, session });
        if (CUSTOMER?.loanInfo?.transactions && CUSTOMER?.loanInfo?.transactions.length > 0)
          await bulkUpdate({ type: "transaction", data: CUSTOMER?.loanInfo?.transactions.map(entry => formatter({ ...entry, relation_id: loan.id }, db.Transaction)), attribute: "datetopay", where: { ...where, relation_type: "LOAN", relation_id: loan.id }, session });
      }
    }
    if (CUSTOMER?.leasingInfo){
      let leasing = await update({ type : "leasingInfo", data : { ...formatter(CUSTOMER?.leasingInfo, db.OCLeasing) }, where: {
        ...where,
        o_c_leasing_starteddate: CUSTOMER?.leasingInfo?.o_c_leasing_starteddate
      }, session });
      console.log("LEASING===============>", leasing);
      if (leasing){
        if (CUSTOMER?.leasingInfo?.neoInfo)
          await update({ type: "neoInfo", data: formatter(CUSTOMER?.leasingInfo?.neoInfo, db.NeoInfo), where: { ...where, registertopolicedate: moment(CUSTOMER?.loanInfo?.neoInfo?.registertopolicedate), relation_type: "LEASING", relation_id: leasing.id }, session });
        if (CUSTOMER?.leasingInfo?.o_c_leasingmrtnos && CUSTOMER?.leasingInfo?.o_c_leasingmrtnos.length > 0)
          await bulkUpdate({ type: "mrtno", data: CUSTOMER?.leasingInfo?.o_c_leasingmrtnos.map(item => ({ ...item, relation_id: leasing.id })), attribute: "mrtno", where: { ...where, type: "LEASING", relation_id: leasing.id }, session });
        if (CUSTOMER?.leasingInfo?.o_c_leasingrelnos && CUSTOMER?.leasingInfo?.o_c_leasingrelnos.length > 0)
          await bulkUpdate({ type: "relno", data: CUSTOMER?.leasingInfo?.o_c_leasingrelnos.map(item => ({ ...item, relation_id: leasing.id })), attribute: "relno", where: { ...where, type: "LEASING", relation_id: leasing.id }, session });
        if (CUSTOMER?.leasingInfo?.transactions && CUSTOMER?.leasingInfo?.transactions.length >0)
          await bulkUpdate({ type: "transaction", data: CUSTOMER?.leasingInfo?.transactions.map(entry => formatter({ ...entry, relation_id: leasing.id }, db.Transaction)), attribute: "datetopay", where: { ...where, relation_type: "LEASING", relation_id: leasing.id }, session });
      }
    }
    if (CUSTOMER?.accreditInfo){
      let accredit = await update({ type : "accreditInfo", data : formatter(CUSTOMER?.accreditInfo, db.OCAccredit), where: {
        ...where,
        o_c_accredit_starteddate: CUSTOMER?.accreditInfo?.o_c_accredit_starteddate
      }, session });
      if (accredit){
        if (CUSTOMER?.accreditInfo?.o_c_accreditmrtnos && CUSTOMER?.accreditInfo?.o_c_accreditmrtnos.length > 0)
          await bulkUpdate({ type: "mrtno", data: CUSTOMER?.accreditInfo?.o_c_accreditmrtnos.map(item => ({ ...item, relation_id: accredit.id })), attribute: "mrtno", where: { ...where, type: "ACCREDIT", relation_id: accredit.id }, session });
        if (CUSTOMER?.accreditInfo?.o_c_accreditrelnos && CUSTOMER?.accreditInfo?.o_c_accreditrelnos.length)
          await bulkUpdate({ type: "relno", data: CUSTOMER?.accreditInfo?.o_c_accreditrelnos.map(item => ({ ...item, relation_id: accredit.id })), attribute: "relno", where: { ...where, type: "ACCREDIT", relation_id: accredit.id }, session });
      }
    }
    if (CUSTOMER?.guarenteeInfo){
      let gurantee = await update({ type : "guarantee", data : formatter(CUSTOMER?.guarenteeInfo, db.OCGuarantee), where: {
        ...where,
        o_c_guarantee_starteddate: CUSTOMER?.guarenteeInfo?.o_c_guarantee_starteddate
      }, session });
      if (gurantee){
        if (CUSTOMER?.guarenteeInfo?.o_c_guaranteemrtnos && CUSTOMER?.guarenteeInfo?.o_c_guaranteemrtnos.length > 0)
          await bulkUpdate({ type: "mrtno", data: CUSTOMER?.guarenteeInfo?.o_c_guaranteemrtnos.map(item => ({ ...item, relation_id: gurantee.id })), attribute: "mrtno", where: { ...where, type: "GUARANTEE", relation_id: gurantee.id }, session });
        if (CUSTOMER?.guarenteeInfo?.o_c_guaranteerelnos && CUSTOMER?.guarenteeInfo?.o_c_guaranteerelnos.length > 0)
          await bulkUpdate({ type: "relno", data: CUSTOMER?.guarenteeInfo?.o_c_guaranteerelnos.map(item => ({ ...item, relation_id: gurantee.id })), attribute: "relno", where: { ...where, type: "GUARANTEE", relation_id: gurantee.id }, session });
      }
    }
    if (CUSTOMER?.loanLineInfo){
      await update({ type : "loanLine", data : formatter(CUSTOMER?.loanLineInfo, db.OCLoanline), where: {
        ...where,
        o_c_loanline_starteddate: CUSTOMER?.loanLineInfo?.o_c_loanline_starteddate
      }, session });
    }
    if (CUSTOMER?.receivableInfo){
      let receivable = await update({ type : "receivable", data : formatter(CUSTOMER?.receivableInfo, db.OCReceivable), where: {
        ...where,
        o_c_receivable_starteddate: CUSTOMER?.receivableInfo?.o_c_receivable_starteddate
      }, session });
      if (receivable){
        if (CUSTOMER?.receivableInfo?.transactions && CUSTOMER?.receivableInfo?.transactions.length > 0)
          await bulkUpdate({ type: "transaction", data: CUSTOMER?.receivableInfo?.transactions.map(entry => formatter({ ...entry, relation_id: receivable.id }, db.Transaction)), attribute: "datetopay", where: { ...where, relation_type: "RECEIVABLE", relation_id: receivable.id }, session });
        if (CUSTOMER?.receivableInfo?.neoInfo)
          await update({ type: "neoInfo", data: formatter(CUSTOMER?.receivableInfo?.neoInfo, db.NeoInfo), where: { ...where, registertopolicedate: moment(CUSTOMER?.loanInfo?.neoInfo?.registertopolicedate), relation_type: "RECEIVABLE", relation_id: receivable.id }, session });
      }
    }
    if (CUSTOMER?.onusInfo){
      let onus = await update({ type : "onus", data : formatter(CUSTOMER?.onusInfo, db.OCOnusInformation), where: {
        ...where,
        o_c_onus_starteddate: CUSTOMER?.onusInfo?.o_c_onus_starteddate
      }, session });
      if (onus) {
        if (CUSTOMER?.onusInfo?.o_c_onusmrtnos && CUSTOMER?.onusInfo?.o_c_onusmrtnos.length > 0){
          await bulkUpdate({ type: "mrtno", data: CUSTOMER?.onusInfo?.o_c_onusmrtnos.map(item => ({ ...item, relation_id: onus.id })), attribute: "mrtno", where: { ...where, type: "ONUS", relation_id: onus.id }, session });
        }
        if (CUSTOMER?.onusInfo?.o_c_onusrelnos && CUSTOMER?.onusInfo?.o_c_onusrelnos.length > 0)
          await bulkUpdate({ type: "relno", data: CUSTOMER?.onusInfo?.o_c_onusrelnos.map(item => ({ ...item, relation_id: onus.id })), attribute: "relno", where: { ...where, type: "ONUS", relation_id: onus.id }, session });
        if (CUSTOMER?.onusInfo?.transactions && CUSTOMER?.onusInfo?.transactions.length > 0)
          await bulkUpdate({ type: "transaction", data: CUSTOMER?.onusInfo?.transactions.map(entry => formatter({ ...entry, relation_id: onus.id }, db.Transaction)), attribute: "datetopay", where: { ...where, relation_type: "ONUS", relation_id: onus.id }, session });
        if (CUSTOMER?.onusInfo?.neoInfo)
          await update({ type: "neoInfo", data: formatter(CUSTOMER?.onusInfo?.neoInfo, db.NeoInfo), where: { ...where, registertopolicedate: moment(CUSTOMER?.onusInfo?.neoInfo?.registertopolicedate), relation_type: "ONUS", relation_id: onus.id }, session });
      }
    }
    if (CUSTOMER?.bondInfo){
      let bond = await update({ type : "bond", data : formatter(CUSTOMER?.bondInfo, db.OBond), where: {
        ...where,
        o_bond_starteddate: CUSTOMER?.bondInfo?.o_bond_starteddate
      }, session });
      if (bond) {
        if (CUSTOMER?.bondInfo?.o_c_bondmrtnos && CUSTOMER?.bondInfo?.o_c_bondmrtnos.length > 0)
          await bulkUpdate({ type: "mrtno", data: CUSTOMER?.bondInfo?.o_c_bondmrtnos.map(item => ({ ...item, relation_id: bond.id })), attribute: "mrtno", where: { ...where, type: "BOND", relation_id: bond.id }, session });
        if (CUSTOMER?.bondInfo?.o_c_bondrelnos && CUSTOMER?.bondInfo?.o_c_bondrelnos.length > 0)
          await bulkUpdate({ type: "relno", data: CUSTOMER?.bondInfo?.o_c_bondrelnos.map(item => ({ ...item, relation_id: bond.id })), attribute: "relno", where: { ...where, type: "BOND", relation_id: bond.id }, session });
      }
    }
    // console.log(mrtInfo);
    if (CUSTOMER?.mrtInfo){
      let falls = CUSTOMER.mrtInfo.map(item => {
        let entry = formatter(item, db.OCMortgage);
        // console.log(entry);
        return async () => {
          try {
            if (item?.o_c_mrtstateregisterno){
              let mortgage = await db.find(db.OCMortgage, { where: {
                ...where,
                o_c_mrtstateregisterno: entry?.o_c_mrtstateregisterno,
                o_c_mrtconfirmeddate  : moment(entry?.o_c_mrtconfirmeddate)
              } });
              if (!mortgage){
                await db.create(db.OCMortgage, entry, session);
              } else {
                await db.update(mortgage, entry, session);
              }
            } else {
              let mortgage = await db.find(db.OCMortgage, { where: {
                ...where,
                // o_c_mrtorgname          : entry?.o_c_mrtorgname,
                // o_c_mrtregistereddatefim: moment(entry?.o_c_mrtregistereddatefim),
                o_c_mrtregisterno: entry?.o_c_mrtregisterno
              } });
              if (!mortgage){
                await db.create(db.OCMortgage, entry, session);
              } else {
                await db.update(mortgage, entry, session);
              }
            }
          } catch (err){
            console.log(err);
          }

          await Promise.resolve();
        };
      });
      await fall(falls);
    }

    return ({ customer: CUSTOMER });
  }


});
