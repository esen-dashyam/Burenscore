import jwt from "jsonwebtoken";
import config from "../../../../config";
export default async (client) => {
  let accessToken = await jwt.sign({
    uid: client.id,
    sid: client.session_id
  }, config.jwt_api_secret, { expiresIn: "30m" });

  return {
    uid          : client.id,
    token_type   : "Bearer",
    access_token : accessToken,
    refresh_token: client.refresh_token,
    session_state: process.env.SERVER_ENV || "development"
  };
};