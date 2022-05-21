import { logic } from "@goodtechsoft/micro-service";
import { db } from "@goodtechsoft/sequelize-postgres";
import Joi from "joi";
import { APPENDIX, FORMATTABLE_VARIABLES } from "../../../constants";
import moment from "moment";
import APPENDIX_MORTGAGE from "../../../constants/APPENDIX_MORTGAGE";
const schema = Joi.object({
  filter: Joi.object({
    id: Joi.string().required(),
  }).required(),
  offset: Joi.object({
    page : Joi.number().required(),
    limit: Joi.number().required()
  }).required(),
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
      if (key === "o_c_mrtcode"){
        return {
          ...acc,
          [key]: APPENDIX_MORTGAGE[value[key]] || value[key],
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
    filter,
    offset
  } = data;

  let where = {
    relation_id: filter.id,
  };
  let mrtnos = await db.findAll(db.Mrtno, { where: where }, session);
  // console.log("MORT_NOS========>", mrtnos);
  if (mrtnos.length <= 0) return { rows: [], count: 0 };
  const { rows, count } = await db.findAndCountAll(db.OCMortgage, { where: {
    o_c_customercode: mrtnos[0].o_c_customercode,
    o_c_bank_code   : mrtnos[0].o_c_bank_code,
    o_c_registerno  : mrtnos[0].o_c_registerno,
    o_c_mrtno       : mrtnos.map(item => item.mrtno),
  },
  offset: offset.page,
  limit : offset.limit,
  }, session);

  return ({
    rows: rows.map(entry => formatter(entry.dataValues, db.OCMortgage)),
    count
  });
});
