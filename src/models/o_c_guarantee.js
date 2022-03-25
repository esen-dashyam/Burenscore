import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_c_guarantee", {
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
    o_c_guarantee_advamount: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_c_guarantee_starteddate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_guarantee_expdate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_guarantee_currencycode: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_guarantee_type: {
      type     : DataTypes.STRING(255),
      allowNull: true,
    },
    o_c_guarantee_sectorcode: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_guarantee_interestinperc: {
      type     : DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    o_c_guarantee_commissionperc: {
      type     : DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    o_c_guarantee_fee: {
      type     : DataTypes.DECIMAL(12, 2),
      allowNull: true,
    },
    o_c_guarantee_updatedexpdate: {
      type     : DataTypes.DATE,
      allowNull: true,
    },
    o_c_guarantee_extcount: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_guarantee_balance: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_c_guarantee_loanclasscode: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    o_c_guarantee_isapproved: {
      type     : DataTypes.DECIMAL(24, 2),
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};