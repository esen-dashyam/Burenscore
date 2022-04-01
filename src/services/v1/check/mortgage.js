import { logic } from "@goodtechsoft/micro-service";
import { db } from "@goodtechsoft/sequelize-postgres";
import Joi from "joi";

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
    offset
  } = data;

  let where = {
    relation_id: filter.id,
  };
  let mrtnos = await db.findAll(db.Mrtno, { where: where }, session);
  console.log("MORT_NOS========>", mrtnos);
  if (mrtnos.length <= 0) return { rows: [], count: 0 };
  const { rows, count } = await db.findAndCountAll(db.OCMortgage, { where: {
    o_c_customercode: mrtnos[0].o_c_customercode,
    o_c_bank_code   : mrtnos[0].o_c_bank_code,
    o_c_registerno  : mrtnos[0].o_c_registerno,
    o_c_mrtno       : mrtnos.map(item => item.mrtno),
  },
  offset: offset.page,
  limit : offset.limit,
  }, session);

  return ({
    rows,
    count
  });
});
