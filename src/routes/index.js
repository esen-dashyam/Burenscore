import { Router } from "express";
import { routes } from "@goodtechsoft/micro-service";
import { db_session, sign, auth } from "../middlewares";


export default () => {
  const router = new Router();

  router.use("/api", [sign, db_session, routes(__dirname, ["/api/auth/login"])]);
  router.use("/api", [ db_session, routes(__dirname, "/api")]);

  return router;
};

