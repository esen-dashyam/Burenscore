import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("currency", {
    id: {
      type        : DataTypes.STRING(55),
      allowNull   : false,
      primaryKey  : true,
      defaultValue: DataTypes.UUIDV4
    },
    date: {
      type     : DataTypes.DATE,
      allowNull: false,
    },
    values: {
      type     : DataTypes.STRING(500),
      allowNull: false,
    },
    ...fields(DataTypes)
  });
};