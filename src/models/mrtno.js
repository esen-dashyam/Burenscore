import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("mrtno", {
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
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    mrtno: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};