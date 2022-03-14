import { method } from "@goodtechsoft/micro-service";
import { asyncPooled, fall, chunkArray } from "../../../utils";
import { dataSync } from "../../../services/v1";
import Joi from "joi";
import { db } from "@goodtechsoft/sequelize-postgres";

// const schema = Joi.object({
//   customers: Joi.array().max(1000).required(),
// });

export default method.post("/sync/insert", null, async (req, res, session) => {
  const {
    customers : {
      customer
    },
  } = req.body;
  // console.log("=========================================================================");
  // console.log(req.body);
  // console.log("=========================================================================");
  const array = chunkArray(customer, 100);
  // console.log(array);
  await asyncPooled(1, array, async (customers) => {
    let relationIds = [];
    let customerArray = [];
    let falls = customers.map(item =>{
      // console.log(customer);
      return async () => {
        let insertData = await dataSync.main(item);

        await Promise.resolve();
      };
    });
    await fall(falls);
    // await db.bulkCreate(db.Customer, customerArray.map({

    // })
  });
  res.json({});
});