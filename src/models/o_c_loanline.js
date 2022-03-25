import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_c_loanline", {
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
    o_c_loanline_type: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_loanline_cardno: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_loanline_advamount: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_c_loanline_starteddate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_loanline_expdate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_loanline_currencycode: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_loanline_sectorcode: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_loanline_loaninterest: {
      type     : DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    o_c_loanline_timestoloan: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_loanline_extdate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_loanline_interestinperc: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_loanline_commissionperc: {
      type     : DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    o_c_loanline_fee: {
      type     : DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    o_c_loanline_loanclasscode: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_loanline_balance: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_c_loanline_isapproved: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};