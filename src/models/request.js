import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("c_business", {
    customer_id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    client_id: {
      type      : DataTypes.UUID,
      allowNull : false,
      primarykey: false
    },
    ...fields(DataTypes)
  });
};