import { logic } from "@goodtechsoft/micro-service";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { db } from "@goodtechsoft/sequelize-postgres";
import { ERRORS } from "../../../constants";
import Joi from "joi";

const schema = Joi.object({
  id        : Joi.string().max(45).required(),
  is_active : Joi.boolean(),
  session_id: Joi.string()
});

export default logic(schema, async (data, session) => {
  const {
    id,
    is_active,
    session_id,
  } = data;

  let client = await db.find(db.Client, { id }, session);
  if (!client) throw new ValidationError(ERRORS.CLIENT_NOTFOUND);

  await db.update(client, {
    is_active,
    session_id
  }, session);

  return {};
});
