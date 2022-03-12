import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_c_receivable", {
    customer_id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    o_c_receivable_balance: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_c_receivable_advamount: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_c_receivable_starteddate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_receivable_expdate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_receivable_currencycode: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_receivable_type: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_receivable_loanclasscode: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    o_c_receivable_isapproved: {
      type     : DataTypes.BOOLEAN,
      allowNull: true,
    },
    o_c_receivable_extdate: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },

    ...fields(DataTypes)
  });
};