import { logic } from "@goodtechsoft/micro-service";
import { NotfoundError } from "@goodtechsoft/micro-service/lib/errors";
import { db } from "@goodtechsoft/sequelize-postgres";
import { ERRORS } from "../../../constants";
import Joi from "joi";

const schema = Joi.object({
  id: Joi.string().guid("uuid").required(),
});

export default logic(schema, async (data, session) => {
  const {
    id,
  } = data;
  console.log(data);
  let client = await db.find(db.Client, {
    where: { client_id: id },
  }, session);

  return client;
});
