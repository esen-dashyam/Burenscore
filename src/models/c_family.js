import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("c_family", {
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
    c_g_salary: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    c_g_otherincome: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_g_totalincome: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_g_foodexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_g_expensetolease: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_g_commexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_g_otherexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_g_totalexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_g_netincome: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_g_saving: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_g_totalsaving: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_g_savinghistory: {
      type     : DataTypes.STRING(500),
      allowNull: true,
    },

    ...fields(DataTypes)
  });
};