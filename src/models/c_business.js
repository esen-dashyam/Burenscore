import { define } from "@goodtechsoft/sequelize-postgres";
import { fields } from "../middlewares/db_session";

module.exports = (sequelize, DataTypes) => {
  return define(sequelize).model("c_business", {
    customer_id: {
      type        : DataTypes.UUID,
      allowNull   : false,
      defaultValue: DataTypes.UUIDV4
    },
    c_b_totalsale: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_b_totalcost: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_b_totalprofit: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_b_operatingexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_b_operatingincome: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_b_otherincome: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_b_otherexpense: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_b_profitbeforetax: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_b_tax: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    c_b_netprofit: {
      type     : DataTypes.DECIMAL(20, 2),
      allowNull: true,
    },
    ...fields(DataTypes)
  });
};