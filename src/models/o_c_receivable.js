import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_c_receivable", {
    id: {
      type        : DataTypes.STRING(45),
      allowNull   : false,
      primaryKey  : true,
      defaultValue: DataTypes.UUIDV4
    },
    o_c_customercode: {
      type     : DataTypes.STRING(55),
      allowNull: false,
    },
    o_c_bank_code: {
      type     : DataTypes.STRING(255),
      allowNull: false,
    },
    o_c_registerno: {
      type     : DataTypes.STRING(255),
      allowNull: false,
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
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_receivable_loanclasscode: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_receivable_isapproved: {
      type     : DataTypes.BOOLEAN,
      allowNull: true,
    },
    o_c_receivable_extdate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_receivable_loancharttype: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_receivable_interestcharttype: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};