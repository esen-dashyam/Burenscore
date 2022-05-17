import { logic } from "@goodtechsoft/micro-service";
import { db } from "@goodtechsoft/sequelize-postgres";
import { NotfoundError } from "@goodtechsoft/micro-service/lib/errors";
import Joi from "joi";
import { APPENDIX, ERRORS, FORMATTABLE_VARIABLES } from "../../../constants";
import { co_owner, owner } from "./logics";
const schema = Joi.object({
  register_no     : Joi.string().required(),
  report_rel_types: Joi.string().required(),
  report_purpose  : Joi.string().required()
});

const formatter = (value = {}, model) => {

  const attributes = model.rawAttributes;

  const mapped = Object.keys(attributes).reduce((acc, key) => {
    return {
      ...acc,
      [key]: attributes[key].type.constructor.name
    };
  }, {});

  return {
    ...Object.keys(value).reduce((acc, key) => {
      let attributeType = mapped[key];

      if (attributeType && value[key] && attributeType === "DATE") {
        return {
          ...acc,
          [key]: moment(value[key]).format("YYYY-MM-DD")
        };
      }
      if (FORMATTABLE_VARIABLES[key]){
        return {
          ...acc,
          [key]: APPENDIX[FORMATTABLE_VARIABLES[key]][value[key]] || value[key],
        };
      }
      return {
        ...acc,
        [key]: value[key]
      };
    }, {})
  };
};
export default logic(schema, async (data, session) => {
  const {
    register_no,
    report_rel_types,
    report_purpose
  } = data;

  let where = {
    o_c_registerno: register_no,
  };

  let result;
  let customer;
  if (report_rel_types === "OWNER"){
    customer = await db.find(db.Customer, {
      where: where,
      order: [["created_at", "DESC"]]
    }, session);
    if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
    result = await owner({ where: { ...where } }, session);
  } else {
    if (register_no.length > 7){
      customer = await db.find(db.OCRelationcustomer, { o_c_relationcustomer_registerno: register_no }, session);
    } else {
      customer = await db.find(db.OCRelationorg, { o_c_relationorg_registerno: register_no }, session);
    }
    if (!customer) throw new NotfoundError(ERRORS.CUSTOMER_NOTFOUND);
    result = await co_owner({ where: { ...where } }, session);
  }

  return ({
    count   : result.count,
    rows    : result.rows,
    customer: { ...formatter(customer, db.Customer) },
  });
});
