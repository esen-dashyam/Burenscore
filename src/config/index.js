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
  jwt_service_secret: "bs-zms.service",
  jwt_api_secret    : "bs-zms.api",
}), {
  development: {
    PORT   : process.env.PORT,
    DBNAME : "bs_zms",
    DBHOST : "172.16.101.32",
    DBUSER : "postgres",
    DBPASS : "p7GkK25Pl0gsNOzJ",
    DBPORT : 5432,
    LOGGING: {
      username: "admin",
      password: "monGoDBey100devG00d",
      host    : "192.168.200.36",
      port    : 27017,
      database: "micro_bs"
    }
  },
  dev: {
    PORT  : process.env.PORT,
    DBNAME: "bs_datasource",
    DBHOST: "postgredb.postgres",
    DBUSER: "postgres",
    DBPASS: "Ec8postgresGD01[UWin5zrLA",
    DBPORT: 5432,
    REDIS : {
      host: "redis.redis",
      port: 6379
    },
    LOGGING: {
      // username: "admin",
      // password: "monGoDBey100devG00d",
      host    : "mongodb.mongo",
      port    : 27017,
      database: "micro_bs"
    }
  },

});
