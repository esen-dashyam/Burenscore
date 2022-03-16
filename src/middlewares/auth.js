import { UnauthorizedError } from "@goodtechsoft/micro-service/lib/errors";
import { ERRORS } from "../constants";
import jwt from "jsonwebtoken";
import config from "../config";

export default async (req, res, next) => {
  const header = req.headers.authorization;
  const tokens = req.cookies[config.server.name + ".sec"];

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
      decoded = jwt.verify(token, config.jwt_api_secret);
    } catch (err) {
      throw err;
      // throw new UnauthorizedError(ERRORS.NO_CREDENTIALS);
    }

    next();
  } catch (err) {
    next(err);
  }
};
