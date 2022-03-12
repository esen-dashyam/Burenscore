import { configure } from "@goodtechsoft/micro-service";
// import { dc, collection } from "@goodtechsoft/data-collection";

export default configure(({ PORT, DBHOST, DBPORT, DBNAME, DBUSER, DBPASS, REDIS, COLLECTION, LOGGING }) => ({
  server: {
    name: "bs_datasource_service",
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
  collection        : COLLECTION,
  redis             : REDIS,
  jwt_service_secret: "bs-datasource.service",
  jwt_api_secret    : "bs-datasource.api",
  logging           : LOGGING
}), {
  development: {
    PORT      : process.env.PORT,
    DBNAME    : "bs_datasource",
    DBHOST    : "192.168.200.37",
    DBUSER    : "postgres",
    DBPASS    : "Ec8W5zrLA",
    DBPORT    : 5432,
    COLLECTION: {
      database: "bs_datacollection",
      username: "postgres",
      password: "Ec8W5zrLA",
      host    : "192.168.200.37",
      port    : 5432,
      dialect : "postgres"
    },
    REDIS: {
      host: "192.168.200.35",
      port: 30916
    },
    LOGGING: {
      host    : "172.16.100.25",
      port    : 27017,
      database: "micro"
    }
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
