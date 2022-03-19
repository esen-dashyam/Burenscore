import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("mrtno", {
    customer_id: {
      type        : DataTypes.STRING(55),
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    relation_id: {
      type        : DataTypes.STRING(55),
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    type: {
      type     : DataTypes.STRING(55),
      allowNull: true,
    },
    mrtno: {
      type     : DataTypes.STRING(55),
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};