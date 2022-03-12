import { UnauthorizedError } from "@goodtechsoft/micro-service/lib/errors";
import jwt from "jsonwebtoken";
import config from "../config";
import { ERRORS } from "../constants";

export default async (req, res, next) => {
  const header = req.headers.authorization;
  const tokens = req.cookies[config.server.name + ".sec"];

  console.log("# #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  # ");
  console.log(req.cookies);
  console.log("# #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  # ");

  try {
    let token;

    if (header) {
      token = header.split(" ")[1];

      if (header.split(" ")[0] !== "Bearer")
        throw new UnauthorizedError(ERRORS.NO_CREDENTIALS);
    }

    if (!token) throw new UnauthorizedError(ERRORS.NO_CREDENTIALS);

    let decoded;

    try {
      decoded = jwt.verify(`${token}.${tokens[0]}`, config.jwt_api_secret);
    } catch (err) {
      throw new UnauthorizedError(ERRORS.NO_CREDENTIALS);
    }

    req.user = config.staff;

    next();
  } catch (err) {
    next(err);
  }
};
