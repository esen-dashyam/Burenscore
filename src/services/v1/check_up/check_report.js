import { logic } from "@goodtechsoft/micro-service";
import { db } from "@goodtechsoft/sequelize-postgres";
import { ValidationError } from "@goodtechsoft/micro-service/lib/errors";
import { user as userService } from "../../../apis/bs_auth_service";
import { ERRORS, CLIENT_STATUS } from "../../../constants";
import randomstring from "randomstring";
import Joi from "joi";

const schema = Joi.object({
  register_no: Joi.string().max(12).required(),
});

export default logic(schema, async (data, session) => {
  const {
    register_no,
  } = data;

  let customer = {
    register_no: register_no,
    firstname  : "Бумбаяр",
    lastname   : "Эрдэнэбаяр",
    adrress    : "Дархан, 18-р баг, 5-р хороолол, 15-р байр",
    phone      : "80873088",
    birthdate  : "1998-02-23",
  };

  return customer;
});
