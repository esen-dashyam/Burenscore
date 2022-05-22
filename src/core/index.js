import { errorHandler, micro } from "@goodtechsoft/micro-service";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import session from "express-session";
// import connect from "connect-redis";
import fileUpload from "express-fileupload";
import headers from "./headers";
import config from "../config";
import services from "../services";
import routes from "../routes";
// import xmlparser from "express-xml-bodyparser";
require("body-parser-xml")(bodyParser);

export default async () => {
  const app = express();
  // const client = await createRedisClient(config.redis.host, config.redis.port, "session");
  // const RedisStore = connect(session);
  // const store = new RedisStore({ client });

  app.use(fileUpload());
  app.use(headers);
  app.use(cookieParser(config.server.name + ".ckp"));
  app.use(morgan("dev"));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.xml({ xmlParseOptions: { explicitArray: false, emptyTag: null }, limit: "50mb" }));
  app.use(express.static("uploads"));
  app.use(
    session({
      name  : config.server.name + ".sid",
      secret: config.server.name + ".scr",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      },
      // store            : store,
      resave           : true,
      saveUninitialized: true,
    })
  );

  app.use(micro.engine());
  app.use(routes());
  app.use(services());
  app.use(errorHandler());

  // return { app, store };
  return { app };
};
