import { micro } from "@goodtechsoft/micro-service";
import config from "../config/apis";

const api = micro.api(
  config.bs_auth_service.VERSION,
  config.bs_auth_service.HOST,
  config.bs_auth_service.PORT,
  config.bs_auth_service.API_KEY
);

export const user = {
  check  : (data, session) => api.fetch("/user/check", data)(session),
  refresh: (data, session) => api.fetch("/user/refresh", data)(session),
};
