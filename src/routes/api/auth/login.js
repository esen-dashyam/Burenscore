import { method } from "@goodtechsoft/micro-service";
import { db } from "@goodtechsoft/sequelize-postgres";
import { UnauthorizedError } from "@goodtechsoft/micro-service/lib/errors";
import { user as userService } from "../../../apis/bs_auth_service";
import { ERRORS } from "../../../constants";
import config from "../../../config";
import sign from "./logics/sign";
import Joi from "joi";

const schema = Joi.object({
  id      : Joi.string().max(45).required(),
  password: Joi.string().max(255).required(),
});

export default method.post("/auth/login", schema, async (req, res, session) => {
  const {
    id,
    secretKey
  } = req.body;

  let user = await db.find(db.User, {
    where: { id },
  }, session);

  if (!user) throw new UnauthorizedError(ERRORS.AUTHENTICATION_FAILED);

  let auth = await userService.check({
    id: user.id,
    secretKey
  }, session);

  if (!auth) throw new UnauthorizedError(ERRORS.AUTHENTICATION_FAILED);

  session[4] = {
    id          : user.id,
    fullname    : `${user?.staff?.last_name} ${user?.staff?.first_name}`,
    service_type: config.server.name,
  };

  await user.update({
    session_id: auth.session_id
  });

  let result = await sign({
    ...auth,
    ...user.dataValues
  });

  res.signIn(result);
});

