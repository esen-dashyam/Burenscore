import { micro } from "@goodtechsoft/micro-service";
import config from "../config/apis";

const api = micro.api(
  config.bs_datasource_service.VERSION,
  config.bs_datasource_service.HOST,
  config.bs_datasource_service.PORT,
  config.bs_datasource_service.API_KEY
);

export const customer_datasource = {
  updateSeed: (data, session) => api.fetch("/customer_datasource/update_seed", data)(session),
};

export const datasource = {
  objects            : (data, session) => api.fetch("/datasource/objects", data)(session),
  client_object_check: (data, session) => api.fetch("/datasource/client_object_check", data)(session),
  names              : (data, session) => api.fetch("/datasource/names", data)(session),
};
