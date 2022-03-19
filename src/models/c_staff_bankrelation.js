import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("c_staff_bankrelation", {
    customer_id: {
      type        : DataTypes.STRING(55),
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    o_c_customercode: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_bank_code: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_registerno: {
      type     : DataTypes.STRING(255),
      allowNull: true,
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