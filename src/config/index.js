import { configure } from "@goodtechsoft/micro-service";
// import { dc, collection } from "@goodtechsoft/data-collection";

export default configure(({ PORT, DBHOST, DBPORT, DBNAME, DBUSER, DBPASS }) => ({
  server: {
    name: "bs_zms_service",
    host: "localhost",
    port: PORT || 3000
  },
  database: {
    database: DBNAME,
    username: DBUSER,
    password: DBPASS,
    host    : DBHOST,
    port    : DBPORT,
    dialect : "postgres"
  },
  jwt_service_secret: "bs-datasource.service",
  jwt_api_secret    : "bs-datasource.api",
}), {
  development: {
    PORT  : process.env.PORT,
    DBNAME: "bs_zms",
    DBHOST: "192.168.200.37",
    DBUSER: "postgres",
    DBPASS: "Ec8W5zrLA",
    DBPORT: 5432,
  },
  dev: {
    PORT  : process.env.PORT,
    DBNAME: "bs_datasource",
    DBHOST: "192.168.200.37",
    DBUSER: "postgres",
    DBPASS: "Ec8W5zrLA",
    DBPORT: 5432,
    REDIS : {
      host: "192.168.200.35",
      port: 6379
    },
    LOGGING: {
      host    : "172.16.100.25",
      port    : 27017,
      database: "micro"
    }
  },

});
