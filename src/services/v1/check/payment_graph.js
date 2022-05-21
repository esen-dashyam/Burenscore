import { logic } from "@goodtechsoft/micro-service";
import { db } from "@goodtechsoft/sequelize-postgres";
import Joi from "joi";
import moment from "moment";

const schema = Joi.object({
  filter: Joi.object({
    id: Joi.string().required(),
  }).required(),
  offset: Joi.object({
    page : Joi.number().required(),
    limit: Joi.number().required()
  }).required(),
});

export default logic(schema, async (data, session) => {
  const {
    filter,
    offset,
  } = data;

  let { rows, count } = await db.findAndCountAll(db.Transaction, {
    where: {
      relation_id: filter.id,
      type       : ["DETAIL"]
    },
    offset: offset?.page || 1,
    limit : offset?.limit || 10,
    order : [["datetopay", "ASC"]]
  }, session);
  let results = await db.findAll(db.Transaction, {
    where: {
      relation_id: filter.id,
      type       : "INTEREST_DETAIL"
    }
  });
  // let results = await db.query(`
  //   SELECT
  //      datetopay, amounttopay
  //   FROM
  //     transaction
  //   WHERE
  //     relation_id = ? AND type IN(?) AND datetopay < ?
  //   ORDER BY
  //     datetopay ASC`,
  // [filter.id, ["DETAIL", "INTEREST_DETAIL"], rows[count - 1]?.datetopay]).select();

  return ({
    rows: rows.map(row => {
      let interest = results.find(r => moment(r.datetopay).format("YYYY-MM-DD") === moment(row.datetopay).format("YYYY-MM-DD"));
      return {
        ...row.dataValues,
        datetopay    : moment(row.datetopay).format("YYYY-MM-DD"),
        amounttopay  : row.amounttopay,
        interesttopay: interest?.amounttopay || 0,
        // total        : parseFloat(row.amounttopay + interest?.amounttopay).toFixed(2),
        total        : (parseFloat(row.amounttopay) + parseFloat(interest?.amounttopay)).toFixed(2)
      };
    }),
    count
  });
});