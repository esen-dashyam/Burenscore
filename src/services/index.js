import { micro } from "@goodtechsoft/micro-service";
import { Router } from "express";
import { db_session } from "../middlewares";
import config from "../config";

export default () => {
  const router = new Router();

  router.use(
    micro
      .service(config.jwt_service_secret, (decoded, next) => {
        next(null, {
          ...decoded
        });
      })
      .dbSession(db_session)
      .routes(__dirname, "/v1")
  );

  return router;
};