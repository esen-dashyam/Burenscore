import { logic } from "@goodtechsoft/micro-service";
import { db } from "@goodtechsoft/sequelize-postgres";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { user as userService } from "../../../apis/bs_auth_service";
import { ERRORS, CLIENT_STATUS } from "../../../constants";
import randomstring from "randomstring";
import Joi from "joi";

const schema = Joi.object({
  client_id: Joi.string().required(),
  is_active: Joi.boolean()
});

export default logic(schema, async (data, session) => {
  const {
    client_id,
    is_active,
  } = data;

  let secretKey = randomstring.generate(50);

  let client = await db.find(db.Client, { client_id: client_id }, session);
  if (client) throw new ValidationError(ERRORS.ALREADY_REGISTERED);


  client = await db.create(db.Client, {
    partner_id        : client_id,
    is_active,
    client_id         : client_id,
    client_secret     : secretKey,
    session_id        : "session_id",
    client_status     : CLIENT_STATUS.ACTIVE,
    client_status_date: new Date()
  }, session);

  await userService.create({
    id      : client.id,
    password: secretKey
  }, session);

  await db.update(client, {
    session_id: client.session_id,
  }, session);

  return client;
});
