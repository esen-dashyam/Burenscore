import { Server } from "http";
import core from "./core";
import config from "./config";
import { v4 as uuidv4 } from "uuid";
import { argv } from "@goodtechsoft/micro-service";
import { db_session } from "./middlewares";
import { db, setup } from "@goodtechsoft/sequelize-postgres";

const dbMigrate = async () => {
  try {
    await db.CBusiness.sync({ force: true });
    await db.CCapital.sync({ force: true });
    await db.CFamily.sync({ force: true });
    await db.CStaffBankrelation.sync({ force: true });
    await db.Customer.sync({ force: true });
    await db.Mrtno.sync({ force: true });
    await db.Noeinfo.sync({ force: true });
    await db.OBond.sync({ force: true });
    await db.OCAccredit.sync({ force: true });
    await db.OCFinancialInformation.sync({ force: true });
    await db.OCLoanline.sync({ force: true });
    await db.OCMortgage.sync({ force: true });
    await db.OCOnusInformation.sync({ force: true });
    await db.OCReceivable.sync({ force: true });
    await db.OCRelationcustomer.sync({ force: true });
    await db.OCRelationorg.sync({ force: true });
    await db.OCSectorcode.sync({ force: true });
    await db.OMReport.sync({ force: true });
    await db.OReport.sync({ force: true });
    await db.OShareholdercustomer.sync({ force: true });
    await db.OShareholderorg.sync({ force: true });
    await db.OTReport.sync({ force: true });
    await db.Relno.sync({ force: true });
    await db.Transaction.sync({ force: true });
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
