import { logic } from "@goodtechsoft/micro-service";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { db } from "@goodtechsoft/sequelize-postgres";
import { user as userService } from "../../../apis/bs_auth_service";
import { ERRORS } from "../../../constants";
import randomstring from "randomstring";
import Joi from "joi";


const schema = Joi.object({
  id: Joi.string().required(),
});

export default logic(schema, async (data, session) => {
  const {
    id,
  } = data;

  let secretKey = randomstring.generate(50);

  let client = await db.find(db.Client, { id }, session);
  if (!client) throw new ValidationError(ERRORS.ALREADY_REGISTERED);

  await db.update(client, {
    client_secret: secretKey
  }, session);

  await userService.password({
    id      : id,
    password: secretKey
  }, session);

  return secretKey;
});
