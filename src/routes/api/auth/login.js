import { method } from "@goodtechsoft/micro-service";
import { db } from "@goodtechsoft/sequelize-postgres";
import { UnauthorizedError } from "@goodtechsoft/micro-service/lib/errors";
import { user as userService } from "../../../apis/bs_auth_service";
import { ERRORS } from "../../../constants";
import config from "../../../config";
import sign from "./logics/sign";
import Joi from "joi";

const schema = Joi.object({
  client_id: Joi.string().max(45).required(),
  secretKey: Joi.string().max(255).required(),
});

export default method.post("/auth/login", schema, async (req, res, session) => {
  const {
    client_id,
    secretKey
  } = req.body;

  let client = await db.find(db.Client, {
    client_id,
    is_active: true
  }, session);

  if (!client) throw new UnauthorizedError(ERRORS.AUTHENTICATION_FAILED);

  let auth = await userService.check({
    id      : client.id,
    password: secretKey
  }, session);

  if (!auth) throw new UnauthorizedError(ERRORS.AUTHENTICATION_FAILED);

  await db.update(client, {
    id        : client.id,
    session_id: auth.session_id,
  }, session);

  let result = await sign({
    ...auth,
    ...client?.dataValues
  });

  res.signIn(result);
});

