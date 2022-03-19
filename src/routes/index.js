import { Router } from "express";
import { routes } from "@goodtechsoft/micro-service";
import { db_session, sign, auth } from "../middlewares";


export default () => {
  const router = new Router();

  router.use("/api", [sign, db_session, routes(__dirname, ["/api/auth/login"])]);
  router.use("/api", [auth, db_session, routes(__dirname, "/api")]);
  router.use("/private", [db_session, routes(__dirname, "/private")]);

  return router;
};

