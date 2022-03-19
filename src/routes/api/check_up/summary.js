import { method } from "@goodtechsoft/micro-service";
import { asyncPooled, fall, chunkArray } from "../../../utils";
import { dataSync } from "../../../services/v1";
import Joi from "joi";
import { db } from "@goodtechsoft/sequelize-postgres";

const schema = Joi.object({
  register_no: Joi.string().max(12).required(),
});


export default method.post("/check_up/summary", schema, async (req, res, session) => {
  const {
    register_no,
  } = req.body;

  let customer = {
    register_no: register_no,
    firstname  : "Бумбаяр",
    lastname   : "Эрдэнэбаяр",
    adrress    : "Дархан, 18-р баг, 5-р хороолол, 15-р байр",
    phone      : "80873088",
    birthdate  : "1998-02-23",
  };

  res.json(customer);
});