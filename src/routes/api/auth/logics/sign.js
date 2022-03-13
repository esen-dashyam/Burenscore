import jwt from "jsonwebtoken";
import config from "../../../../config";

export default async (user) => {
  let accessToken = await jwt.sign({
    uid: user.id,
    sid: user.session_id
  }, config.jwt_api_secret, { expiresIn: "30m" });

  return {
    uid          : user.id,
    token_type   : "Bearer",
    access_token : accessToken,
    refresh_token: user.refresh_token,
    session_state: process.env.SERVER_ENV || "development"
  };
};