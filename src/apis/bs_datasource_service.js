import { micro } from "@goodtechsoft/micro-service";
import config from "../config/apis";

const api = micro.api(
  config.bs_datasource_service.VERSION,
  config.bs_datasource_service.HOST,
  config.bs_datasource_service.PORT,
  config.bs_datasource_service.API_KEY
);

export const client = {
  get   : (data, session) => api.fetch("/client/customer", data)(session),
  update: (data, session) => api.fetch("/client/update", data)(session),
};
