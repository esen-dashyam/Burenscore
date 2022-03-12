import BetweenDate from "./DateCompare";

import { Op } from "sequelize";

import { db } from "@goodtechsoft/sequelize-postgres";

export default function (req, res, session, model, attributes=[], queryOption={}) {

  if (!model) throw new Error("Model is undefined");


  const { filter, offset } = req.query;

  // console.log(filter.query);
  console.log("********************************");
  console.log(req.query.filter);
  console.log(filter);
  console.log("***********************a*********");

  if (!queryOption) queryOption = {};

  // if (filter.query !== "" || (filter.startDate && filter.endDate)) {

  //   db.findAll(model, { where: { [Op.or]: getQueryWhere(attributes, filter.query) }, attributes: attributes, ...queryOption }, session).then(response => res.json(response));
  //   console.log(getQueryWhere(attributes, filter.query));
  // } else {
  //   db.find(model, { where: {}, attributes });
  // }
}



function getQueryWhere(attributes=[], query=""){

  const result = [];

  attributes.forEach(item => {
    if (Array.isArray(item) && item[0] !== "id"){
      result.push({ [item[0]]: { [Op.like]: `%${query}%` } });
    } else if (item !== "id"){
      result.push({ [item]: { [Op.like]: `%${query}%` } });
    }
  });
  return result;
}