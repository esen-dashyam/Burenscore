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
    await db.c_business.sync({ force: true });
    await db.c_capital.sync({ force: true });
    await db.c_family.sync({ force: true });
    await db.c_staff_bankrelation.sync({ force: true });
    await db.customer.sync({ force: true });
    await db.mrtno.sync({ force: true });
    await db.noeinfo.sync({ force: true });
    await db.o_bond.sync({ force: true });
    await db.o_c_accredit.sync({ force: true });
    await db.o_c_financial_information.sync({ force: true });
    await db.o_c_loanline.sync({ force: true });
    await db.o_c_mortgage.sync({ force: true });
    await db.o_c_onus_information.sync({ force: true });
    await db.o_c_receivable.sync({ force: true });
    await db.o_c_relationcustomer.sync({ force: true });
    await db.o_c_relationorg.sync({ force: true });
    await db.o_c_sectorcode.sync({ force: true });
    await db.o_m_report.sync({ force: true });
    await db.o_report.sync({ force: true });
    await db.o_shareholdercustomer.sync({ force: true });
    await db.o_shareholderorg.sync({ force: true });
    await db.o_t_report.sync({ force: true });
    await db.relno.sync({ force: true });
    await db.transaction.sync({ force: true });
  } catch (err){
    console.log(err);
  }
};

setup(__dirname)(config.database, async () => {
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
    };
  if (argv("--dbmigrate")){
    console.log("================>Migrations");
    await dbMigrate();
  }
  db_session(req, res, next);
});
