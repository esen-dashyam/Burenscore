import { micro } from "@goodtechsoft/micro-service";
import config from "../config/apis";

const api = micro.api(
  config.bs_audit_service.VERSION,
  config.bs_audit_service.HOST,
  config.bs_audit_service.PORT,
  config.bs_audit_service.API_KEY
);

export const request_log = {
  insert      : (data, session) => api.fetch("/request_logs/insert", data)(session),
  list        : (data, session) => api.fetch("/request_logs/list", data)(session),
  insert_error: (data, session) => api.fetch("/request_logs/insert_error", data)(session),
  list_error  : (data, session) => api.fetch("/request_logs/list_error", data)(session),
  check_result: (data, session) => api.fetch("/request_logs/check_result", data)(session),
};


