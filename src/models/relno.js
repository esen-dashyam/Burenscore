import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("relno", {
    customer_id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    relation_id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    type: {
      type     : DataTypes.STIRNG(55),
      allowNull: true,
    },
    relno: {
      type     : DataTypes.STIRNG(55),
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};