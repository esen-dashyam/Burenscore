import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("c_staff_bankrelation", {
    customer_id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    c_bankrelationtype: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    c_hiredate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    c_firedate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },

    ...fields(DataTypes)
  });
};