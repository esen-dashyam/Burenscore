import { Router } from "express";
import { routes } from "@goodtechsoft/micro-service";
import { db_session } from "../middlewares";


export default () => {
  const router = new Router();

  router.use("/pub", [db_session, routes(__dirname, "/pub")]);

  return router;
};
