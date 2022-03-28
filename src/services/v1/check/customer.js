import { logic } from "@goodtechsoft/micro-service";
import { db } from "@goodtechsoft/sequelize-postgres";
import { NotfoundError } from "@goodtechsoft/micro-service/lib/errors";
import Joi from "joi";
import { ERRORS } from "../../../constants";
const schema = Joi.object({
  register_no: Joi.string().max(45).required(),
});

export default logic(schema, async (data, session) => {
  const { register_no } = data;

  let where = {
    o_c_registerno: register_no
  };

  let customer = await db.find(db.Customer, {
    where: where,
    order: [["created_at", "DESC"]]
  }, session);
  if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);

  return customer;
});
