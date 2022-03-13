import { method } from "@goodtechsoft/micro-service";
import { db } from "@goodtechsoft/sequelize-postgres";
import { UnauthorizedError } from "@goodtechsoft/micro-service/lib/errors";
import { user as userService } from "../../../apis/bs_auth_service";
import { client as clientService } from "../../../apis/bs_datasource_service";
import { ERRORS } from "../../../constants";
import config from "../../../config";
import sign from "./logics/sign";
import Joi from "joi";

const schema = Joi.object({
  id       : Joi.string().max(45).required(),
  secretKey: Joi.string().max(255).required(),
});

export default method.post("/auth/login", schema, async (req, res, session) => {
  const {
    id,
    secretKey
  } = req.body;

  console.log(id);
  console.log(secretKey);

  let client = await clientService.get({ id: id }, session);

  console.log(client);

  if (!client) throw new UnauthorizedError(ERRORS.AUTHENTICATION_FAILED);

  let auth = await userService.check({
    id      : client.id,
    password: secretKey
  }, session);

  if (!auth) throw new UnauthorizedError(ERRORS.AUTHENTICATION_FAILED);

  session[4] = {
    id          : client.id,
    fullname    : `${client?.staff?.last_name} ${client?.staff?.first_name}`,
    service_type: config.server.name,
  };

  await clientService.update({
    id        : client.id,
    session_id: auth.session_id,
  });

  let result = await sign({
    ...auth,
    ...client.dataValues
  });

  console.log("RESULT=====>", result);

  res.signIn(result);
});

