import { logic } from "@goodtechsoft/micro-service";
import { db, Sequelize } from "@goodtechsoft/sequelize-postgres";
import Joi from "joi";

const schema = Joi.object({
  filter: Joi.object({
    oreder_name: Joi.string().max(45).optional().allow([null, ""]),
    order_by   : Joi.string().max(45).optional().allow([null, ""]),
    query      : Joi.string().max(45).optional().allow([null, ""]),
    start_date : Joi.string().regex(/\d{4}-\b(1[0-2]|[1-9]|0[0-9])-\b([0-2][0-9]|3[01]|[1-9])/).optional().allow([null, ""]),
    end_date   : Joi.string().regex(/\d{4}-\b(1[0-2]|[1-9]|0[0-9])-\b([0-2][0-9]|3[01]|[1-9])/).optional().allow([null, ""]),
    is_active  : Joi.boolean().allow([null, ""]),
  }).required(),
  offset: Joi.object({
    page : Joi.number().required(),
    limit: Joi.number().required()
  }).required(),
});

const { Op } = Sequelize;
const exclude = ["created_by", "updated_by", "updated_at", "note", "status"];

export default logic(schema, async (data, session) => {
  const { filter, offset } = data;

  let where = {};

  if (filter.query != null && filter.query !== "") {
    let query = filter.query.toLowerCase();
    where[Op.or] = [
      Sequelize.where(Sequelize.fn("lower", Sequelize.col("g_customer_name")), "LIKE", `%${query}%`),
    ];
  }

  const { rows, count } = await db.findAndCountAll(db.Client, {
    where     : where,
    attributes: { exclude },
    limit     : offset.limit,
    offset    : offset.page,
    order     : [["created_at", "DESC"]]
  }, session);

  return { rows: rows.map(item => {
    return {
      ...item?.dataValues,
      request_count  : parseFloat(item.request_count || 0),
      success_request: parseFloat(item.request_count || 0),
      failed_request : parseFloat(item.request_count || 0),
    };
  }), count };
});
