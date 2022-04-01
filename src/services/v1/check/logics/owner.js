

import { db } from "@goodtechsoft/sequelize-postgres";

export default async (data, session) => {
  const { where } = data;

  let filters = {
    ...where
  };
  let rows = [];
  let loans = await db.findAll(db.OCLoanInformation, { where: filters }, session);
  console.log("========>", loans);
  loans.forEach(item => { rows.push({ ...item.dataValues, type: "LOAN" });});
  let leasings = await db.findAll(db.OCLeasing, { where: { ...filters, } }, session);
  leasings.forEach(item => { rows.push({ ...item.dataValues, type: "LEASING" });});
  let onus = await db.findAll(db.OCOnusInformation, { where: filters }, session);
  onus.forEach(item => { rows.push({ ...item.dataValues, type: "ONUS" });});
  let receivables = await db.findAll(db.OCReceivable, { where: filters }, session);
  receivables.forEach(item => { rows.push({ ...item.dataValues, type: "RECEIVABLE" });});
  let loanLines = await db.findAll(db.OCLoanline, { where: filters }, session);
  loanLines.forEach(item => { rows.push({ ...item.dataValues, type: "LOANLINES" });});
  let guarantee = await db.findAll(db.OCGuarantee, { where: filters }, session);
  guarantee.forEach(item => { rows.push({ ...item.dataValues, type: "GUARANTEE" });});
  let bonds = await db.findAll(db.OBond, { where: filters, }, session);
  bonds.forEach(item => { rows.push({ ...item.dataValues, type: "BOND" });});
  let accredits = await db.findAll(db.OCAccredit, { where: filters }, session);
  accredits.forEach(item => { rows.push({ ...item.dataValues, type: "ACCREDIT" });});

  return ({
    rows : rows,
    count: rows.length
  });

};