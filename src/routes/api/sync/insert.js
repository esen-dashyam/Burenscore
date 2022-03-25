import { method } from "@goodtechsoft/micro-service";
import { asyncPooled, fall, chunkArray } from "../../../utils";
import { dataSync } from "../../../services/v1";
import Joi from "joi";
import { db } from "@goodtechsoft/sequelize-postgres";

export default method.post("/sync/insert", null, async (req, res, session) => {
  const {
    customers : {
      customer
    },
  } = req.body;
  const array = chunkArray(customer, 100);
  let datas = [];
  await asyncPooled(1, array, async (data) => {
    let falls = data.map(item =>{
      return async () => {
        let data = await dataSync.main(item, session);
        datas.push(data);
        await Promise.resolve();
      };
    });
    await fall(falls);
  });
  res.json(datas);
});