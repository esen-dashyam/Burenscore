import { Server } from "http";
import core from "./core";
import config from "./config";
import { v4 as uuidv4 } from "uuid";
import { argv } from "@goodtechsoft/micro-service";
import { db_session } from "./middlewares";
import { db, setup } from "@goodtechsoft/sequelize-postgres";
import { collection } from "@goodtechsoft/data-collection";

const dbMigrate = async () => {
  try {
    await db.value.sync({ force: true });
  } catch (err){
    console.log(err);
  }
};

setup(__dirname)(config.database, async () => {
  collection(__dirname)(config.collection, async (err) => {

    const { app } = await core();

    const http = Server(app);

    http.listen(config.server.port, async () => {
      console.log(`Server: ${config.server.port} is listening ...`);
    });

    const req = {
        MS_SESSION: ["MS_SESSION", uuidv4(), true]
      },
      res = {},
      next = async () => {
        const session = ["MICRO", req.DB_SESSION, req.MS_SESSION];

        if (argv("--init")) {
          console.log("Initialize ...");
        }
        if (argv("--dbmigrate")){
          console.log("================>Migrations");
          await dbMigrate();
        }
      };

    db_session(req, res, next);
  });
});
