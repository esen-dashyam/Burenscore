import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("value", {
    id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      primaryKey  : true,
      defaultValue: DataTypes.UUIDV4
    },
    is_active: {
      type        : DataTypes.BOOLEAN,
      allowNull   : false,
      defaultValue: true
    },
    name: {
      type      : DataTypes.STRING(100),
      allowNull : false,
      primaryKey: false
    },
    field_name: {
      type      : DataTypes.STRING(100),
      allowNull : false,
      primaryKey: false,
      reference : {
        model : "Field",
        as    : "field",
        backas: "values",
        many  : true
      }
    },
    note: {
      type        : DataTypes.TEXT,
      allowNull   : true,
      primaryKey  : false,
      defaultValue: " "
    },
    ...fields(DataTypes)
  });
};