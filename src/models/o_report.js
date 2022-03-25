import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("o_report", {
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
    o_sale: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_saleproductcost: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_totalincome: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_operatingexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    ou_salary: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    ou_leaseexploitexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    ou_advertiseexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    ou_fuelcommexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    ou_insuranceexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    ou_depreciationexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    ou_otherexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_minoroperincomeexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_minoroperincome: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_minoroperexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_profitbeforetaxinterest: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    oh_interestexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    oh_tax: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    o_netprofit: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },

    ...fields(DataTypes)
  });
};