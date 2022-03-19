import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("c_capital", {
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
    c_p_totalasset: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_p_assettype: {
      type     : DataTypes.STRING(500),
      allowNull: true,
    },
    c_p_assetcost: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_p_assetdepreciation: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_p_assetownership: {
      type     : DataTypes.STRING(500),
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};