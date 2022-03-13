import { Router } from "express";
import { routes } from "@goodtechsoft/micro-service";
import { db_session, sign } from "../middlewares";


export default () => {
  const router = new Router();

  router.use("/api", [sign, db_session, routes(__dirname, ["/auth/login"])]);

  return router;
};
