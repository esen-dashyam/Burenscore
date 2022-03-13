import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_c_loanline", {
    customer_id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    o_c_loanline_type: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_loanline_cardno: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_loanline_advamount: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    o_c_loanline_starteddate: {
      type     : DataTypes.DATE,
      allowNull: false,
    },
    o_c_loanline_expdate: {
      type     : DataTypes.DATE,
      allowNull: false,
    },
    o_c_loanline_currencycode: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_loanline_sectorcode: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_loanline_loaninterest: {
      type     : DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    o_c_loanline_timestoloan: {
      type     : DataTypes.DATE,
      allowNull: false,
    },
    o_c_loanline_extdate: {
      type     : DataTypes.DATE,
      allowNull: false,
    },
    o_c_loanline_interestinperc: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_loanline_commissionperc: {
      type     : DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    o_c_loanline_fee: {
      type     : DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    o_c_loanline_loanclasscode: {
      type     : DataTypes.INTEGER,
      allowNull: false,
    },
    o_c_loanline_balance: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    o_c_loanline_isapproved: {
      type     : DataTypes.INTEGER,
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};