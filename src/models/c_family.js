import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("c_family", {
    customer_id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    c_g_salary: {
      type     : DataTypes.INTEGER,
      allowNull: true,
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
      type     : DataTypes.STIRNG(500),
      allowNull: true,
    },

    ...fields(DataTypes)
  });
};