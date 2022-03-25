import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_c_leasing", {
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
    o_c_leasing_advamount: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_c_leasing_balance: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_c_leasing_starteddate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_leasing_expdate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_leasing_currencycode: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_leasing_sectorcode: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_leasing_interestinperc: {
      type     : DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    o_c_leasing_commissionperc: {
      type     : DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    o_c_leasing_fee: {
      type     : DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    o_c_leasing_updatedexpdate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_leasing_loanclasscode: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_leasing_isapproved: {
      type     : DataTypes.BOOLEAN,
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};